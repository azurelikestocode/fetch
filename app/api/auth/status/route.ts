import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    githubConfigured: !!(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET),
    googleConfigured: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
    githubClientId: process.env.GITHUB_CLIENT_ID ? `${process.env.GITHUB_CLIENT_ID.slice(0, 6)}...` : null,
  });
}
