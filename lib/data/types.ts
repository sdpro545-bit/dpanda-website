export interface GiftCard {
  id: string;
  slug: string;
  name: string;
  logoPath?: string | null;
  sortOrder: number;
  isActive: boolean;
}

export interface GiftCardRate {
  id: string;
  cardId: string;
  cardSlug: string;
  cardName: string;
  variant: string;
  currency: string;
  minAmount: number;
  maxAmount: number | null;
  rateNgn: number;
  note?: string | null;
  isActive: boolean;
  isSeed: boolean;
  updatedAt: string;
}

export interface CryptoAsset {
  symbol: string;
  name: string;
  coingeckoId: string;
  ngnPerUsd: number;
  usdPrice?: number;
  change24h?: number;
  sortOrder: number;
  isActive: boolean;
  isSeed: boolean;
  updatedAt: string;
}

export interface PublicSettings {
  whatsappNumberIntl: string;
  banner: {
    enabled: boolean;
    text: string;
  };
  maintenanceMode: boolean;
  ratesPaused: boolean;
  referenceNgnUsd?: number;
}

export interface QuoteRequest {
  cardSlug: string;
  variant: string;
  amount: number;
}

export interface QuoteResponse {
  valid: boolean;
  cardName: string;
  variant: string;
  currency: string;
  amount: number;
  rateNgn: number;
  payoutNgn: number;
  updatedAt: string;
  error?: string;
}

export interface AuditEntry {
  id: string;
  action: string;
  target: string;
  oldValue: string;
  newValue: string;
  timestamp: string;
  actor: string;
}

export interface RateHistoryEntry {
  id: string;
  rateId: string;
  cardOrCoin: string;
  oldRate: number;
  newRate: number;
  changedAt: string;
  changedBy: string;
}

