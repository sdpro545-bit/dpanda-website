"use client";

import React, { useState, useEffect, useMemo } from "react";
import useSWR from "swr";
import { GiftCard, GiftCardRate, QuoteResponse } from "@/lib/data/types";
import { BRAND } from "@/config/brand";
import { SITE_COPY } from "@/content/site";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { OdometerNumber } from "@/components/ui/OdometerNumber";
import { Search, Info, ShieldCheck, AlertCircle } from "lucide-react";
import Image from "next/image";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface GiftCardCalculatorProps {
  compact?: boolean;
}

export const GiftCardCalculator: React.FC<GiftCardCalculatorProps> = ({
  compact = false,
}) => {
  // SWR: poll every 15s, pause on tab hidden, refetch on window focus
  const { data, error, isLoading } = useSWR<{
    cards: GiftCard[];
    rates: GiftCardRate[];
  }>("/api/rates/giftcards", fetcher, {
    refreshInterval: 15000,
    revalidateOnFocus: true,
  });

  const cards = data?.cards ?? [];
  const rates = data?.rates ?? [];

  const [selectedCardSlug, setSelectedCardSlug] = useState<string>("amazon");
  const [selectedVariant, setSelectedVariant] = useState<string>("US e-code");
  const [amount, setAmount] = useState<number>(100);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [isQuoting, setIsQuoting] = useState<boolean>(false);

  // Available variants for selected card
  const availableVariants = useMemo(() => {
    return rates.filter((r) => r.cardSlug === selectedCardSlug && r.isActive);
  }, [rates, selectedCardSlug]);

  // Set default variant when card changes
  useEffect(() => {
    if (availableVariants.length > 0) {
      const exists = availableVariants.some((v) => v.variant === selectedVariant);
      if (!exists) {
        setSelectedVariant(availableVariants[0].variant);
      }
    }
  }, [selectedCardSlug, availableVariants, selectedVariant]);

  const activeRate = useMemo(() => {
    return availableVariants.find((v) => v.variant === selectedVariant);
  }, [availableVariants, selectedVariant]);

  // Debounced quote calculation via server API
  useEffect(() => {
    if (!selectedCardSlug || !selectedVariant || !amount || amount <= 0) {
      setQuote(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsQuoting(true);
      try {
        const res = await fetch("/api/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cardSlug: selectedCardSlug,
            variant: selectedVariant,
            amount,
          }),
        });
        const data = await res.json();
        setQuote(data);
      } catch {
        setQuote(null);
      } finally {
        setIsQuoting(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [selectedCardSlug, selectedVariant, amount]);

  // Timestamp in Africa/Lagos
  const lagosTime = useMemo(() => {
    try {
      return new Intl.DateTimeFormat("en-GB", {
        timeZone: "Africa/Lagos",
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "short",
      }).format(new Date());
    } catch {
      return "";
    }
  }, []);

  // WhatsApp Deep Link per Section 7.4
  const whatsappUrl = useMemo(() => {
    if (!quote || !quote.valid || !activeRate) return "#";
    const symbol = quote.currency === "GBP" ? "£" : "$";
    const msg = [
      "Hello dPanda, I want to trade.",
      "",
      `Card: ${quote.cardName} (${quote.variant})`,
      `Amount: ${symbol}${quote.amount}`,
      `Rate: ₦${quote.rateNgn.toLocaleString()} per ${symbol}1`,
      `Estimated payout: ₦${quote.payoutNgn.toLocaleString()}`,
      `Rate seen at: ${lagosTime}`,
    ].join("\n");

    return `https://wa.me/${BRAND.whatsappNumberIntl}?text=${encodeURIComponent(msg)}`;
  }, [quote, activeRate, lagosTime]);

  const quickAmounts = [25, 50, 100, 200, 500];

  return (
    <GlassCard className="p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.06)] pb-4">
        <div>
          <Eyebrow>Rates Calculator</Eyebrow>
          <h2 className="text-xl md:text-2xl font-heading font-semibold text-[#F5F5F7] mt-2">
            {SITE_COPY.heroCards.calculator.title}
          </h2>
        </div>
        {activeRate && (
          <div className="text-right">
            <span className="text-[11px] font-heading text-[#86868B] uppercase tracking-widest block">
              Active Rate
            </span>
            <span className="text-sm md:text-base font-heading font-semibold text-[#F5F5F7] tabular-nums">
              ₦{activeRate.rateNgn.toLocaleString()} /{" "}
              {activeRate.currency === "GBP" ? "£" : "$"}1
            </span>
          </div>
        )}
      </div>

      {/* 1. Card Selector */}
      <div className="space-y-2.5">
        <label className="text-xs font-heading font-medium uppercase tracking-wider text-[#86868B]">
          {SITE_COPY.heroCards.calculator.labels.card}
        </label>
        {!compact && (
          <div className="relative mb-2">
            <Search className="w-4 h-4 text-[#6E6E73] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search cards (e.g. Amazon, Steam, Apple)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-[#F5F5F7] placeholder-[#6E6E73] focus:outline-none focus:border-[#2FCB6E] transition-colors"
            />
          </div>
        )}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-36 overflow-y-auto pr-1">
          {cards
            .filter((c) =>
              c.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((card) => {
              const isSelected = card.slug === selectedCardSlug;
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setSelectedCardSlug(card.slug)}
                  className={`p-2.5 rounded-[14px] text-center border transition-all duration-150 flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? "bg-[#2FCB6E]/15 border-[#7CF0A8] text-[#F5F5F7] shadow-[0_0_12px_rgba(47,203,110,0.2)]"
                      : "bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.06)] text-[#86868B] hover:bg-[rgba(255,255,255,0.06)] hover:text-[#F5F5F7]"
                  }`}
                >
                  <span className="text-xs font-heading font-medium truncate w-full">
                    {card.name}
                  </span>
                </button>
              );
            })}
        </div>
      </div>

      {/* 2. Variant Selector */}
      {availableVariants.length > 0 && (
        <div className="space-y-2.5">
          <label className="text-xs font-heading font-medium uppercase tracking-wider text-[#86868B]">
            {SITE_COPY.heroCards.calculator.labels.type}
          </label>
          <div className="flex flex-wrap gap-2">
            {availableVariants.map((v) => {
              const isSelected = v.variant === selectedVariant;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVariant(v.variant)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-heading font-medium transition-all duration-150 ${
                    isSelected
                      ? "bg-[#2FCB6E] text-[#020605]"
                      : "bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-[#86868B] hover:text-[#F5F5F7] hover:bg-[rgba(255,255,255,0.06)]"
                  }`}
                >
                  {v.variant} ({v.currency})
                </button>
              );
            })}
          </div>
          {activeRate?.note && (
            <p className="text-[11px] text-[#6E6E73] flex items-center gap-1.5 mt-1">
              <Info className="w-3.5 h-3.5 shrink-0 text-[#2FCB6E]" />
              <span>{activeRate.note}</span>
            </p>
          )}
        </div>
      )}

      {/* 3. Amount Input & Quick Chips */}
      <div className="space-y-2.5">
        <label className="text-xs font-heading font-medium uppercase tracking-wider text-[#86868B]">
          {SITE_COPY.heroCards.calculator.labels.amount} (
          {activeRate?.currency === "GBP" ? "£" : "$"})
        </label>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-heading font-semibold text-[#86868B]">
              {activeRate?.currency === "GBP" ? "£" : "$"}
            </span>
            <input
              type="number"
              inputMode="decimal"
              min={activeRate?.minAmount || 10}
              max={activeRate?.maxAmount || 5000}
              value={amount || ""}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full pl-10 pr-4 py-3 rounded-[20px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-xl font-heading font-semibold text-[#F5F5F7] tabular-nums focus:outline-none focus:border-[#2FCB6E] transition-colors"
            />
          </div>
        </div>

        {/* Quick Amount Chips */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-[11px] uppercase tracking-wider text-[#6E6E73]">
            Quick:
          </span>
          {quickAmounts.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => setAmount(q)}
              className={`px-3 py-1 text-xs rounded-full border transition-all ${
                amount === q
                  ? "bg-[#F5F5F7] text-[#020605] border-[#F5F5F7] font-medium"
                  : "bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#86868B] hover:text-[#F5F5F7]"
              }`}
            >
              ${q}
            </button>
          ))}
        </div>
      </div>

      {/* Error or Warning banner */}
      {quote && !quote.valid && (
        <div className="p-3.5 rounded-[16px] bg-yellow-400/10 border border-yellow-400/20 flex items-center gap-2.5 text-xs text-yellow-300">
          <AlertCircle className="w-4 h-4 shrink-0 text-yellow-400" />
          <span>{quote.error}</span>
        </div>
      )}

      {/* 4. Payout Display */}
      <div className="p-6 rounded-[24px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-xl">
        <div>
          <span className="text-xs font-heading font-medium uppercase tracking-wider text-[#86868B] block">
            {SITE_COPY.heroCards.calculator.labels.payout}
          </span>
          <OdometerNumber
            value={quote?.valid ? quote.payoutNgn : 0}
            prefix="₦"
            className="text-3xl md:text-4xl font-heading font-semibold text-[var(--yellow-400)] tracking-tight tabular-nums"
          />
        </div>

        <Button
          href={whatsappUrl}
          isExternal
          variant="solid-green"
          size="md"
          disabled={!quote || !quote.valid || isQuoting}
          className="shrink-0"
        >
          {SITE_COPY.heroCards.calculator.cta}
        </Button>
      </div>

      {/* Footnote & Timestamp */}
      <div className="text-[11px] text-[#6E6E73] space-y-1 font-body">
        <p>
          {SITE_COPY.heroCards.calculator.footnotePrefix} {lagosTime} (Lagos).{" "}
          {SITE_COPY.heroCards.calculator.footnoteSuffix}
        </p>
        <p className="text-[10px] text-[#6E6E73] italic">
          {BRAND.ratesDisclaimer}
        </p>
      </div>
    </GlassCard>
  );
};
