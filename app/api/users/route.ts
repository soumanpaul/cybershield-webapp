import { NextRequest, NextResponse } from "next/server";
import { listUsers } from "@/lib/db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const requested = Number(request.nextUrl.searchParams.get("limit") ?? 100);
    const limit = Number.isFinite(requested) ? Math.min(Math.max(requested, 1), 500) : 100;
    const users = await listUsers(limit);
    return NextResponse.json({ users, count: users.length });
  } catch (error) {
    console.error("GET /api/users", error);
    return NextResponse.json(
      { error: "Database unavailable. Check DATABASE_URL and PostgreSQL." },
      { status: 503 },
    );
  }
}
