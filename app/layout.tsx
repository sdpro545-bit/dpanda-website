import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { SiteShell } from "@/components/layout/SiteShell";
import { BRAND } from "@/config/brand";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.siteUrl),
  title: {
    default: "dPanda.ng — Trade Gift Cards and Crypto in Nigeria",
    template: "%s | dPanda.ng",
  },
  description:
    "See today's live naira rates for gift cards and cryptocurrency. Calculate your exact payout and trade instantly on WhatsApp.",
  keywords: [
    "gift card exchange Nigeria",
    "crypto exchange Nigeria",
    "sell Bitcoin for naira",
    "sell Amazon gift card",
    "sell iTunes gift card",
    "sell USDT naira",
  ],
  authors: [{ name: "dPanda.ng" }],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: BRAND.siteUrl,
    title: "dPanda.ng — Trade Gift Cards and Crypto in Nigeria",
    description:
      "Check live naira exchange rates for gift cards and crypto. Instant WhatsApp trades.",
    siteName: "dPanda.ng",
    images: [
      {
        url: "/assets/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "dPanda.ng — Trade Without Limits",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: BRAND.xHandle,
    creator: BRAND.xHandle,
    title: "dPanda.ng — Trade Without Limits",
    description: "Check live naira exchange rates for gift cards and crypto.",
    images: ["/assets/brand/og-image.png"],
  },
  icons: {
    icon: "/assets/brand/favicon.png",
    apple: "/assets/brand/logo-mark-512.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#020605",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminSlug = process.env.ADMIN_SLUG || "dpanda-control-center-2026-secure";

  return (
    <html lang="en">
      <body className={`${inter.className} font-body bg-[#000000] text-[#F5F5F7] min-h-screen antialiased selection:bg-[#2FCB6E] selection:text-black`}>
        <SiteShell adminSlug={adminSlug}>{children}</SiteShell>
      </body>
    </html>
  );
}
