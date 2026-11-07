import { NextRequest, NextResponse } from "next/server";
import { checkLoginRateLimit, verifyAdminPassword, createAdminSession } from "@/lib/auth/admin";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const rateCheck = checkLoginRateLimit(ip);

    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many failed login attempts. Please wait 15 minutes before trying again.",
        },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { success: false, error: "Password is required." },
        { status: 400 }
      );
    }

    const isValid = await verifyAdminPassword(password);
    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid password. ${rateCheck.remaining} attempt(s) remaining.`,
          remaining: rateCheck.remaining,
        },
        { status: 401 }
      );
    }

    await createAdminSession();

    return NextResponse.json({ success: true, message: "Authenticated successfully." });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
