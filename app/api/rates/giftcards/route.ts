import { NextResponse } from "next/server";
import { getGiftCardsWithRates } from "@/lib/data/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getGiftCardsWithRates();
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=10, stale-while-revalidate=30",
    },
  });
}
