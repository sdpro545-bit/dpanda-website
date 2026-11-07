"use client";

import React from "react";
import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { getCryptoIconPath } from "@/lib/data/cryptoIcons";

export const CryptoPricesCard: React.FC = () => {
  return (
    <GlassCard className="p-5 md:p-6 flex items-center justify-between gap-4 group hover:border-white/20 transition-all duration-300">
      <div className="flex items-center gap-4 min-w-0">
        {/* Left 3D Asset Render */}
        <div className="relative w-14 h-14 md:w-16 md:h-16 shrink-0 transition-transform duration-300 group-hover:scale-105">
          <Image
            src={getCryptoIconPath("BTC")}
            alt="Bitcoin Coin"
            fill
            className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
          />
        </div>

        {/* Card Copy & Tag */}
        <div className="min-w-0 space-y-1">
          <div className="flex items-center gap-2">
            <Tag variant="yellow">LIVE RATES</Tag>
            <span className="text-[11px] font-mono text-[#86868B] tracking-wide uppercase">
              BTC · USDT · ETH · SOL · BNB
            </span>
          </div>
          <h3 className="font-heading font-semibold text-sm md:text-base text-[#F5F5F7] truncate">
            Bitcoin, USDT &amp; BNB Exchange
          </h3>
          <p className="text-xs text-[#86868B] tabular-nums font-body">
            BTC @ <span className="text-[#F5F5F7] font-medium">$76,400</span> · Payout <span className="text-yellow-400 font-semibold">₦1,660/$1</span>
          </p>
        </div>
      </div>

      {/* Pill Button */}
      <Button
        href="/crypto"
        variant="white-pill-arrow"
        size="sm"
        className="shrink-0"
      >
        Trade
      </Button>
    </GlassCard>
  );
};

