"use client";

import React, { useState } from "react";
import useSWR from "swr";
import { GiftCard, GiftCardRate } from "@/lib/data/types";
import { GiftCardCalculator } from "@/components/calculator/GiftCardCalculator";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Search } from "lucide-react";
import Image from "next/image";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function GiftCardsPage() {
  const { data } = useSWR<{ cards: GiftCard[]; rates: GiftCardRate[] }>(
    "/api/rates/giftcards",
    fetcher
  );

  const [search, setSearch] = useState("");
  const [currencyFilter, setCurrencyFilter] = useState<string>("ALL");

  const rates = data?.rates ?? [];

  const filteredRates = rates.filter((r) => {
    const matchesSearch =
      r.cardName.toLowerCase().includes(search.toLowerCase()) ||
      r.variant.toLowerCase().includes(search.toLowerCase());
    const matchesCurrency =
      currencyFilter === "ALL" || r.currency === currencyFilter;
    return matchesSearch && matchesCurrency;
  });

  return (
    <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-20">
      {/* 3D Panda Thumbs Up Background Blend */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] pointer-events-none select-none -z-10 overflow-hidden">
        <div
          className="relative w-full h-full opacity-[0.11] transform -translate-y-2"
          style={{
            maskImage: "radial-gradient(circle at 50% 45%, black 40%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(circle at 50% 45%, black 40%, transparent 75%)",
          }}
        >
          <Image
            src="/assets/3d/panda-thumbs-up.webp"
            alt="dPanda Ambassador"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
      {/* Page Header */}
      <ScrollReveal className="text-center max-w-2xl mx-auto space-y-4">
        <Eyebrow>Today&apos;s Rates</Eyebrow>
        <h1 className="text-4xl md:text-5xl font-heading font-semibold text-[#F5F5F7] tracking-tight">
          Today&apos;s Gift Card Rates
        </h1>
        <p className="text-[#86868B] font-body text-[17px] leading-[1.47]">
          Check live rates and calculate your naira payout. All payouts are transferred directly to your bank account after WhatsApp confirmation.
        </p>

        {/* Asset Category Toggle */}
        <div className="flex items-center justify-center pt-2">
          <div className="flex p-1 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]">
            <span className="px-5 py-1.5 rounded-full text-xs font-heading font-medium bg-[#2FCB6E] text-[#020605] shadow-[0_2px_8px_rgba(47,203,110,0.3)]">
              Gift Cards
            </span>
            <a
              href="/crypto"
              className="px-5 py-1.5 rounded-full text-xs font-heading font-medium text-[#86868B] hover:text-[#F5F5F7] transition-colors"
            >
              Crypto Rates
            </a>
          </div>
        </div>
      </ScrollReveal>

      {/* Top: Full Interactive Calculator */}
      <ScrollReveal className="max-w-3xl mx-auto" delay={100}>
        <GiftCardCalculator />
      </ScrollReveal>

      {/* Bottom: Complete Searchable & Filterable Rates Table */}
      <ScrollReveal className="space-y-6" delay={150}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h2 className="text-2xl font-heading font-semibold text-[#F5F5F7]">
            All Gift Card Rates
          </h2>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Currency Filter */}
            <div className="flex items-center gap-1 bg-[rgba(255,255,255,0.04)] p-1 rounded-full border border-[rgba(255,255,255,0.06)]">
              {["ALL", "USD", "GBP"].map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrencyFilter(curr)}
                  className={`px-3 py-1 rounded-full text-xs font-heading font-medium transition-all ${
                    currencyFilter === curr
                      ? "bg-[#2FCB6E] text-[#020605]"
                      : "text-[#86868B] hover:text-[#F5F5F7]"
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-[#6E6E73] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search card..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-[#F5F5F7] placeholder-[#6E6E73] focus:outline-none focus:border-[#2FCB6E] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-hidden rounded-[28px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.45)]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.015)] text-[11px] font-heading uppercase tracking-widest text-[#86868B]">
                <th className="py-4 px-6 font-medium">Card</th>
                <th className="py-4 px-6 font-medium">Type / Region</th>
                <th className="py-4 px-6 font-medium">Currency</th>
                <th className="py-4 px-6 font-medium">Range</th>
                <th className="py-4 px-6 font-medium">Naira Rate</th>
                <th className="py-4 px-6 font-medium">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(255,255,255,0.04)] text-sm font-body">
              {filteredRates.map((rate) => (
                <tr
                  key={rate.id}
                  className="hover:bg-[rgba(255,255,255,0.03)] transition-colors"
                >
                  <td className="py-4 px-6 font-heading font-semibold text-[#F5F5F7]">
                    {rate.cardName}
                  </td>
                  <td className="py-4 px-6 text-[#86868B]">{rate.variant}</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#F5F5F7]">
                      {rate.currency}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[#86868B] tabular-nums">
                    {rate.currency === "GBP" ? "£" : "$"}
                    {rate.minAmount} –{" "}
                    {rate.maxAmount
                      ? `${rate.currency === "GBP" ? "£" : "$"}${rate.maxAmount}`
                      : "No limit"}
                  </td>
                  <td className="py-4 px-6 font-heading font-semibold text-[var(--yellow-400)] tabular-nums text-base">
                    ₦{rate.rateNgn.toLocaleString()} /{" "}
                    {rate.currency === "GBP" ? "£" : "$"}1
                  </td>
                  <td className="py-4 px-6 text-xs text-[#6E6E73]">
                    {rate.note || "Standard verification"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card List View */}
        <div className="md:hidden space-y-3">
          {filteredRates.map((rate) => (
            <GlassCard key={rate.id} className="p-5 space-y-2.5 rounded-[24px]">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-semibold text-base text-[#F5F5F7]">
                  {rate.cardName}
                </h3>
                <span className="font-heading font-semibold text-[var(--yellow-400)] tabular-nums text-base">
                  ₦{rate.rateNgn.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#86868B] font-body">
                <span>{rate.variant}</span>
                <span className="tabular-nums">
                  Min: {rate.currency === "GBP" ? "£" : "$"}
                  {rate.minAmount}
                </span>
              </div>
              {rate.note && (
                <p className="text-[11px] text-[#6E6E73] pt-2 border-t border-[rgba(255,255,255,0.04)]">
                  {rate.note}
                </p>
              )}
            </GlassCard>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}
