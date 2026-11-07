import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { calculateQuote, getPublicSettings } from "@/lib/data/store";

const quoteSchema = z.object({
  cardSlug: z.string().min(1),
  variant: z.string().min(1),
  amount: z.number().positive(),
});

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const settings = await getPublicSettings();
    if (settings.ratesPaused) {
      return NextResponse.json(
        {
          valid: false,
          error: "Rates are being updated. Message us on WhatsApp.",
          ratesPaused: true,
        },
        { status: 503 }
      );
    }

    const body = await req.json();
    const parsed = quoteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          valid: false,
          error: "Invalid card or amount provided.",
          details: parsed.error.format(),
        },
        { status: 400 }
      );
    }

    const { cardSlug, variant, amount } = parsed.data;
    const quote = await calculateQuote(cardSlug, variant, amount);

    return NextResponse.json(quote, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      {
        valid: false,
        error: "Unable to calculate quote at this time.",
      },
      { status: 500 }
    );
  }
}
