import { NextResponse } from "next/server";
import { getCryptoAssetsWithPrices } from "@/lib/data/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const coins = await getCryptoAssetsWithPrices();
  return NextResponse.json(coins, {
    headers: {
      "Cache-Control": "public, s-maxage=30",
    },
  });
}
