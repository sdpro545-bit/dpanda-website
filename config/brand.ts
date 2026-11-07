/**
 * dPanda.ng Brand Constants
 * Source of Truth: dpanda_MASTER_PROMPT.md Section 7
 */

export const BRAND = {
  name: "dPanda",
  legalName: "dPanda.ng",
  domain: "dpanda.ng",
  websiteDisplay: "www.dpanda.ng",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.dpanda.ng",

  // Contact
  whatsappNumberLocal: "07052367655",
  whatsappNumberIntl: "2347052367655", // wa.me format without plus
  instagramHandle: "@dPanda.ng",
  instagramUrl: "https://instagram.com/dPanda.ng",
  xHandle: "@dPanda_ng", // X handles cannot contain dots per platform rule
  xUrl: "https://x.com/dPanda_ng",

  // Rates & Disclaimers
  ratesDisclaimer: "Rates change with the market. The rate is final only when we confirm it on WhatsApp.",
  ratesFootnote: "Final rate is confirmed on WhatsApp.",
  cryptoPriceNote: "Prices update every 30 seconds.",
} as const;
