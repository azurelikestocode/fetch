import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");

  const cookieStore = await cookies();
  const storedState = cookieStore.get("oauth_state")?.value;

  if (!code || !state || state !== storedState) {
    return NextResponse.redirect(
      new URL("/login?error=invalid_oauth_state", request.url)
    );
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(
      new URL("/login?error=missing_github_keys", request.url)
    );
  }

  try {
    // 1. Exchange code for access token
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const tokenData = await tokenRes.json();
    if (tokenData.error || !tokenData.access_token) {
      console.error("GitHub token error", tokenData);
      return NextResponse.redirect(
        new URL("/login?error=oauth_token_exchange_failed", request.url)
      );
    }

    const accessToken = tokenData.access_token;

    // 2. Fetch authenticated user profile
    const userRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Fetch-UI-App",
      },
    });

    if (!userRes.ok) {
      return NextResponse.redirect(
        new URL("/login?error=fetch_user_failed", request.url)
      );
    }

    const ghUser = await userRes.json();

    // 3. Fetch user's emails to get verified primary email
    let primaryEmail = ghUser.email;
    try {
      const emailRes = await fetch("https://api.github.com/user/emails", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Fetch-UI-App",
        },
      });
      if (emailRes.ok) {
        const emails: Array<{ email: string; primary: boolean; verified: boolean }> = await emailRes.json();
        const primary = emails.find((e) => e.primary && e.verified) || emails[0];
        if (primary) {
          primaryEmail = primary.email;
        }
      }
    } catch (e) {
      console.warn("Could not fetch private emails", e);
    }

    if (!primaryEmail || primaryEmail.includes("noreply")) {
      primaryEmail = "";
    }

    const isDeveloper = ghUser.login.toLowerCase() === "azurelikestocode";

    // 4. Construct user profile
    const authenticatedUser = {
      id: `gh_${ghUser.id}`,
      name: ghUser.name || ghUser.login,
      email: primaryEmail,
      avatar: ghUser.avatar_url,
      provider: "github",
      handle: ghUser.login,
      bio: ghUser.bio || "",
      role: isDeveloper ? "Developer" : "User",
      publicRepos: ghUser.public_repos || 0,
      isMember: true,
      createdAt: ghUser.created_at || new Date().toISOString(),
    };

    // 5. Store session in HTTP-only cookie
    cookieStore.set("fetch_session", JSON.stringify(authenticatedUser), {
      httpOnly: false, // Accessible to client-side auth context
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    // Clean up oauth_state
    cookieStore.delete("oauth_state");

    return NextResponse.redirect(new URL("/dashboard?auth=success", request.url));
  } catch (err) {
    console.error("OAuth callback error", err);
    return NextResponse.redirect(
      new URL("/login?error=oauth_internal_error", request.url)
    );
  }
}
