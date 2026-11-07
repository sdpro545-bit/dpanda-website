import { NextResponse } from "next/server";
import { getPublicSettings } from "@/lib/data/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const settings = await getPublicSettings();
  return NextResponse.json(settings, {
    headers: {
      "Cache-Control": "public, s-maxage=10",
    },
  });
}
