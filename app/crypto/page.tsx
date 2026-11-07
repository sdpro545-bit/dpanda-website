"use client";

import React from "react";
import useSWR from "swr";
import { CryptoAsset } from "@/lib/data/types";
import { BRAND } from "@/config/brand";
import { CryptoCalculator } from "@/components/calculator/CryptoCalculator";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getCryptoIconPath } from "@/lib/data/cryptoIcons";
import { TrendingUp, TrendingDown } from "lucide-react";
import Image from "next/image";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CryptoPage() {
  const { data: coins } = useSWR<CryptoAsset[]>("/api/rates/crypto", fetcher, {
    refreshInterval: 30000,
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-20">
      {/* Page Header */}
      <ScrollReveal className="text-center max-w-2xl mx-auto space-y-4">
        <Eyebrow>Today&apos;s Rates</Eyebrow>
        <h1 className="text-4xl md:text-5xl font-heading font-semibold text-[#F5F5F7] tracking-tight">
          Live Cryptocurrency Rates
        </h1>
        <p className="text-[#86868B] font-body text-[17px] leading-[1.47]">
          Sell Bitcoin, USDT, Ethereum, Solana and BNB with fast settlement to Nigerian bank accounts. Real-time market prices updated every 30 seconds.
        </p>

        {/* Asset Category Toggle */}
        <div className="flex items-center justify-center pt-2">
          <div className="flex p-1 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]">
            <a
              href="/gift-cards"
              className="px-5 py-1.5 rounded-full text-xs font-heading font-medium text-[#86868B] hover:text-[#F5F5F7] transition-colors"
            >
              Gift Cards
            </a>
            <span className="px-5 py-1.5 rounded-full text-xs font-heading font-medium bg-[#2FCB6E] text-[#020605] shadow-[0_2px_8px_rgba(47,203,110,0.3)]">
              Crypto Rates
            </span>
          </div>
        </div>
      </ScrollReveal>

      {/* Top: Full Interactive Calculator */}
      <ScrollReveal className="max-w-3xl mx-auto" delay={100}>
        <CryptoCalculator />
      </ScrollReveal>

      {/* Bottom: Supported Coin Cards Grid */}
      <ScrollReveal className="space-y-6" delay={150}>
        <h2 className="text-2xl font-heading font-semibold text-[#F5F5F7]">
          Supported Assets & Payout Rates
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {(coins || []).map((coin) => {
            const isPositive = (coin.change24h ?? 0) >= 0;
            return (
              <GlassCard
                key={coin.symbol}
                className="p-6 rounded-[28px] flex flex-col justify-between gap-6 hover:border-[rgba(255,255,255,0.18)] transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="relative w-12 h-12">
                      <Image
                        src={getCryptoIconPath(coin.symbol)}
                        alt={coin.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center ${
                        isPositive
                          ? "bg-[#2FCB6E]/10 text-[#7CF0A8] border border-[#2FCB6E]/30"
                          : "bg-red-500/10 text-red-400 border border-red-500/30"
                      }`}
                    >
                      {isPositive ? (
                        <TrendingUp className="w-3 h-3 mr-0.5" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-0.5" />
                      )}
                      {(coin.change24h ?? 0).toFixed(2)}%
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading font-semibold text-lg text-[#F5F5F7]">
                      {coin.name}
                    </h3>
                    <span className="text-xs text-[#86868B]">{coin.symbol}</span>
                  </div>

                  <div className="pt-2 border-t border-[rgba(255,255,255,0.06)] space-y-1">
                    <div className="flex justify-between text-xs text-[#86868B] font-body">
                      <span>USD Price</span>
                      <span className="text-[#F5F5F7] font-mono font-medium tabular-nums">
                        ${(coin.usdPrice ?? 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-[#86868B] font-body">
                      <span>Payout Rate</span>
                      <span className="text-[var(--yellow-400)] font-heading font-semibold tabular-nums">
                        {coin.ngnPerUsd > 0
                          ? `₦${coin.ngnPerUsd.toLocaleString()} / $1`
                          : "Rate on request"}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  href={`https://wa.me/${BRAND.whatsappNumberIntl}?text=${encodeURIComponent(
                    `Hello dPanda, I want to trade ${coin.name} (${coin.symbol}).`
                  )}`}
                  isExternal
                  variant="solid-green"
                  size="sm"
                  className="w-full text-xs font-medium py-2.5 rounded-full"
                >
                  Trade {coin.symbol}
                </Button>
              </GlassCard>
            );
          })}
        </div>
      </ScrollReveal>
    </div>
  );
}
