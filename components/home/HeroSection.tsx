"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { SITE_COPY } from "@/content/site";
import { BRAND } from "@/config/brand";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { GhostWord } from "@/components/ui/GhostWord";
import { RevealText } from "@/components/ui/RevealText";
import { TradeCalculatorCard } from "@/components/calculator/TradeCalculatorCard";
import { CryptoPricesCard } from "@/components/calculator/CryptoPricesCard";

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse move parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const whatsappUrl = `https://wa.me/${BRAND.whatsappNumberIntl}?text=${encodeURIComponent(
    "Hello dPanda, I want to trade."
  )}`;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] flex flex-col items-center justify-between px-6 pt-10 pb-16 max-w-6xl mx-auto overflow-hidden select-none"
    >
      {/* 1. Large Soft Radial Glow behind the Mascot */}
      <div
        aria-hidden="true"
        className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] md:w-[850px] h-[550px] md:h-[650px] rounded-full bg-green-400 opacity-[0.22] blur-[140px] pointer-events-none will-change-transform"
      />

      {/* 2. Giant Ghost Wordmark behind the Mascot */}
      <div
        style={{
          transform: `translate3d(${-mousePos.x * 24}px, ${-mousePos.y * 14}px, 0)`,
          transition: "transform 0.4s ease-out",
        }}
        className="absolute top-2 left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.06] z-0"
      >
        <GhostWord text={SITE_COPY.hero.ghostWord} />
      </div>

      {/* 3. Top Section: Tag, H1, Subtitle */}
      <div className="relative z-10 text-center max-w-3xl mx-auto space-y-4 pt-4">
        <Tag variant="outline">{SITE_COPY.hero.tag}</Tag>
        <RevealText
          as="h1"
          className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold tracking-tight text-white leading-[1.05]"
        >
          {SITE_COPY.hero.h1}
        </RevealText>
        <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto font-body">
          {SITE_COPY.hero.sub}
        </p>
      </div>

      {/* 4. Center Mascot Framing with Floating Coins & Orbit */}
      <div className="relative z-10 my-6 flex items-center justify-center w-full max-w-3xl">
        {/* Orbit Light Ring (Rotating softly) */}
        <div className="absolute w-[520px] md:w-[720px] h-[260px] pointer-events-none select-none opacity-85 animate-[spin_24s_linear_infinite]">
          <Image
            src="/assets/3d/light-orbit-ring.webp"
            alt="Gold Light Orbit Ring"
            fill
            className="object-contain"
          />
        </div>

        {/* Floating Coin 1: Orange BTC (Left High) */}
        <div
          style={{
            transform: `translate3d(${mousePos.x * 28}px, ${mousePos.y * 22}px, 0)`,
            transition: "transform 0.3s ease-out",
          }}
          className="absolute -left-4 sm:-left-12 md:-left-16 top-6 w-16 md:w-22 h-16 md:h-22 animate-[bounce_5s_ease-in-out_infinite]"
        >
          <Image
            src="/assets/3d/coin-btc.webp"
            alt="Orange Bitcoin"
            fill
            className="object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
          />
        </div>

        {/* Floating Coin 2: Teal USDT (Right High) */}
        <div
          style={{
            transform: `translate3d(${mousePos.x * -24}px, ${mousePos.y * -18}px, 0)`,
            transition: "transform 0.3s ease-out",
          }}
          className="absolute -right-2 sm:-right-8 md:-right-12 top-14 w-14 md:w-20 h-14 md:h-20 animate-[bounce_6s_ease-in-out_infinite]"
        >
          <Image
            src="/assets/3d/coin-usdt.webp"
            alt="USDT Coin"
            fill
            className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
          />
        </div>

        {/* Floating Coin 3: Silver ETH (Far Depth Blur) */}
        <div
          style={{
            transform: `translate3d(${mousePos.x * 16}px, ${mousePos.y * 14}px, 0)`,
            transition: "transform 0.4s ease-out",
          }}
          className="absolute left-8 md:left-14 bottom-4 w-12 md:w-16 h-12 md:h-16 blur-[1.5px] opacity-75 animate-[bounce_7s_ease-in-out_infinite]"
        >
          <Image
            src="/assets/3d/coin-eth.webp"
            alt="Ethereum Coin"
            fill
            className="object-contain"
          />
        </div>

        {/* Floating Coin 4: Dark BTC (Right Depth Blur) */}
        <div
          style={{
            transform: `translate3d(${mousePos.x * -18}px, ${mousePos.y * 20}px, 0)`,
            transition: "transform 0.4s ease-out",
          }}
          className="absolute right-10 md:right-16 bottom-8 w-11 md:w-14 h-11 md:h-14 blur-[2px] opacity-70 animate-[bounce_6.5s_ease-in-out_infinite]"
        >
          <Image
            src="/assets/3d/coin-btc-dark.webp"
            alt="Dark Bitcoin Coin"
            fill
            className="object-contain"
          />
        </div>

        {/* Left Circular Glass Button ("Trade now", ~120px, hairline border per Video beat 2) */}
        <div className="hidden lg:block absolute -left-24 bottom-16 z-20">
          <Button
            href={whatsappUrl}
            isExternal
            variant="glass"
            className="w-28 h-28 rounded-full flex-col text-xs text-center border-glass-bd hover:scale-105 active:scale-95 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          >
            <span className="font-heading font-medium text-white/90">Trade</span>
            <span className="font-heading font-extrabold text-yellow-400 text-sm">
              now ▸
            </span>
          </Button>
        </div>

        {/* Center Mascot with Pointer Parallax & Idle Float */}
        <div
          style={{
            transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 8}px, 0) rotate(${mousePos.x * 3}deg)`,
            transition: "transform 0.25s ease-out",
          }}
          className="relative w-72 sm:w-84 md:w-96 h-80 sm:h-96 md:h-[420px] will-change-transform animate-[pulse_6s_ease-in-out_infinite]"
        >
          <Image
            src="/assets/3d/panda-phone.webp"
            alt="dPanda Mascot"
            fill
            priority
            className="object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.65)]"
          />
        </div>
      </div>

      {/* 5. Bottom Row: Card A & Card B (Reference Layout) */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto pt-2">
        <TradeCalculatorCard />
        <CryptoPricesCard />
      </div>
    </section>
  );
};
