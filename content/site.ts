/**
 * Approved Site Copy Deck
 * Source of Truth: dpanda_BUILD_PROMPT.md Section 4
 * Rule: No hard-coded copy in components. No tautology. No banned buzzwords.
 */

export const SITE_COPY = {
  nav: {
    links: [
      { label: "Gift Cards", href: "/gift-cards" },
      { label: "Crypto", href: "/crypto" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Contact", href: "/contact" },
    ],
    cta: "Trade ▸",
  },

  hero: {
    ghostWord: "dPANDA",
    h1: "Trade without limits",
    sub: "See today's naira rate for your gift card or crypto. Then trade now.",
    primaryButton: "Check my rate",
    roundGlassButton: "Trade now",
    tag: "Gift cards · Crypto · Locked wallet funds",
  },

  heroCards: {
    calculator: {
      title: "Gift card calculator",
      labels: {
        card: "Card",
        type: "Type",
        amount: "Amount",
        payout: "You get",
      },
      cta: "Trade Now",
      footnotePrefix: "Rate set at",
      footnoteSuffix: "Final rate is confirmed on WhatsApp.",
    },
    cryptoPrices: {
      title: "Crypto prices",
      footnote: "Prices update every 30 seconds.",
    },
  },

  services: {
    heading: "What you can trade",
    badgeText: "FAST · RELIABLE · SAFE ·",
    cards: [
      {
        id: "gift-cards",
        title: "Gift Cards",
        description: "Sell Amazon, iTunes, Steam and more. Get paid in naira.",
        href: "/gift-cards",
      },
      {
        id: "crypto",
        title: "Crypto Exchange",
        description: "Sell Bitcoin, USDT, Ethereum and Solana for naira.",
        href: "/crypto",
      },
      {
        id: "locked-wallet-funds",
        title: "Locked Wallet Funds",
        description: "{owner supplies one factual sentence}",
        href: "/locked-wallet-funds",
      },
    ],
  },

  phoneSection: {
    heading: "Your rate, then one tap to trade",
    body: "Pick your card, enter the amount and see your naira payout. One tap opens WhatsApp with your trade details already written.",
    button: "Open WhatsApp",
    sampleRateTag: "RATE",
    sampleRateTitle: "Amazon US e-code, $100",
  },

  howItWorks: {
    heading: "How it works",
    steps: [
      {
        step: 1,
        title: "Choose your card or coin.",
        description: "Select what you want to trade from our active list.",
      },
      {
        step: 2,
        title: "Enter the amount and read your naira payout.",
        description: "See the live calculation with no hidden deductions.",
      },
      {
        step: 3,
        title: "Tap Trade. WhatsApp opens with your details filled in.",
        description: "Your card type, rate, and estimated payout are pre-written.",
      },
      {
        step: 4,
        title: "Confirm the final rate with us, send the card or coin, get paid in naira.",
        description: "Funds are transferred directly to your Nigerian bank account.",
      },
    ],
  },

  faqTeaser: {
    heading: "Frequently Asked Questions",
    subheading: "Everything you need to know about trading with dPanda.",
    viewAll: "View all FAQ",
    questions: [
      {
        q: "How is my payout calculated?",
        a: "Your payout is calculated by multiplying your card or coin value by our live naira exchange rate for that exact asset variant.",
      },
      {
        q: "Why does the rate change?",
        a: "Rates fluctuate with currency market movement and international gift card market demand.",
      },
      {
        q: "How long does a trade take?",
        a: "{owner to supply}",
      },
      {
        q: "Which cards do you accept?",
        a: "We accept Amazon, Apple/iTunes, Google Play, Steam, Razer Gold, Xbox, PlayStation, Walmart, eBay, Sephora, Nike, and Visa/Vanilla.",
      },
      {
        q: "What happens after I tap Trade?",
        a: "WhatsApp opens with your trade details pre-filled. You verify with our desk, transmit the card or transaction hash, and receive your naira payout.",
      },
    ],
  },

  footer: {
    ghostWord: "dPANDA",
    contactHeading: "CONTACT",
    pagesHeading: "PAGES",
    socialHeading: "SOCIAL",
    legal: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
    copyright: `© ${new Date().getFullYear()} dPanda.ng. All rights reserved.`,
  },
} as const;
