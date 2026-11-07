/**
 * Shared Crypto Symbol-to-Icon Map
 * Source of Truth for coin visuals across Carousel3D, CryptoCalculator, CryptoPricesCard, and /crypto page.
 * Never silently fallback to coin-sol for BNB or other coins.
 */

export const CRYPTO_ICON_MAP: Record<string, string> = {
  BTC: "/assets/3d/coin-btc.webp",
  USDT: "/assets/3d/coin-usdt.webp",
  ETH: "/assets/3d/coin-eth.webp",
  SOL: "/assets/3d/coin-sol.webp",
  BNB: "/assets/crypto/coin-bnb.svg",
};

export function getCryptoIconPath(symbol: string): string {
  const upper = symbol.toUpperCase();
  if (CRYPTO_ICON_MAP[upper]) {
    return CRYPTO_ICON_MAP[upper];
  }
  // If unknown coin without icon, return neutral monogram or BNB
  return "/assets/crypto/coin-bnb.svg";
}
