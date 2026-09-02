import { NextRequest, NextResponse } from "next/server";
import { isIP } from "node:net";
import { insertUser } from "@/lib/db";
import { parseUserInput } from "@/lib/validation";

export const runtime = "nodejs";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers });
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.MOBILE_API_KEY;
  if (apiKey && request.headers.get("authorization") !== `Bearer ${apiKey}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers });
  }

  try {
    const input = parseUserInput(await request.json());
    const forwardedIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const realIp = request.headers.get("x-real-ip")?.trim();
    const clientIp = forwardedIp || realIp;
    if (!input.ipAddress && clientIp && isIP(clientIp)) input.ipAddress = clientIp;
    const user = await insertUser(input);
    return NextResponse.json({ message: "User captured", user }, { status: 201, headers });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to save user";
    const isInputError =
      message.includes("required") ||
      message.includes("must be") ||
      message.includes("too long") ||
      message.includes("valid") ||
      message.includes("JSON");
    console.error("POST /api/mobile/users", error);
    return NextResponse.json(
      { error: isInputError ? message : "Unable to save user" },
      { status: isInputError ? 400 : 503, headers },
    );
  }
}
