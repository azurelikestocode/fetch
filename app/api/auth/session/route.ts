import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const sessionStr = cookieStore.get("fetch_session")?.value;

  if (!sessionStr) {
    return NextResponse.json({ user: null });
  }

  try {
    const user = JSON.parse(sessionStr);
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("fetch_session");
  return NextResponse.json({ success: true });
}
