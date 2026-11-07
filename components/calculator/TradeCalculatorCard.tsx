"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { SITE_COPY } from "@/content/site";
import { BRAND } from "@/config/brand";

export const TradeCalculatorCard: React.FC = () => {
  const [amount, setAmount] = useState<number>(100);
  const rate = 1420; // Amazon US e-code seed rate
  const payout = Math.floor(amount * rate);

  const whatsappUrl = `https://wa.me/${BRAND.whatsappNumberIntl}?text=${encodeURIComponent(
    `Hello dPanda, I want to trade.\n\nCard: Amazon (US e-code)\nAmount: $${amount}\nRate: ₦${rate} per $1\nEstimated payout: ₦${payout.toLocaleString()}`
  )}`;

  return (
    <GlassCard className="p-5 md:p-6 flex items-center justify-between gap-4 group hover:border-mint-200/40 transition-all duration-300">
      <div className="flex items-center gap-4 min-w-0">
        {/* Left 3D Asset Render */}
        <div className="relative w-14 h-14 md:w-16 md:h-16 shrink-0 transition-transform duration-300 group-hover:scale-105">
          <Image
            src="/assets/3d/card-amazon.webp"
            alt="Amazon Gift Card"
            fill
            className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
          />
        </div>

        {/* Card Copy & Tag */}
        <div className="min-w-0 space-y-1">
          <Tag variant="outline">GIFT CARDS</Tag>
          <h3 className="font-heading font-bold text-sm md:text-base text-white truncate">
            Amazon (US e-code) · $100
          </h3>
          <p className="text-xs text-mint-200 tabular-nums font-heading font-semibold">
            You get: <span className="text-yellow-400 font-extrabold">₦{payout.toLocaleString()}</span> (₦{rate}/$1)
          </p>
        </div>
      </div>

      {/* White Pill Button with Circular Arrow Icon */}
      <Button
        href="/gift-cards"
        variant="white-pill-arrow"
        size="sm"
        className="shrink-0"
      >
        Calculate
      </Button>
    </GlassCard>
  );
};
