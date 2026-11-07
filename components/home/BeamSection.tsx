"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import useSWR from "swr";
import { Clock } from "lucide-react";
import { BeamBackdrop } from "@/components/ui/BeamBackdrop";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { GiftCardRate, PublicSettings } from "@/lib/data/types";
import { BRAND } from "@/config/brand";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function formatTimeLagos() {
  try {
    return new Intl.DateTimeFormat("en-NG", {
      timeZone: "Africa/Lagos",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());
  } catch {
    return "12:00";
  }
}

// Official authentic WhatsApp vector icon
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.477-.15-.678.15-.2.3-.778.979-.954 1.18-.175.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.799-1.5-1.787-1.676-2.088-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.502.101-.2.05-.376-.025-.527-.075-.15-.678-1.632-.929-2.235-.245-.588-.495-.508-.678-.517-.175-.01-.376-.01-.577-.01-.201 0-.527.075-.803.376s-1.054 1.029-1.054 2.51c0 1.48 1.079 2.909 1.229 3.11.15.2 2.124 3.244 5.146 4.549.719.311 1.281.497 1.719.636.722.23 1.378.197 1.898.12.579-.087 1.78-.727 2.031-1.43.251-.703.251-1.305.176-1.43-.075-.126-.276-.201-.577-.351zM12.042 21.75c-1.758 0-3.483-.472-5.002-1.365l-.359-.213-3.722.976.993-3.627-.234-.372c-.98-1.56-1.498-3.364-1.498-5.212 0-5.385 4.381-9.766 9.767-9.766 2.61 0 5.064 1.017 6.91 2.863s2.863 4.3 2.863 6.91c0 5.386-4.381 9.766-9.768 9.766z" />
  </svg>
);

export const BeamSection: React.FC = () => {
  // Live rate data for the featured card
  const { data: cardsData } = useSWR<{ rates: GiftCardRate[] }>(
    "/api/rates/giftcards",
    fetcher,
    { refreshInterval: 15000 }
  );

  const { data: settingsData } = useSWR<PublicSettings>(
    "/api/settings/public",
    fetcher
  );

  const featuredRate = cardsData?.rates?.[0] || {
    cardName: "Amazon",
    variant: "US e-code",
    rateNgn: 1420,
    updatedAt: new Date().toISOString(),
  };

  // 30s countdown loop for live price refresh
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? 30 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const progressFraction = (30 - countdown) / 30;
  const whatsappUrl = `https://wa.me/${
    settingsData?.whatsappNumberIntl || BRAND.whatsappNumberIntl
  }?text=${encodeURIComponent("Hello dPanda, I want to trade with today's rates.")}`;

  return (
    <section className="relative w-full min-h-[540px] sm:min-h-[600px] overflow-visible pt-4 pb-0 flex flex-col items-center justify-center">
      {/* Background Light Beams and Particles */}
      <BeamBackdrop />

      {/* Animated Horizon Line Shade Glow (Sharp core, soft ambient blur, smooth animated shimmer) */}
      <div className="absolute top-[48%] -translate-y-1/2 inset-x-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden">
        {/* 1. Ultra-wide Ethereal Soft Diffuser */}
        <div
          className="w-full max-w-[1300px] h-[180px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(47, 203, 110, 0.24) 0%, rgba(20, 80, 50, 0.12) 45%, transparent 75%)",
            filter: "blur(36px)",
            animation: "lineGlowBreathe 5s ease-in-out infinite alternate",
          }}
        />
        {/* 2. Vibrant Mid Glow Beam */}
        <div
          className="absolute w-[92%] max-w-[960px] h-[40px] pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(47, 203, 110, 0.45) 20%, rgba(124, 240, 168, 0.75) 50%, rgba(47, 203, 110, 0.45) 80%, transparent 100%)",
            filter: "blur(14px)",
            animation: "lineGlowPulse 4s ease-in-out infinite alternate",
          }}
        />
        {/* 3. Razor-Sharp Luminous Horizon Core Line */}
        <div
          className="absolute w-[82%] max-w-[820px] h-[2px] pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(124, 240, 168, 0.4) 15%, #7CF0A8 50%, rgba(124, 240, 168, 0.4) 85%, transparent 100%)",
            boxShadow:
              "0 0 16px rgba(124, 240, 168, 0.9), 0 0 32px rgba(47, 203, 110, 0.6)",
            animation: "lineShimmer 3.5s ease-in-out infinite alternate",
          }}
        />
      </div>

      {/* Floating 3D Glassmorphic Stage Area */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 h-[400px] sm:h-[460px] flex items-center justify-center">
        {/* Left Floating Object (Desktop Only): High-Precision Live Rate Clock Widget */}
        <div className="hidden lg:flex absolute left-2 xl:left-6 bottom-16 xl:bottom-20 z-20 transition-transform duration-500 hover:scale-105">
          <div className="p-4 sm:p-5 rounded-[24px] bg-[rgba(10,25,18,0.50)] border border-white/15 backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.7),0_0_24px_rgba(47,203,110,0.1)] flex items-center gap-3.5 select-none">
            <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-gradient-to-b from-[#142E22] to-[#08140E] border border-[#7CF0A8]/40 flex items-center justify-center shrink-0 shadow-inner">
              <Clock className="w-6 h-6 text-[#7CF0A8] stroke-[2]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#7CF0A8] font-semibold">
                LIVE RATE TIME
              </span>
              <span className="text-base sm:text-lg font-heading font-semibold text-[#F5F5F7] tracking-tight tabular-nums mt-0.5">
                {formatTimeLagos()}{" "}
                <span className="text-xs text-[#86868B] font-mono font-normal">WAT</span>
              </span>
              <span className="text-[11px] text-[#86868B] font-sans font-medium">
                Lagos Trade Desk
              </span>
            </div>
          </div>
        </div>

      {/* Right Floating Object (Desktop Only): Luxury Glassmorphic WhatsApp Trade Desk Widget */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden lg:flex absolute right-2 xl:right-6 bottom-16 xl:bottom-20 z-20 transition-all duration-300 hover:scale-105 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7CF0A8] rounded-[24px]"
      >
        <div className="p-4 sm:p-5 rounded-[24px] bg-[rgba(10,25,18,0.50)] border border-white/15 backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.7),0_0_24px_rgba(47,203,110,0.1)] group-hover:border-[#2FCB6E]/50 flex items-center gap-3.5 select-none">
          <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-gradient-to-b from-[#184628] to-[#0A2414] border border-[#2FCB6E]/50 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
            <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 text-[#25D366]" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#2FCB6E] font-semibold">
              TRADE NOW
            </span>
              <span className="text-base sm:text-lg font-heading font-semibold text-[#F5F5F7] tracking-tight group-hover:text-[#7CF0A8] transition-colors mt-0.5">
                Instant Settlement
              </span>
              <span className="text-[11px] text-[#86868B] font-sans font-medium">
                Tap to confirm rate & trade
              </span>
            </div>
          </div>
        </a>

        {/* Upper Right Floating Object: Circular Glass Disc with Progress Ring */}
        <div className="absolute right-6 sm:right-24 top-2 sm:top-6 z-20 transition-transform duration-700 hover:scale-105">
          <div className="p-3.5 rounded-full bg-[rgba(10,25,18,0.50)] border border-white/15 backdrop-blur-xl shadow-2xl flex items-center justify-center">
            <ProgressRing
              progress={progressFraction}
              size={92}
              strokeWidth={5}
              label={`${countdown}s to next price`}
            />
          </div>
        </div>

        {/* Center: 3D Tilted Premium Glassmorphism Rate Card */}
        <div className="relative z-30">
          <Tilt3D rotateX={48} rotateY={0} rotateZ={-8} perspective={1400}>
            <div className="relative w-[calc(100vw-36px)] max-w-[340px] sm:max-w-[460px]">
              {/* Profile Tile Overlapping Top-Left Edge (Positioned outside overflow-hidden so the panda face is never clipped) */}
              <div className="absolute -top-7 -left-4 w-16 h-16 sm:w-18 sm:h-18 rounded-[22px] bg-gradient-to-b from-[#142E22] to-[#07130D] border border-[#7CF0A8]/50 shadow-[0_12px_28px_rgba(0,0,0,0.7),0_0_16px_rgba(124,240,168,0.2)] overflow-hidden flex items-center justify-center z-20">
                <Image
                  src="/assets/3d/panda-bust.webp"
                  alt="dPanda"
                  width={60}
                  height={60}
                  className="object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
                />
              </div>

              {/* Card Body */}
              <div className="relative w-full rounded-[32px] bg-[rgba(12,28,20,0.50)] border border-white/20 p-6 sm:p-8 backdrop-blur-[36px] backdrop-saturate-[180%] shadow-[0_32px_80px_rgba(0,0,0,0.85),0_0_40px_rgba(47,203,110,0.14)] text-[#F5F5F7] select-none overflow-hidden">
                {/* Inner Glass Specular Reflection Highlight */}
                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-white/15 via-white/[0.02] to-transparent pointer-events-none" />
                <div className="absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#7CF0A8]/70 to-transparent pointer-events-none" />

              {/* Card Header Content */}
              <div className="ml-14 mb-4">
                <span className="text-[11px] font-mono uppercase text-[#7CF0A8] font-semibold tracking-[0.14em] block">
                  TODAY&apos;S RATE
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl sm:text-5xl font-heading font-semibold text-[#FFFFFF] tracking-tight tabular-nums drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                    ₦{featuredRate.rateNgn.toLocaleString()}
                  </span>
                  <span className="text-xs sm:text-sm text-[#86868B] font-medium font-sans">
                    per $1
                  </span>
                </div>
              </div>

              {/* Countdown Progress Bar with Mint Glow */}
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden my-4 p-[1px]">
                <div
                  style={{ width: `${progressFraction * 100}%` }}
                  className="h-full bg-gradient-to-r from-[#2FCB6E] to-[#7CF0A8] transition-all duration-300 rounded-full shadow-[0_0_12px_rgba(47,203,110,0.6)]"
                />
              </div>

              {/* Metadata Chips: Glassmorphic Chips */}
              <div className="flex items-center justify-between text-xs font-mono pt-2">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[#F5F5F7] shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  <span>Set {formatTimeLagos()}</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(47,203,110,0.12)] border border-[rgba(47,203,110,0.3)] text-[#7CF0A8] font-semibold shadow-[0_0_12px_rgba(47,203,110,0.15)]">
                  <span>Paid in ₦</span>
                </div>
              </div>
            </div>
            </div>
          </Tilt3D>
        </div>
      </div>

      {/* Mobile/Tablet Responsive Widgets Bar (< lg) pushed close above */}
      <div className="flex lg:hidden flex-wrap items-center justify-center gap-3.5 -mt-3 sm:-mt-1 px-4 w-full max-w-lg mx-auto relative z-30">
        {/* Clock Widget */}
        <div className="flex-1 min-w-[200px] p-3.5 sm:p-4 rounded-[22px] bg-[rgba(10,25,18,0.55)] border border-white/15 backdrop-blur-2xl shadow-lg flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#142E22] to-[#08140E] border border-[#7CF0A8]/40 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-[#7CF0A8]" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-[#7CF0A8] font-semibold">
              LIVE RATE TIME
            </span>
            <span className="text-sm font-heading font-semibold text-[#F5F5F7] tracking-tight">
              {formatTimeLagos()} WAT
            </span>
          </div>
        </div>

        {/* WhatsApp Widget */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-[200px] p-3.5 sm:p-4 rounded-[22px] bg-[rgba(10,25,18,0.55)] border border-white/15 backdrop-blur-2xl shadow-lg flex items-center gap-3 active:scale-98 transition-transform"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#184628] to-[#0A2414] border border-[#2FCB6E]/50 flex items-center justify-center shrink-0">
            <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-[#2FCB6E] font-semibold">
              TRADE NOW
            </span>
            <span className="text-sm font-heading font-semibold text-[#F5F5F7] tracking-tight">
              Instant Settlement
            </span>
          </div>
        </a>
      </div>

      {/* Seamless Ambient Green Floor Wash Merging into Footer (Completely Eliminates Black Gap) */}
      <div
        className="absolute inset-x-0 -bottom-24 h-[450px] pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(20, 80, 50, 0.22) 30%, rgba(47, 203, 110, 0.28) 60%, rgba(2, 6, 5, 0.98) 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 -bottom-16 h-[320px] pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 50%, rgba(47, 203, 110, 0.25) 0%, rgba(20, 80, 50, 0.12) 50%, transparent 80%)",
        }}
      />

      <style jsx>{`
        @keyframes lineGlowBreathe {
          0% {
            opacity: 0.6;
            transform: scaleY(0.9);
          }
          100% {
            opacity: 1;
            transform: scaleY(1.15);
          }
        }
        @keyframes lineGlowPulse {
          0% {
            opacity: 0.7;
            transform: scaleX(0.96);
          }
          100% {
            opacity: 1;
            transform: scaleX(1.04);
          }
        }
        @keyframes lineShimmer {
          0% {
            opacity: 0.75;
            filter: brightness(0.95);
          }
          100% {
            opacity: 1;
            filter: brightness(1.2);
          }
        }
      `}</style>
    </section>
  );
};
