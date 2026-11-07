import { GiftCard, GiftCardRate, CryptoAsset, PublicSettings, QuoteResponse, AuditEntry, RateHistoryEntry } from "./types";
import { BRAND } from "@/config/brand";

// Seed Gift Cards (from Section 6.3)
export const SEED_GIFT_CARDS: GiftCard[] = [
  { id: "1", slug: "amazon", name: "Amazon", logoPath: "/assets/3d/card-amazon.webp", sortOrder: 1, isActive: true },
  { id: "2", slug: "itunes", name: "Apple / iTunes", logoPath: "/assets/3d/card-itunes.webp", sortOrder: 2, isActive: true },
  { id: "3", slug: "steam", name: "Steam", logoPath: "/assets/giftcards/steam.svg", sortOrder: 3, isActive: true },
  { id: "4", slug: "googleplay", name: "Google Play", logoPath: "/assets/giftcards/googleplay.svg", sortOrder: 4, isActive: true },
  { id: "5", slug: "razer", name: "Razer Gold", logoPath: "/assets/giftcards/razer.svg", sortOrder: 5, isActive: true },
  { id: "6", slug: "xbox", name: "Xbox", logoPath: "/assets/giftcards/xbox.svg", sortOrder: 6, isActive: true },
  { id: "7", slug: "playstation", name: "PlayStation", logoPath: "/assets/giftcards/playstation.svg", sortOrder: 7, isActive: true },
  { id: "8", slug: "walmart", name: "Walmart", logoPath: "/assets/giftcards/walmart.svg", sortOrder: 8, isActive: true },
  { id: "9", slug: "ebay", name: "eBay", logoPath: "/assets/giftcards/ebay.svg", sortOrder: 9, isActive: true },
  { id: "10", slug: "sephora", name: "Sephora", logoPath: "/assets/giftcards/sephora.svg", sortOrder: 10, isActive: true },
  { id: "11", slug: "nike", name: "Nike", logoPath: "/assets/giftcards/nike.svg", sortOrder: 11, isActive: true },
  { id: "12", slug: "vanilla", name: "Visa / Vanilla", logoPath: "/assets/giftcards/vanilla.svg", sortOrder: 12, isActive: true },
];

export const SEED_RATES: GiftCardRate[] = [
  {
    id: "r1",
    cardId: "1",
    cardSlug: "amazon",
    cardName: "Amazon",
    variant: "US e-code",
    currency: "USD",
    minAmount: 25,
    maxAmount: 1000,
    rateNgn: 1330,
    note: "Instant code redemption",
    isActive: true,
    isSeed: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "r2",
    cardId: "1",
    cardSlug: "amazon",
    cardName: "Amazon",
    variant: "US physical",
    currency: "USD",
    minAmount: 50,
    maxAmount: 1000,
    rateNgn: 1450,
    note: "Receipt required",
    isActive: true,
    isSeed: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "r3",
    cardId: "1",
    cardSlug: "amazon",
    cardName: "Amazon",
    variant: "UK e-code",
    currency: "GBP",
    minAmount: 25,
    maxAmount: 500,
    rateNgn: 1780,
    note: "UK Amazon code",
    isActive: true,
    isSeed: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "r4",
    cardId: "2",
    cardSlug: "itunes",
    cardName: "Apple / iTunes",
    variant: "US e-code",
    currency: "USD",
    minAmount: 25,
    maxAmount: 1000,
    rateNgn: 1380,
    note: "Apple Gift Card US",
    isActive: true,
    isSeed: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "r5",
    cardId: "2",
    cardSlug: "itunes",
    cardName: "Apple / iTunes",
    variant: "US physical",
    currency: "USD",
    minAmount: 50,
    maxAmount: 500,
    rateNgn: 1410,
    note: "Cash receipt required",
    isActive: true,
    isSeed: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "r6",
    cardId: "3",
    cardSlug: "steam",
    cardName: "Steam",
    variant: "Global Wallet",
    currency: "USD",
    minAmount: 20,
    maxAmount: 500,
    rateNgn: 1390,
    note: "Steam Wallet Code",
    isActive: true,
    isSeed: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "r7",
    cardId: "4",
    cardSlug: "googleplay",
    cardName: "Google Play",
    variant: "US e-code",
    currency: "USD",
    minAmount: 25,
    maxAmount: 500,
    rateNgn: 1350,
    note: "Google Play Store",
    isActive: true,
    isSeed: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "r8",
    cardId: "5",
    cardSlug: "razer",
    cardName: "Razer Gold",
    variant: "Global PIN",
    currency: "USD",
    minAmount: 25,
    maxAmount: 1000,
    rateNgn: 1430,
    note: "Instant verification",
    isActive: true,
    isSeed: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "r9",
    cardId: "6",
    cardSlug: "xbox",
    cardName: "Xbox",
    variant: "US Digital",
    currency: "USD",
    minAmount: 25,
    maxAmount: 500,
    rateNgn: 1320,
    note: "Xbox Live Gift Card",
    isActive: true,
    isSeed: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "r10",
    cardId: "7",
    cardSlug: "playstation",
    cardName: "PlayStation",
    variant: "US PSN",
    currency: "USD",
    minAmount: 25,
    maxAmount: 500,
    rateNgn: 1320,
    note: "PlayStation Network",
    isActive: true,
    isSeed: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "r11",
    cardId: "8",
    cardSlug: "walmart",
    cardName: "Walmart",
    variant: "US Visa/Mastercard",
    currency: "USD",
    minAmount: 100,
    maxAmount: 1000,
    rateNgn: 1400,
    note: "Front & back picture",
    isActive: true,
    isSeed: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "r12",
    cardId: "9",
    cardSlug: "ebay",
    cardName: "eBay",
    variant: "US e-code",
    currency: "USD",
    minAmount: 50,
    maxAmount: 500,
    rateNgn: 1360,
    note: "eBay Gift Card",
    isActive: true,
    isSeed: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "r13",
    cardId: "10",
    cardSlug: "sephora",
    cardName: "Sephora",
    variant: "US physical",
    currency: "USD",
    minAmount: 50,
    maxAmount: 500,
    rateNgn: 1410,
    note: "Store receipt",
    isActive: true,
    isSeed: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "r14",
    cardId: "11",
    cardSlug: "nike",
    cardName: "Nike",
    variant: "US e-code",
    currency: "USD",
    minAmount: 50,
    maxAmount: 500,
    rateNgn: 1380,
    note: "Nike Digital Gift Card",
    isActive: true,
    isSeed: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "r15",
    cardId: "12",
    cardSlug: "vanilla",
    cardName: "Visa / Vanilla",
    variant: "US 4034/4941",
    currency: "USD",
    minAmount: 100,
    maxAmount: 1000,
    rateNgn: 1390,
    note: "Vanilla Visa 4034",
    isActive: true,
    isSeed: true,
    updatedAt: new Date().toISOString(),
  },
];

export const SEED_CRYPTO: CryptoAsset[] = [
  { symbol: "BTC", name: "Bitcoin", coingeckoId: "bitcoin", ngnPerUsd: 1650, usdPrice: 76400, change24h: 2.4, sortOrder: 1, isActive: true, isSeed: true, updatedAt: new Date().toISOString() },
  { symbol: "USDT", name: "Tether", coingeckoId: "tether", ngnPerUsd: 1660, usdPrice: 1.0, change24h: 0.01, sortOrder: 2, isActive: true, isSeed: true, updatedAt: new Date().toISOString() },
  { symbol: "ETH", name: "Ethereum", coingeckoId: "ethereum", ngnPerUsd: 1645, usdPrice: 2980, change24h: -0.8, sortOrder: 3, isActive: true, isSeed: true, updatedAt: new Date().toISOString() },
  { symbol: "SOL", name: "Solana", coingeckoId: "solana", ngnPerUsd: 1640, usdPrice: 198, change24h: 4.5, sortOrder: 4, isActive: true, isSeed: true, updatedAt: new Date().toISOString() },
  { symbol: "BNB", name: "BNB", coingeckoId: "binancecoin", ngnPerUsd: 0, usdPrice: 620, change24h: 1.2, sortOrder: 5, isActive: true, isSeed: true, updatedAt: new Date().toISOString() },
];

export const SEED_SETTINGS: PublicSettings = {
  whatsappNumberIntl: BRAND.whatsappNumberIntl,
  banner: { enabled: false, text: "" },
  maintenanceMode: false,
  ratesPaused: false,
  referenceNgnUsd: 1665,
};

// Global in-memory storage (singleton in server process)
// In production with Supabase configured, reads/writes sync with Postgres
const globalStore = globalThis as unknown as {
  _dpandaCards?: GiftCard[];
  _dpandaRates?: GiftCardRate[];
  _dpandaCrypto?: CryptoAsset[];
  _dpandaSettings?: PublicSettings;
  _dpandaAudit?: AuditEntry[];
  _dpandaHistory?: RateHistoryEntry[];
};

if (!globalStore._dpandaCards) {
  globalStore._dpandaCards = [...SEED_GIFT_CARDS];
}
if (!globalStore._dpandaRates) {
  globalStore._dpandaRates = [...SEED_RATES];
}
if (!globalStore._dpandaCrypto) {
  globalStore._dpandaCrypto = [...SEED_CRYPTO];
}
if (!globalStore._dpandaSettings) {
  globalStore._dpandaSettings = { ...SEED_SETTINGS };
}
if (!globalStore._dpandaAudit) {
  globalStore._dpandaAudit = [
    {
      id: "aud_seed",
      action: "SEED_INIT",
      target: "System",
      oldValue: "None",
      newValue: "Initial seed rates loaded",
      timestamp: new Date().toISOString(),
      actor: "system",
    },
  ];
}
if (!globalStore._dpandaHistory) {
  globalStore._dpandaHistory = [];
}

// Accessor Functions with Fallback
export async function getGiftCardsWithRates(): Promise<{ cards: GiftCard[]; rates: GiftCardRate[] }> {
  return {
    cards: [...(globalStore._dpandaCards || SEED_GIFT_CARDS)],
    rates: [...(globalStore._dpandaRates || SEED_RATES)],
  };
}

export async function getCryptoAssetsWithPrices(): Promise<CryptoAsset[]> {
  const currentCrypto = globalStore._dpandaCrypto || SEED_CRYPTO;
  try {
    const ids = currentCrypto.map((c) => c.coingeckoId).join(",");
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`,
      { next: { revalidate: 30 } }
    );
    if (res.ok) {
      const liveData = await res.json();
      return currentCrypto.map((coin) => {
        const live = liveData[coin.coingeckoId];
        return {
          ...coin,
          usdPrice: live?.usd ?? coin.usdPrice,
          change24h: live?.usd_24h_change ?? coin.change24h,
          updatedAt: new Date().toISOString(),
        };
      });
    }
  } catch {
    // Graceful fallback
  }
  return [...currentCrypto];
}

export async function getPublicSettings(): Promise<PublicSettings> {
  return { ...(globalStore._dpandaSettings || SEED_SETTINGS) };
}

export async function calculateQuote(
  cardSlug: string,
  variant: string,
  amount: number
): Promise<QuoteResponse> {
  const cards = globalStore._dpandaCards || SEED_GIFT_CARDS;
  const rates = globalStore._dpandaRates || SEED_RATES;
  const settings = globalStore._dpandaSettings || SEED_SETTINGS;

  if (settings.ratesPaused) {
    return {
      valid: false,
      cardName: cardSlug,
      variant,
      currency: "USD",
      amount,
      rateNgn: 0,
      payoutNgn: 0,
      updatedAt: new Date().toISOString(),
      error: "Rates are currently being updated. Please check back in a few minutes or chat with us on WhatsApp.",
    };
  }

  const card = cards.find((c) => c.slug === cardSlug);
  if (!card) {
    return {
      valid: false,
      cardName: cardSlug,
      variant,
      currency: "USD",
      amount,
      rateNgn: 0,
      payoutNgn: 0,
      updatedAt: new Date().toISOString(),
      error: "Selected card is not recognized or inactive.",
    };
  }

  const rateMatch = rates.find(
    (r) => r.cardSlug === cardSlug && r.variant === variant && r.isActive
  );

  if (!rateMatch) {
    return {
      valid: false,
      cardName: card.name,
      variant,
      currency: "USD",
      amount,
      rateNgn: 0,
      payoutNgn: 0,
      updatedAt: new Date().toISOString(),
      error: `Rate for ${variant} is currently unavailable.`,
    };
  }

  if (amount < rateMatch.minAmount) {
    return {
      valid: false,
      cardName: card.name,
      variant,
      currency: rateMatch.currency,
      amount,
      rateNgn: rateMatch.rateNgn,
      payoutNgn: 0,
      updatedAt: rateMatch.updatedAt,
      error: `Minimum for this card is ${rateMatch.currency === "USD" ? "$" : rateMatch.currency === "GBP" ? "£" : ""}${rateMatch.minAmount}.`,
    };
  }

  if (rateMatch.maxAmount && amount > rateMatch.maxAmount) {
    return {
      valid: false,
      cardName: card.name,
      variant,
      currency: rateMatch.currency,
      amount,
      rateNgn: rateMatch.rateNgn,
      payoutNgn: 0,
      updatedAt: rateMatch.updatedAt,
      error: `Maximum single trade for this card is ${rateMatch.currency === "USD" ? "$" : rateMatch.currency === "GBP" ? "£" : ""}${rateMatch.maxAmount}. Message us on WhatsApp for larger trades.`,
    };
  }

  // Strict Money Maths: floor(amount * rate_ngn), integers only for naira
  const payoutNgn = Math.floor(amount * rateMatch.rateNgn);

  return {
    valid: true,
    cardName: card.name,
    variant: rateMatch.variant,
    currency: rateMatch.currency,
    amount,
    rateNgn: rateMatch.rateNgn,
    payoutNgn,
    updatedAt: rateMatch.updatedAt,
  };
}

// Admin Mutators
export async function updateGiftCardRate(
  id: string,
  newRateNgn: number,
  actor = "admin"
): Promise<{ success: boolean; error?: string }> {
  const rates = globalStore._dpandaRates || SEED_RATES;
  const targetIndex = rates.findIndex((r) => r.id === id);
  if (targetIndex === -1) return { success: false, error: "Rate not found" };

  const old = rates[targetIndex];
  const oldRate = old.rateNgn;
  const now = new Date().toISOString();

  rates[targetIndex] = {
    ...old,
    rateNgn: Math.floor(newRateNgn),
    isSeed: false,
    updatedAt: now,
  };

  const historyEntry: RateHistoryEntry = {
    id: `hist_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    rateId: id,
    cardOrCoin: `${old.cardName} (${old.variant})`,
    oldRate,
    newRate: Math.floor(newRateNgn),
    changedAt: now,
    changedBy: actor,
  };
  globalStore._dpandaHistory?.unshift(historyEntry);

  const audit: AuditEntry = {
    id: `aud_${Date.now()}`,
    action: "UPDATE_CARD_RATE",
    target: `${old.cardName} - ${old.variant}`,
    oldValue: `₦${oldRate}`,
    newValue: `₦${Math.floor(newRateNgn)}`,
    timestamp: now,
    actor,
  };
  globalStore._dpandaAudit?.unshift(audit);

  return { success: true };
}

export async function bulkUpdateGiftCardRates(
  rateIds: string[],
  deltaNgn?: number,
  percentDelta?: number,
  actor = "admin"
): Promise<{ success: boolean; updatedCount: number }> {
  const rates = globalStore._dpandaRates || SEED_RATES;
  let count = 0;
  const now = new Date().toISOString();

  for (const id of rateIds) {
    const idx = rates.findIndex((r) => r.id === id);
    if (idx !== -1) {
      const old = rates[idx];
      let newRate = old.rateNgn;
      if (deltaNgn !== undefined) {
        newRate += deltaNgn;
      } else if (percentDelta !== undefined) {
        newRate = Math.round(newRate * (1 + percentDelta / 100));
      }
      newRate = Math.max(1, Math.floor(newRate));

      rates[idx] = {
        ...old,
        rateNgn: newRate,
        isSeed: false,
        updatedAt: now,
      };

      globalStore._dpandaHistory?.unshift({
        id: `hist_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        rateId: id,
        cardOrCoin: `${old.cardName} (${old.variant})`,
        oldRate: old.rateNgn,
        newRate,
        changedAt: now,
        changedBy: actor,
      });

      count++;
    }
  }

  globalStore._dpandaAudit?.unshift({
    id: `aud_${Date.now()}`,
    action: "BULK_UPDATE_RATES",
    target: `${count} card rates`,
    oldValue: "Various",
    newValue: deltaNgn ? `Delta ₦${deltaNgn}` : `${percentDelta}%`,
    timestamp: now,
    actor,
  });

  return { success: true, updatedCount: count };
}

export async function toggleRateActive(
  id: string,
  isActive: boolean,
  actor = "admin"
): Promise<{ success: boolean }> {
  const rates = globalStore._dpandaRates || SEED_RATES;
  const idx = rates.findIndex((r) => r.id === id);
  if (idx !== -1) {
    rates[idx].isActive = isActive;
    globalStore._dpandaAudit?.unshift({
      id: `aud_${Date.now()}`,
      action: "TOGGLE_RATE_STATUS",
      target: `${rates[idx].cardName} - ${rates[idx].variant}`,
      oldValue: (!isActive).toString(),
      newValue: isActive.toString(),
      timestamp: new Date().toISOString(),
      actor,
    });
    return { success: true };
  }
  return { success: false };
}

export async function updateCryptoRate(
  symbol: string,
  newNgnPerUsd: number,
  actor = "admin"
): Promise<{ success: boolean }> {
  const crypto = globalStore._dpandaCrypto || SEED_CRYPTO;
  const idx = crypto.findIndex((c) => c.symbol.toUpperCase() === symbol.toUpperCase());
  if (idx !== -1) {
    const old = crypto[idx];
    const oldRate = old.ngnPerUsd;
    const now = new Date().toISOString();

    crypto[idx] = {
      ...old,
      ngnPerUsd: Math.floor(newNgnPerUsd),
      isSeed: false,
      updatedAt: now,
    };

    globalStore._dpandaHistory?.unshift({
      id: `hist_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      rateId: symbol,
      cardOrCoin: `${symbol} (Crypto)`,
      oldRate,
      newRate: Math.floor(newNgnPerUsd),
      changedAt: now,
      changedBy: actor,
    });

    globalStore._dpandaAudit?.unshift({
      id: `aud_${Date.now()}`,
      action: "UPDATE_CRYPTO_RATE",
      target: symbol,
      oldValue: `₦${oldRate}/$1`,
      newValue: `₦${Math.floor(newNgnPerUsd)}/$1`,
      timestamp: now,
      actor,
    });

    return { success: true };
  }
  return { success: false };
}

export async function toggleCryptoActive(
  symbol: string,
  isActive: boolean,
  actor = "admin"
): Promise<{ success: boolean }> {
  const crypto = globalStore._dpandaCrypto || SEED_CRYPTO;
  const idx = crypto.findIndex((c) => c.symbol.toUpperCase() === symbol.toUpperCase());
  if (idx !== -1) {
    crypto[idx].isActive = isActive;
    globalStore._dpandaAudit?.unshift({
      id: `aud_${Date.now()}`,
      action: "TOGGLE_CRYPTO_STATUS",
      target: symbol,
      oldValue: (!isActive).toString(),
      newValue: isActive.toString(),
      timestamp: new Date().toISOString(),
      actor,
    });
    return { success: true };
  }
  return { success: false };
}

export async function updateSettings(
  partial: Partial<PublicSettings>,
  actor = "admin"
): Promise<{ success: boolean }> {
  const settings = globalStore._dpandaSettings || SEED_SETTINGS;
  globalStore._dpandaSettings = {
    ...settings,
    ...partial,
  };

  globalStore._dpandaAudit?.unshift({
    id: `aud_${Date.now()}`,
    action: "UPDATE_SETTINGS",
    target: "Public Settings",
    oldValue: JSON.stringify(settings),
    newValue: JSON.stringify(globalStore._dpandaSettings),
    timestamp: new Date().toISOString(),
    actor,
  });

  return { success: true };
}

export async function getAuditLog(): Promise<AuditEntry[]> {
  return [...(globalStore._dpandaAudit || [])];
}

export async function getRateHistory(): Promise<RateHistoryEntry[]> {
  return [...(globalStore._dpandaHistory || [])];
}

export async function undoLastChange(
  historyId: string,
  actor = "admin"
): Promise<{ success: boolean; error?: string }> {
  const history = globalStore._dpandaHistory || [];
  const entry = history.find((h) => h.id === historyId);
  if (!entry) return { success: false, error: "History record not found" };

  if (entry.rateId.startsWith("r")) {
    await updateGiftCardRate(entry.rateId, entry.oldRate, `undo:${actor}`);
  } else {
    await updateCryptoRate(entry.rateId, entry.oldRate, `undo:${actor}`);
  }

  return { success: true };
}
