"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import useSWR from "swr";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/IconTile";
import { OdometerNumber } from "@/components/ui/OdometerNumber";
import { GiftCard, GiftCardRate, CryptoAsset, PublicSettings } from "@/lib/data/types";
import { getCryptoIconPath } from "@/lib/data/cryptoIcons";
import { BRAND } from "@/config/brand";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function formatTimeLagos(isoString?: string) {
  try {
    const d = isoString ? new Date(isoString) : new Date();
    return new Intl.DateTimeFormat("en-NG", {
      timeZone: "Africa/Lagos",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(d);
  } catch {
    return "now";
  }
}

interface CarouselCardItem {
  id: string;
  slug: string;
  name: string;
  symbol?: string;
  iconPath: string;
  subtitle: string;
  rates?: GiftCardRate[];
  ngnPerUsd?: number;
  usdPrice?: number;
  isCrypto: boolean;
}

export const Carousel3D: React.FC = () => {
  const [mode, setMode] = useState<"cards" | "crypto">("cards");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Data fetching
  const { data: cardsData, error: cardsError } = useSWR<{ cards: GiftCard[]; rates: GiftCardRate[] }>(
    "/api/rates/giftcards",
    fetcher,
    { refreshInterval: 15000 }
  );

  const { data: cryptoData, error: cryptoError } = useSWR<CryptoAsset[]>(
    "/api/rates/crypto",
    fetcher,
    { refreshInterval: 30000 }
  );

  const { data: settingsData } = useSWR<PublicSettings>(
    "/api/settings/public",
    fetcher,
    { refreshInterval: 10000 }
  );

  const cards = useMemo(() => cardsData?.cards?.filter((c) => c.isActive) || [], [cardsData]);
  const rates = useMemo(() => cardsData?.rates?.filter((r) => r.isActive) || [], [cardsData]);
  const cryptoAssets = useMemo(() => cryptoData?.filter((c) => c.isActive) || [], [cryptoData]);

  // Current list based on mode
  const currentItems: CarouselCardItem[] = useMemo(() => {
    if (mode === "cards") {
      return cards.map((c) => {
        const cardRates = rates.filter((r) => r.cardSlug === c.slug);
        return {
          id: c.id,
          slug: c.slug,
          name: c.name,
          // Never fall back to the brand mascot
          iconPath: c.logoPath || "/assets/giftcards/xbox.svg",
          subtitle: "Input card amount to be traded",
          rates: cardRates,
          isCrypto: false,
        };
      });
    } else {
      return cryptoAssets.map((coin) => ({
        id: coin.symbol,
        slug: coin.symbol.toLowerCase(),
        name: coin.name,
        symbol: coin.symbol,
        // Shared symbol-to-icon map, never fallback to coin-sol
        iconPath: getCryptoIconPath(coin.symbol),
        subtitle: `${coin.symbol} · Instant`,
        ngnPerUsd: coin.ngnPerUsd,
        usdPrice: coin.usdPrice,
        isCrypto: true,
      }));
    }
  }, [mode, cards, rates, cryptoAssets]);

  // Bound active index when items change
  useEffect(() => {
    setActiveIndex(0);
  }, [mode]);

  const activeItem = currentItems[activeIndex] || null;

  // Selected variant for active gift card
  const [selectedVariantId, setSelectedVariantId] = useState<string>("");
  const [amount, setAmount] = useState<number>(100);

  // Update variant when active item changes
  useEffect(() => {
    if (activeItem && !activeItem.isCrypto && activeItem.rates && activeItem.rates.length > 0) {
      setSelectedVariantId(activeItem.rates[0].id);
    }
  }, [activeItem]);

  const selectedRate = useMemo(() => {
    if (!activeItem || activeItem.isCrypto || !activeItem.rates) return null;
    return activeItem.rates.find((r: GiftCardRate) => r.id === selectedVariantId) || activeItem.rates[0] || null;
  }, [activeItem, selectedVariantId]);

  // Calculations
  const hasRate = useMemo(() => {
    if (!activeItem) return false;
    if (activeItem.isCrypto) {
      return (activeItem.ngnPerUsd ?? 0) > 0;
    }
    return Boolean(selectedRate && selectedRate.rateNgn > 0);
  }, [activeItem, selectedRate]);

  const payout = useMemo(() => {
    if (!activeItem || !hasRate) return 0;
    if (activeItem.isCrypto) {
      const rate = activeItem.ngnPerUsd || 0;
      return Math.floor(amount * rate);
    } else if (selectedRate) {
      return Math.floor(amount * selectedRate.rateNgn);
    }
    return 0;
  }, [activeItem, selectedRate, amount, hasRate]);

  const currencySymbol = useMemo(() => {
    if (activeItem?.isCrypto) return "$";
    if (selectedRate?.currency === "GBP") return "£";
    return "$";
  }, [activeItem, selectedRate]);

  // WhatsApp trade URL
  const whatsappUrl = useMemo(() => {
    const phone = settingsData?.whatsappNumberIntl || BRAND.whatsappNumberIntl;
    const nowTime = formatTimeLagos();
    let msg = "";

    if (activeItem?.isCrypto) {
      const rateText = (activeItem.ngnPerUsd ?? 0) > 0 ? `₦${activeItem.ngnPerUsd} per $1` : "{owner to supply}";
      const payoutText = (activeItem.ngnPerUsd ?? 0) > 0 ? `₦${payout.toLocaleString()}` : "Rate confirmation on chat";
      msg = `Hello dPanda, I want to trade.\n\nCoin: ${activeItem.name} (${activeItem.symbol})\nAmount: $${amount}\nRate: ${rateText}\nEstimated payout: ${payoutText}\nRate seen at: ${nowTime}`;
    } else if (selectedRate) {
      msg = `Hello dPanda, I want to trade.\n\nCard: ${activeItem?.name} (${selectedRate.variant})\nAmount: ${currencySymbol}${amount}\nRate: ₦${selectedRate.rateNgn} per ${currencySymbol}1\nEstimated payout: ₦${payout.toLocaleString()}\nRate seen at: ${nowTime}`;
    }

    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  }, [activeItem, selectedRate, amount, payout, currencySymbol, settingsData]);

  const isRatesPaused = settingsData?.ratesPaused || false;

  // --------------------------------------------------------------------------
  // AUTOPLAY ENGINE (Requirement 5)
  // - After 4s of no interaction, advance every 5s, looping through all items
  // - Pause on pointer hover, keyboard focus, typing in input, touch
  // - Resume 8s after last interaction
  // - Progress indicator resets on mode change and fills over interval
  // - Stop under prefers-reduced-motion
  // - aria-live="off" while autoplaying
  // --------------------------------------------------------------------------
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [intervalProgress, setIntervalProgress] = useState(0); // 0 to 1

  const interactionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressAnimRef = useRef<number | null>(null);
  const lastAdvanceTimeRef = useRef<number>(Date.now());

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Handler for user interaction (pauses autoplay, resumes 8s after last touch/hover/focus)
  const notifyUserInteraction = useCallback(() => {
    setIsUserInteracting(true);
    setIntervalProgress(0);

    if (interactionTimerRef.current) {
      clearTimeout(interactionTimerRef.current);
    }
    interactionTimerRef.current = setTimeout(() => {
      setIsUserInteracting(false);
      lastAdvanceTimeRef.current = Date.now();
    }, 8000);
  }, []);

  // Advance carousel
  const handleNext = useCallback(() => {
    if (currentItems.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % currentItems.length);
    setIntervalProgress(0);
    lastAdvanceTimeRef.current = Date.now();
  }, [currentItems.length]);

  const handlePrev = useCallback(() => {
    if (currentItems.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + currentItems.length) % currentItems.length);
    setIntervalProgress(0);
    lastAdvanceTimeRef.current = Date.now();
  }, [currentItems.length]);

  // Autoplay ticker and progress animation
  useEffect(() => {
    if (reducedMotion || currentItems.length <= 1) {
      setIntervalProgress(0);
      return;
    }

    if (isUserInteracting) {
      setIntervalProgress(0);
      return;
    }

    const INTERVAL_MS = 3000;
    const INITIAL_DELAY_MS = 3000;

    // Reset progress when mode changes or autoplay starts
    setIntervalProgress(0);
    lastAdvanceTimeRef.current = Date.now() + (INITIAL_DELAY_MS - INTERVAL_MS);

    let isRunning = true;

    const tick = () => {
      if (!isRunning) return;
      const now = Date.now();
      const elapsed = now - lastAdvanceTimeRef.current;

      if (elapsed >= INTERVAL_MS) {
        handleNext();
        lastAdvanceTimeRef.current = now;
      } else {
        const progress = Math.max(0, Math.min(1, elapsed / INTERVAL_MS));
        setIntervalProgress(progress);
      }

      progressAnimRef.current = requestAnimationFrame(tick);
    };

    progressAnimRef.current = requestAnimationFrame(tick);

    return () => {
      isRunning = false;
      if (progressAnimRef.current) cancelAnimationFrame(progressAnimRef.current);
    };
  }, [reducedMotion, isUserInteracting, mode, currentItems.length, handleNext]);

  // Clean timers on unmount
  useEffect(() => {
    const interTimer = interactionTimerRef.current;
    const autoTimer = autoplayTimerRef.current;
    const pAnim = progressAnimRef.current;
    return () => {
      if (interTimer) clearTimeout(interTimer);
      if (autoTimer) clearTimeout(autoTimer);
      if (pAnim) cancelAnimationFrame(pAnim);
    };
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    notifyUserInteraction();
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  // Touch / Swipe
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    notifyUserInteraction();
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    notifyUserInteraction();
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) handleNext();
    if (diff < -45) handlePrev();
  };

  return (
    <div
      className="relative z-10 max-w-[980px] mx-auto px-4 py-8"
      onPointerEnter={notifyUserInteraction}
      onPointerLeave={notifyUserInteraction}
      onFocusCapture={notifyUserInteraction}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      role="region"
      aria-roledescription="carousel"
      aria-label="Today's Rates Carousel"
      aria-live={isUserInteracting ? "polite" : "off"}
    >
      {/* Mode Switcher: Apple Segmented Pill */}
      <div className="flex items-center justify-center mb-10">
        <div className="flex p-1 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] backdrop-blur-xl">
          <button
            onClick={() => {
              notifyUserInteraction();
              setMode("cards");
            }}
            className={`px-5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 ${
              mode === "cards"
                ? "bg-[#2FCB6E] text-[#020605] shadow-[0_2px_8px_rgba(47,203,110,0.3)]"
                : "text-[#86868B] hover:text-[#F5F5F7]"
            }`}
          >
            Gift cards
          </button>
          <button
            onClick={() => {
              notifyUserInteraction();
              setMode("crypto");
            }}
            className={`px-5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 ${
              mode === "crypto"
                ? "bg-[#2FCB6E] text-[#020605] shadow-[0_2px_8px_rgba(47,203,110,0.3)]"
                : "text-[#86868B] hover:text-[#F5F5F7]"
            }`}
          >
            Crypto
          </button>
        </div>
      </div>

      {/* Main 3D Carousel Stage */}
      <div className="relative w-full h-[520px] flex items-center justify-center select-none overflow-x-clip">
        {/* Navigation Arrows near edges (about 5.7% from container edge) */}
        <button
          onClick={() => {
            notifyUserInteraction();
            handlePrev();
          }}
          aria-label="Previous card"
          className="absolute left-1 sm:left-4 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.22)] backdrop-blur-xl flex items-center justify-center text-[#F5F5F7] transition-all duration-150 active:scale-95 focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={() => {
            notifyUserInteraction();
            handleNext();
          }}
          aria-label="Next card"
          className="absolute right-1 sm:right-4 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.22)] backdrop-blur-xl flex items-center justify-center text-[#F5F5F7] transition-all duration-150 active:scale-95 focus:outline-none"
        >
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Arc Carousel Container */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ perspective: "1200px" }}
        >
          {currentItems.map((item, index) => {
            const count = currentItems.length;
            let offset = (index - activeIndex) % count;
            if (offset > count / 2) offset -= count;
            if (offset < -count / 2) offset += count;

            const isCenter = offset === 0;
            const isNearLeft = offset === -1;
            const isNearRight = offset === 1;
            const isVisible = isCenter || isNearLeft || isNearRight;

            // Responsive Arc geometry (Tuned for edge-to-edge mobile screens)
            const sideX = isMobile ? 135 : 282;
            let translateX = 0;
            let translateY = 0;
            let rotateZ = 0;
            let scale = 1;
            let opacity = 0;
            let blur = "0px";
            let zIndex = 10;

            if (isCenter) {
              translateX = 0;
              translateY = 0;
              rotateZ = 0;
              scale = 1;
              opacity = 1;
              blur = "0px";
              zIndex = 30;
            } else if (isNearLeft) {
              translateX = -sideX;
              translateY = isMobile ? 26 : 40;
              rotateZ = isMobile ? -6 : -9;
              scale = isMobile ? 0.74 : 0.9;
              opacity = isMobile ? 0.18 : 0.35;
              blur = "1px";
              zIndex = 20;
            } else if (isNearRight) {
              translateX = sideX;
              translateY = isMobile ? 26 : 40;
              rotateZ = isMobile ? 6 : 9;
              scale = isMobile ? 0.74 : 0.9;
              opacity = isMobile ? 0.18 : 0.35;
              blur = "1px";
              zIndex = 20;
            } else {
              translateX = offset < 0 ? (isMobile ? -280 : -520) : (isMobile ? 280 : 520);
              translateY = 90;
              rotateZ = offset < 0 ? -16 : 16;
              scale = 0.8;
              opacity = 0;
              blur = "2px";
              zIndex = 10;
            }

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (!isCenter) {
                    notifyUserInteraction();
                    setActiveIndex(index);
                  }
                }}
                style={{
                  transform: `translateX(${translateX}px) translateY(${translateY}px) rotateZ(${rotateZ}deg) scale(${scale})`,
                  opacity,
                  filter: `blur(${blur})`,
                  zIndex,
                  transition: "all 0.7s cubic-bezier(0.28, 0.11, 0.32, 1)",
                  pointerEvents: isVisible ? "auto" : "none",
                }}
                className={`absolute w-[calc(100vw-68px)] max-w-[280px] sm:max-w-[292px] rounded-[28px] bg-gradient-to-b from-[rgba(16,38,28,0.55)] via-[rgba(9,22,16,0.45)] to-[rgba(4,10,7,0.65)] border ${
                  isCenter
                    ? "border-[#2FCB6E]/40 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(47,203,110,0.20)]"
                    : "border-[#2FCB6E]/20 shadow-[0_16px_40px_rgba(0,0,0,0.6),0_0_16px_rgba(47,203,110,0.08)] cursor-pointer hover:opacity-50"
                } backdrop-blur-[24px] p-4 sm:p-5 pt-11 sm:pt-12 overflow-hidden transition-all duration-300`}
                aria-hidden={!isCenter}
              >
                {/* Top Glass Specular Rim Highlight */}
                <div className="absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#7CF0A8]/60 to-transparent pointer-events-none" />

                {/* 3D Icon Tile Overlapping Top Edge (Glossy curved rounded shape enclosing asset) */}
                <div className="absolute -top-[36px] sm:-top-[40px] left-1/2 -translate-x-1/2">
                  <IconTile
                    src={item.iconPath}
                    alt={item.name}
                    fallbackText={item.name}
                    size={isMobile ? 64 : 72}
                  />
                </div>

                {/* Card Header */}
                <div className="text-center mt-2 mb-3">
                  <h3 className="font-heading font-semibold text-xl sm:text-2xl text-[#F5F5F7] tracking-tight leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-[12px] text-[#86868B] tracking-tight mt-0.5 font-normal">
                    {item.subtitle}
                  </p>
                </div>

                {/* CENTRE CARD: FULL CALCULATOR CONTENT */}
                {isCenter ? (
                  <div className="space-y-3.5">
                    {isRatesPaused ? (
                      <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center space-y-2">
                        <AlertCircle className="w-5 h-5 text-amber-400 mx-auto" />
                        <p className="text-xs text-amber-200">
                          Rates are being updated. Message us directly on WhatsApp.
                        </p>
                        <Button
                          variant="solid-white"
                          size="sm"
                          href={`https://wa.me/${settingsData?.whatsappNumberIntl || BRAND.whatsappNumberIntl}`}
                          isExternal
                          className="w-full text-xs py-2"
                        >
                          Message Us
                        </Button>
                      </div>
                    ) : (
                      <>
                        {/* Variant Switcher for Gift Cards */}
                        {!item.isCrypto && item.rates && item.rates.length > 1 && (
                          <div className="flex rounded-full bg-black/50 p-1 border border-white/5 overflow-x-auto scrollbar-none">
                            {item.rates.map((r: GiftCardRate) => (
                              <button
                                key={r.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  notifyUserInteraction();
                                  setSelectedVariantId(r.id);
                                }}
                                className={`flex-1 py-1 px-2.5 rounded-full text-[11px] font-medium tracking-tight transition-colors whitespace-nowrap ${
                                  selectedVariantId === r.id
                                    ? "bg-[#2FCB6E] text-[#020605]"
                                    : "text-[#86868B] hover:text-[#F5F5F7]"
                                }`}
                              >
                                {r.variant}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Amount Input */}
                        <div className="space-y-1">
                          <label className="text-[11px] uppercase font-mono tracking-wider text-[#6E6E73] block">
                            Amount ({currencySymbol})
                          </label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868B] font-mono text-sm font-bold">
                              {currencySymbol}
                            </span>
                            <input
                              type="number"
                              inputMode="decimal"
                              value={amount || ""}
                              onFocus={notifyUserInteraction}
                              onChange={(e) => {
                                notifyUserInteraction();
                                setAmount(Math.max(1, parseInt(e.target.value) || 0));
                              }}
                              className="w-full bg-black/50 border border-[rgba(255,255,255,0.08)] rounded-xl pl-8 pr-3 py-1.5 text-sm font-mono font-medium text-[#F5F5F7] focus:outline-none focus:border-[#2FCB6E] transition-colors"
                            />
                          </div>
                        </div>

                        {/* Payout Display */}
                        <div className="p-3 rounded-2xl bg-black/40 border border-white/5 text-center">
                          <span className="text-[11px] uppercase font-mono tracking-wider text-[#6E6E73] block mb-0.5">
                            You get
                          </span>
                          <div className="text-2xl font-heading font-extrabold text-[var(--yellow-400)] tracking-tight tabular-nums">
                            {hasRate ? (
                              <>
                                ₦<OdometerNumber value={payout} />
                              </>
                            ) : (
                              <span className="text-sm text-[#86868B] font-sans">
                                Rate on request ({`{owner to supply}`})
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Rate Line */}
                        <div className="text-center text-[11px] text-[#86868B] tracking-tight">
                          <span>
                            {item.isCrypto ? (
                              (item.ngnPerUsd ?? 0) > 0 ? (
                                `₦${item.ngnPerUsd} per $1 · live feed`
                              ) : (
                                "Rate on request"
                              )
                            ) : selectedRate ? (
                              `₦${selectedRate.rateNgn} per ${currencySymbol}1 · set at ${formatTimeLagos(selectedRate.updatedAt)}`
                            ) : (
                              "Rate on request"
                            )}
                          </span>
                        </div>

                        {/* Action CTA Button */}
                        <div className="pt-2 sm:pt-3">
                          <Button
                            variant="solid-green"
                            size="sm"
                            href={whatsappUrl}
                            isExternal
                            className="w-full text-[14px] sm:text-[15px] font-medium py-3 flex items-center justify-center gap-2 rounded-full shadow-[0_4px_16px_rgba(47,203,110,0.25)] text-[#020605] hover:bg-[#34db77] transition-all active:scale-[0.98]"
                          >
                            <span className="font-heading font-medium tracking-tight">Trade Now</span>
                            <ArrowUpRight className="w-4 h-4 stroke-[2.4] text-[#020605]" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  /* SIDE CARDS: PREVIEW ONLY */
                  <div className="text-center py-6 space-y-2 opacity-60">
                    <span className="text-xs text-[#86868B] block tabular-nums">
                      {item.isCrypto
                        ? (item.ngnPerUsd ?? 0) > 0
                          ? `₦${item.ngnPerUsd}/$1`
                          : "Rate on request"
                        : item.rates?.[0]
                        ? `₦${item.rates[0].rateNgn}/$1`
                        : "Rate on request"}
                    </span>
                    <span className="text-[11px] text-[#2FCB6E] font-medium uppercase tracking-wider block">
                      Click to Select
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Indicator Under Carousel (Requirement 5) */}
      {!reducedMotion && (
        <div className="w-36 h-[2px] bg-white/10 rounded-full overflow-hidden mx-auto mt-4">
          <div
            className="h-full bg-[#2FCB6E] transition-all duration-75 ease-linear rounded-full"
            style={{ width: `${intervalProgress * 100}%` }}
          />
        </div>
      )}
    </div>
  );
};
