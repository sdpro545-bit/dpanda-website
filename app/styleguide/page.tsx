"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { GlassCard } from "@/components/ui/GlassCard";
import { Chip } from "@/components/ui/Chip";
import { RotatingBadge } from "@/components/ui/RotatingBadge";
import { GhostWord } from "@/components/ui/GhostWord";
import { RevealText } from "@/components/ui/RevealText";
import { OdometerNumber } from "@/components/ui/OdometerNumber";
import { MessageCircle, Instagram, Globe, Sparkles } from "lucide-react";
import Image from "next/image";

export default function StyleguidePage() {
  const [odometerVal, setOdometerVal] = useState(148500);

  return (
    <div className="relative min-h-screen py-16 px-6 max-w-6xl mx-auto space-y-16">
      {/* Background ghost branding test */}
      <div className="absolute top-10 right-0 pointer-events-none opacity-[0.03]">
        <GhostWord text="STYLEGUIDE" />
      </div>

      <header className="space-y-4">
        <Tag variant="yellow">Internal Design System</Tag>
        <RevealText as="h1" className="text-4xl md:text-5xl font-heading font-extrabold text-white">
          dPanda.ng Visual Tokens & Component Primitives
        </RevealText>
        <p className="text-white/70 max-w-2xl font-body">
          Audit and verification canvas for design tokens, typography, glassmorphism, responsive breakpoints, and motion states. Excluded from production index.
        </p>
      </header>

      {/* 1. Color Palette Tokens */}
      <section className="space-y-6">
        <h2 className="text-2xl font-heading font-bold text-mint-200">1. Color Tokens (tokens.css)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { name: "--green-950", hex: "#04281A", desc: "Page background", bg: "bg-green-950", border: true },
            { name: "--green-900", hex: "#06351F", desc: "Flyer 1 background", bg: "bg-green-900" },
            { name: "--green-800", hex: "#0A4A2A", desc: "Raised surfaces", bg: "bg-green-800" },
            { name: "--green-700", hex: "#0B6B34", desc: "Flyer 2 footer", bg: "bg-green-700" },
            { name: "--green-500", hex: "#2DB357", desc: "Hoodie primary", bg: "bg-green-500" },
            { name: "--green-400", hex: "#5CE87A", desc: "Soft radial glow", bg: "bg-green-400", darkText: true },
            { name: "--mint-200", hex: "#A0FFD2", desc: "Hairline highlights", bg: "bg-mint-200", darkText: true },
            { name: "--mint-50", hex: "#E4FFF1", desc: "Light section bg", bg: "bg-mint-50", darkText: true },
            { name: "--yellow-400", hex: "#FFD62E", desc: "CTA & Key Payout", bg: "bg-yellow-400", darkText: true },
          ].map((token) => (
            <div key={token.name} className="flex flex-col gap-2 p-3 rounded-card border border-glass-bd bg-glass-bg">
              <div className={`w-full h-16 rounded-xl ${token.bg} ${token.border ? "border border-glass-bd" : ""}`} />
              <div className="space-y-0.5">
                <span className="text-xs font-mono font-semibold block text-white">{token.name}</span>
                <span className="text-[10px] text-white/60 block">{token.hex}</span>
                <span className="text-[10px] text-mint-200 block">{token.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Button Variants */}
      <section className="space-y-6">
        <h2 className="text-2xl font-heading font-bold text-mint-200">2. Button Primitives (Pill Language)</h2>
        <div className="flex flex-wrap items-center gap-4 p-6 rounded-card border border-glass-bd bg-glass-bg">
          <Button variant="solid-yellow" size="md">
            Trade this on WhatsApp
          </Button>
          <Button variant="solid-green" size="md">
            Explore Services
          </Button>
          <Button variant="glass" size="md">
            Trade now
          </Button>
          <Button variant="white-pill-arrow" size="md">
            Learn more
          </Button>
          <Button variant="solid-yellow" size="sm">
            Compact CTA ▸
          </Button>
          <Button variant="solid-yellow" size="lg">
            Large Display CTA
          </Button>
        </div>
      </section>

      {/* 3. Tags & Chips */}
      <section className="space-y-6">
        <h2 className="text-2xl font-heading font-bold text-mint-200">3. Tags & Contact Chips</h2>
        <div className="flex flex-wrap items-center gap-4 p-6 rounded-card border border-glass-bd bg-glass-bg">
          <Tag variant="outline">BC 2 LIGHT</Tag>
          <Tag variant="solid">GIFT CARDS</Tag>
          <Tag variant="yellow">LIVE RATE</Tag>
          <Chip
            icon={<MessageCircle className="w-3.5 h-3.5 text-ink-900" />}
            label="07052367655"
            variant="yellow"
          />
          <Chip
            icon={<Instagram className="w-3.5 h-3.5 text-white" />}
            label="@dPanda.ng"
            variant="dark"
          />
          <Chip
            icon={<Globe className="w-3.5 h-3.5 text-ink-900" />}
            label="www.dpanda.ng"
            variant="mint"
          />
        </div>
      </section>

      {/* 4. Glass Cards & Surface Elevation */}
      <section className="space-y-6">
        <h2 className="text-2xl font-heading font-bold text-mint-200">4. Glass Cards (Backdrop Blur & Hairline Border)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-6 space-y-4">
            <Tag variant="outline">CARD A</Tag>
            <h3 className="text-lg font-heading font-bold">Standard Glass Surface</h3>
            <p className="text-sm text-white/70 font-body">
              `backdrop-filter: blur(20px) saturate(140%)` with a 1px `--glass-bd` border.
            </p>
          </GlassCard>

          <GlassCard variant="raised" className="p-6 space-y-4">
            <Tag variant="solid">CARD B</Tag>
            <h3 className="text-lg font-heading font-bold">Raised Glass Surface</h3>
            <p className="text-sm text-white/70 font-body">
              Deep green elevated surface with soft highlight rim and depth drop-shadow.
            </p>
          </GlassCard>

          <GlassCard variant="interactive" className="p-6 space-y-4">
            <Tag variant="yellow">CARD C</Tag>
            <h3 className="text-lg font-heading font-bold">Interactive Glass Surface</h3>
            <p className="text-sm text-white/70 font-body">
              Hover over this card to verify smooth background and border transitions.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* 5. Motion Components: RotatingBadge & Odometer */}
      <section className="space-y-6">
        <h2 className="text-2xl font-heading font-bold text-mint-200">5. Motion Primitives</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-6 rounded-card border border-glass-bd bg-glass-bg">
          <div className="flex items-center gap-6">
            <RotatingBadge />
            <div className="space-y-1">
              <span className="font-heading font-bold text-base block">Rotating Badge</span>
              <span className="text-xs text-white/60 block">14s linear continuous loop. Pauses on hover.</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="space-y-1">
              <span className="font-heading font-bold text-base block">Odometer Number Roll</span>
              <span className="text-xs text-white/60 block">400ms vertical rolling animation on rate update.</span>
            </div>
            <div className="flex items-center gap-4">
              <OdometerNumber
                value={odometerVal}
                prefix="₦"
                className="text-3xl md:text-4xl font-extrabold text-yellow-400 font-heading"
              />
              <Button
                variant="solid-green"
                size="sm"
                onClick={() => setOdometerVal((prev) => prev + Math.floor(Math.random() * 2500 + 500))}
              >
                Simulate Rate Bump
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Extracted 3D Assets Canvas */}
      <section className="space-y-6">
        <h2 className="text-2xl font-heading font-bold text-mint-200">6. Isolated 3D Assets Gallery</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { name: "panda-standing", path: "/assets/3d/panda-standing.webp", label: "Standing Mascot" },
            { name: "panda-phone", path: "/assets/3d/panda-phone.webp", label: "Phone Mascot" },
            { name: "coin-btc", path: "/assets/3d/coin-btc.webp", label: "Bitcoin Coin" },
            { name: "coin-usdt", path: "/assets/3d/coin-usdt.webp", label: "USDT Tether" },
            { name: "coin-eth", path: "/assets/3d/coin-eth.webp", label: "Ethereum" },
            { name: "card-amazon", path: "/assets/3d/card-amazon.webp", label: "Amazon Card" },
          ].map((item) => (
            <GlassCard key={item.name} className="p-3 flex flex-col items-center justify-between text-center gap-2">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <Image
                  src={item.path}
                  alt={item.label}
                  width={96}
                  height={96}
                  className="object-contain max-h-24"
                />
              </div>
              <span className="text-[11px] font-heading font-semibold text-white/80">{item.label}</span>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}
