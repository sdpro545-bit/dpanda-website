"use client";

import React, { useState, useMemo } from "react";
import useSWR from "swr";
import { CryptoAsset } from "@/lib/data/types";
import { BRAND } from "@/config/brand";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { OdometerNumber } from "@/components/ui/OdometerNumber";
import { TrendingUp, TrendingDown, ArrowRightLeft } from "lucide-react";
import Image from "next/image";

import { getCryptoIconPath } from "@/lib/data/cryptoIcons";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const CryptoCalculator: React.FC = () => {
  // Poll crypto prices every 30s
  const { data: coins, error, isLoading } = useSWR<CryptoAsset[]>(
    "/api/rates/crypto",
    fetcher,
    { refreshInterval: 30000, revalidateOnFocus: true }
  );

  const [selectedSymbol, setSelectedSymbol] = useState<string>("BTC");
  const [inputMode, setInputMode] = useState<"units" | "usd">("usd");
  const [amount, setAmount] = useState<number>(100);

  const activeCoin = useMemo(() => {
    return coins?.find((c) => c.symbol === selectedSymbol) ?? {
      symbol: "BTC",
      name: "Bitcoin",
      coingeckoId: "bitcoin",
      ngnPerUsd: 1650,
      usdPrice: 76400,
      change24h: 2.4,
      sortOrder: 1,
      isActive: true,
      isSeed: true,
      updatedAt: new Date().toISOString(),
    };
  }, [coins, selectedSymbol]);

  // Payout calculation formula from Section 7.2
  // payout = floor(coinAmount * usdPrice * ngn_per_usd)
  const { coinAmount, usdValue, payoutNgn } = useMemo(() => {
    const usdPrice = activeCoin.usdPrice || 1;
    let computedCoin = 0;
    let computedUsd = 0;
    if (inputMode === "usd") {
      computedUsd = amount;
      computedCoin = usdPrice > 0 ? amount / usdPrice : 0;
    } else {
      computedCoin = amount;
      computedUsd = amount * usdPrice;
    }

    const payout = Math.floor(computedUsd * activeCoin.ngnPerUsd);
    return {
      coinAmount: computedCoin,
      usdValue: computedUsd,
      payoutNgn: payout,
    };
  }, [amount, inputMode, activeCoin]);

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

  // WhatsApp Deep Link for Crypto per Section 7.4
  const whatsappUrl = useMemo(() => {
    const rateLine =
      activeCoin.ngnPerUsd > 0
        ? `Rate: ₦${activeCoin.ngnPerUsd.toLocaleString()} per $1\nEstimated payout: ₦${payoutNgn.toLocaleString()}`
        : "Rate: Custom quote requested (pending admin set)\nEstimated payout: Quoted on chat";

    const msg = [
      "Hello dPanda, I want to trade.",
      "",
      `Coin: ${activeCoin.name} (${activeCoin.symbol})`,
      `Amount: ${coinAmount.toFixed(activeCoin.symbol === "USDT" ? 2 : 6)} ${activeCoin.symbol} (~$${usdValue.toFixed(2)})`,
      `Price (USD): $${(activeCoin.usdPrice || 0).toLocaleString()}`,
      rateLine,
      `Rate seen at: ${lagosTime}`,
    ].join("\n");

    return `https://wa.me/${BRAND.whatsappNumberIntl}?text=${encodeURIComponent(msg)}`;
  }, [activeCoin, coinAmount, usdValue, payoutNgn, lagosTime]);

  return (
    <GlassCard className="p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.06)] pb-4">
        <div>
          <Eyebrow>Crypto Calculator</Eyebrow>
          <h2 className="text-xl md:text-2xl font-heading font-semibold text-[#F5F5F7] mt-2">
            Crypto Payout Calculator
          </h2>
        </div>
        <div className="text-right">
          <span className="text-[11px] font-heading text-[#86868B] uppercase tracking-widest block">
            Payout Rate
          </span>
          <span className="text-base md:text-lg font-heading font-semibold text-[#F5F5F7] tabular-nums">
            {activeCoin.ngnPerUsd > 0
              ? `₦${activeCoin.ngnPerUsd.toLocaleString()} / $1`
              : "Rate on request"}
          </span>
        </div>
      </div>

      {/* 1. Coin Selector */}
      <div className="space-y-2.5">
        <label className="text-xs font-heading font-medium uppercase tracking-wider text-[#86868B]">
          Select Cryptocurrency
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {(coins || [activeCoin]).map((coin) => {
            const isSelected = coin.symbol === selectedSymbol;
            return (
              <button
                key={coin.symbol}
                type="button"
                onClick={() => setSelectedSymbol(coin.symbol)}
                className={`p-3 rounded-[20px] border text-left transition-all flex items-center gap-3 ${
                  isSelected
                    ? "bg-[#2FCB6E]/15 border-[#7CF0A8] text-[#F5F5F7] shadow-[0_0_12px_rgba(47,203,110,0.2)]"
                    : "bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.06)] text-[#86868B] hover:bg-[rgba(255,255,255,0.06)] hover:text-[#F5F5F7]"
                }`}
              >
                <div className="relative w-8 h-8 shrink-0">
                  <Image
                    src={getCryptoIconPath(coin.symbol)}
                    alt={coin.symbol}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-heading font-semibold truncate">
                    {coin.symbol}
                  </div>
                  <div className="text-[11px] text-[#6E6E73] tabular-nums">
                    ${(coin.usdPrice ?? 0).toLocaleString()}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Amount Input & Toggle */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-heading font-medium uppercase tracking-wider text-[#86868B]">
            Amount to Trade ({inputMode === "usd" ? "USD" : activeCoin.symbol})
          </label>
          <button
            type="button"
            onClick={() =>
              setInputMode((prev) => (prev === "usd" ? "units" : "usd"))
            }
            className="inline-flex items-center gap-1.5 text-xs text-[#2FCB6E] hover:text-[#7CF0A8] font-heading font-medium transition-colors"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>
              Switch to {inputMode === "usd" ? activeCoin.symbol : "USD"}
            </span>
          </button>
        </div>

        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-heading font-semibold text-[#86868B]">
            {inputMode === "usd" ? "$" : activeCoin.symbol}
          </span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step="any"
            value={amount || ""}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full pl-16 pr-4 py-3 rounded-[20px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-xl font-heading font-semibold text-[#F5F5F7] tabular-nums focus:outline-none focus:border-[#2FCB6E] transition-colors"
          />
        </div>

        {/* Conversion breakdown */}
        <div className="flex items-center justify-between text-xs text-[#86868B] pt-1 font-body">
          <span>
            {inputMode === "usd"
              ? `≈ ${coinAmount.toFixed(activeCoin.symbol === "USDT" ? 2 : 6)} ${activeCoin.symbol}`
              : `≈ $${usdValue.toFixed(2)} USD`}
          </span>
          <span className="flex items-center gap-1">
            24h:
            {(activeCoin.change24h ?? 0) >= 0 ? (
              <span className="text-[#2FCB6E] flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" />+
                {(activeCoin.change24h ?? 0).toFixed(2)}%
              </span>
            ) : (
              <span className="text-red-400 flex items-center">
                <TrendingDown className="w-3 h-3 mr-0.5" />
                {(activeCoin.change24h ?? 0).toFixed(2)}%
              </span>
            )}
          </span>
        </div>
      </div>

      {/* 3. Payout Display */}
      <div className="p-6 rounded-[24px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-xl">
        <div>
          <span className="text-xs font-heading font-medium uppercase tracking-wider text-[#86868B] block">
            Estimated Naira Payout
          </span>
          <OdometerNumber
            value={payoutNgn > 0 ? payoutNgn : 0}
            prefix="₦"
            className="text-3xl md:text-4xl font-heading font-semibold text-[var(--yellow-400)] tracking-tight tabular-nums"
          />
        </div>

        <Button
          href={whatsappUrl}
          isExternal
          variant="solid-green"
          size="md"
          disabled={amount <= 0}
          className="shrink-0"
        >
          {activeCoin.ngnPerUsd > 0 ? "Trade this on WhatsApp" : "Request Quote on WhatsApp"}
        </Button>
      </div>

      {/* Footnote & Timestamp */}
      <div className="text-[11px] text-[#6E6E73] space-y-1 font-body">
        <p>
          Prices update every 30 seconds. Rate seen at {lagosTime} (Lagos).
        </p>
        <p className="text-[10px] text-[#6E6E73] italic">
          {BRAND.ratesDisclaimer}
        </p>
      </div>
    </GlassCard>
  );
};
