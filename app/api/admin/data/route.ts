import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { verifyAdminSession } from "@/lib/auth/admin";
import {
  getGiftCardsWithRates,
  getCryptoAssetsWithPrices,
  getPublicSettings,
  getAuditLog,
  getRateHistory,
  updateGiftCardRate,
  bulkUpdateGiftCardRates,
  toggleRateActive,
  updateCryptoRate,
  toggleCryptoActive,
  updateSettings,
  undoLastChange,
} from "@/lib/data/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { cards, rates } = await getGiftCardsWithRates();
  const crypto = await getCryptoAssetsWithPrices();
  const settings = await getPublicSettings();
  const audit = await getAuditLog();
  const history = await getRateHistory();

  return NextResponse.json({
    cards,
    rates,
    crypto,
    settings,
    audit,
    history,
  });
}

export async function POST(req: NextRequest) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action, payload } = body;

    switch (action) {
      case "UPDATE_CARD_RATE": {
        const { id, newRateNgn } = payload;
        if (!id || typeof newRateNgn !== "number") {
          return NextResponse.json({ error: "Invalid rate payload" }, { status: 400 });
        }
        const result = await updateGiftCardRate(id, newRateNgn);
        revalidateTag("rates");
        return NextResponse.json(result);
      }

      case "BULK_UPDATE_RATES": {
        const { rateIds, deltaNgn, percentDelta } = payload;
        if (!Array.isArray(rateIds) || rateIds.length === 0) {
          return NextResponse.json({ error: "Rate IDs array required" }, { status: 400 });
        }
        const result = await bulkUpdateGiftCardRates(rateIds, deltaNgn, percentDelta);
        revalidateTag("rates");
        return NextResponse.json(result);
      }

      case "TOGGLE_CARD_ACTIVE": {
        const { id, isActive } = payload;
        if (!id || typeof isActive !== "boolean") {
          return NextResponse.json({ error: "Invalid toggle payload" }, { status: 400 });
        }
        const result = await toggleRateActive(id, isActive);
        revalidateTag("rates");
        return NextResponse.json(result);
      }

      case "UPDATE_CRYPTO_RATE": {
        const { symbol, newNgnPerUsd } = payload;
        if (!symbol || typeof newNgnPerUsd !== "number") {
          return NextResponse.json({ error: "Invalid crypto payload" }, { status: 400 });
        }
        const result = await updateCryptoRate(symbol, newNgnPerUsd);
        revalidateTag("rates");
        return NextResponse.json(result);
      }

      case "TOGGLE_CRYPTO_ACTIVE": {
        const { symbol, isActive } = payload;
        if (!symbol || typeof isActive !== "boolean") {
          return NextResponse.json({ error: "Invalid crypto toggle payload" }, { status: 400 });
        }
        const result = await toggleCryptoActive(symbol, isActive);
        revalidateTag("rates");
        return NextResponse.json(result);
      }

      case "UPDATE_SETTINGS": {
        const { partial } = payload;
        if (!partial || typeof partial !== "object") {
          return NextResponse.json({ error: "Invalid settings payload" }, { status: 400 });
        }
        const result = await updateSettings(partial);
        revalidateTag("settings");
        return NextResponse.json(result);
      }

      case "UNDO_CHANGE": {
        const { historyId } = payload;
        if (!historyId) {
          return NextResponse.json({ error: "History ID required" }, { status: 400 });
        }
        const result = await undoLastChange(historyId);
        revalidateTag("rates");
        return NextResponse.json(result);
      }

      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
