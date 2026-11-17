import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || "178c6fc778ccc68e1d6a";

export async function POST(request: NextRequest) {
  try {
    const { deviceCode } = await request.json();
    if (!deviceCode) {
      return NextResponse.json({ error: "Missing deviceCode" }, { status: 400 });
    }

    const res = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: GITHUB_CLIENT_ID,
        device_code: deviceCode,
        grant_type: "urn:ietf:params:oauth:grant-type:device_code",
      }),
    });

    const data = await res.json();

    if (data.error === "authorization_pending") {
      return NextResponse.json({ status: "pending" });
    }

    if (data.error === "slow_down") {
      return NextResponse.json({ status: "slow_down", interval: data.interval });
    }

    if (data.error) {
      return NextResponse.json(
        { status: "error", error: data.error_description || data.error },
        { status: 400 }
      );
    }

    const accessToken = data.access_token;
    if (!accessToken) {
      return NextResponse.json({ status: "pending" });
    }

    // 1. Fetch GitHub User profile
    const userRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Fetch-UI-App",
      },
    });

    if (!userRes.ok) {
      return NextResponse.json({ error: "Failed to fetch GitHub profile" }, { status: 500 });
    }

    const ghUser = await userRes.json();

    // 2. Fetch User Verified Primary Email
    let primaryEmail = ghUser.email;
    try {
      const emailsRes = await fetch("https://api.github.com/user/emails", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Fetch-UI-App",
        },
      });
      if (emailsRes.ok) {
        const emails: Array<{ email: string; primary: boolean; verified: boolean }> =
          await emailsRes.json();
        const found = emails.find((e) => e.primary && e.verified) || emails[0];
        if (found) primaryEmail = found.email;
      }
    } catch {
      // Non-blocking
    }

    if (!primaryEmail) {
      primaryEmail = `${ghUser.login}@users.noreply.github.com`;
    }

    const authenticatedUser = {
      id: `gh_${ghUser.id}`,
      name: ghUser.name || ghUser.login,
      email: primaryEmail,
      avatar: ghUser.avatar_url,
      provider: "github",
      handle: ghUser.login,
      bio: ghUser.bio || "GitHub Verified Developer",
      publicRepos: ghUser.public_repos || 0,
      isMember: true,
      createdAt: ghUser.created_at || new Date().toISOString(),
    };

    const cookieStore = await cookies();
    cookieStore.set("fetch_session", JSON.stringify(authenticatedUser), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return NextResponse.json({ status: "authenticated", user: authenticatedUser });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Internal server error during OAuth poll" },
      { status: 500 }
    );
  }
}
