import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const { githubClientId, githubClientSecret, googleClientId, googleClientSecret } =
      await request.json();

    const envPath = path.join(process.cwd(), ".env.local");
    let content = "";
    if (fs.existsSync(envPath)) {
      content = fs.readFileSync(envPath, "utf-8");
    }

    const updates: Record<string, string> = {};
    if (githubClientId) updates["GITHUB_CLIENT_ID"] = githubClientId.trim();
    if (githubClientSecret) updates["GITHUB_CLIENT_SECRET"] = githubClientSecret.trim();
    if (googleClientId) updates["GOOGLE_CLIENT_ID"] = googleClientId.trim();
    if (googleClientSecret) updates["GOOGLE_CLIENT_SECRET"] = googleClientSecret.trim();

    const lines = content.split("\n");
    const existingKeys = new Set<string>();

    const newLines = lines.map((line) => {
      const match = line.match(/^([A-Z_]+)=(.*)$/);
      if (match && updates[match[1]] !== undefined) {
        existingKeys.add(match[1]);
        return `${match[1]}=${updates[match[1]]}`;
      }
      return line;
    });

    Object.entries(updates).forEach(([key, val]) => {
      if (!existingKeys.has(key)) {
        newLines.push(`${key}=${val}`);
      }
    });

    fs.writeFileSync(envPath, newLines.join("\n").trim() + "\n", "utf-8");

    // Also update runtime process.env
    Object.entries(updates).forEach(([key, val]) => {
      process.env[key] = val;
    });

    return NextResponse.json({ success: true, updated: Object.keys(updates) });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to save OAuth settings" },
      { status: 500 }
    );
  }
}
