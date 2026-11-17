import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");

  const cookieStore = await cookies();
  const storedState = cookieStore.get("google_oauth_state")?.value;

  if (!code || !state || state !== storedState) {
    return NextResponse.redirect(
      new URL("/login?error=invalid_oauth_state", request.url)
    );
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = `${request.nextUrl.origin}/api/auth/callback/google`;

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(
      new URL("/login?error=missing_google_keys", request.url)
    );
  }

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      console.error("Google token error", tokenData);
      return NextResponse.redirect(
        new URL("/login?error=oauth_token_exchange_failed", request.url)
      );
    }

    const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    if (!userInfoRes.ok) {
      return NextResponse.redirect(
        new URL("/login?error=fetch_user_failed", request.url)
      );
    }

    const googleUser = await userInfoRes.json();

    const authenticatedUser = {
      id: `goog_${googleUser.sub}`,
      name: googleUser.name || googleUser.given_name || "Google User",
      email: googleUser.email,
      avatar: googleUser.picture,
      provider: "google",
      handle: googleUser.email.split("@")[0],
      bio: "Google Verified Developer",
      isMember: true,
      createdAt: new Date().toISOString(),
    };

    cookieStore.set("fetch_session", JSON.stringify(authenticatedUser), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    cookieStore.delete("google_oauth_state");

    return NextResponse.redirect(new URL("/dashboard?auth=success", request.url));
  } catch (err) {
    console.error("Google OAuth callback error", err);
    return NextResponse.redirect(
      new URL("/login?error=oauth_internal_error", request.url)
    );
  }
}
