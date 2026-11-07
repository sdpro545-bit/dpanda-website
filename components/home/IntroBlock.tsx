"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/config/brand";

const ROTATING_WORDS = ["Limits", "Delays", "Hassle", "Hidden Fees", "Stress"];

export const IntroBlock: React.FC = () => {
  const whatsappUrl = `https://wa.me/${BRAND.whatsappNumberIntl}?text=${encodeURIComponent(
    "Hello dPanda, I want to trade."
  )}`;

  // 1. Back-and-forth typing animation for "Welcome to dPanda.ng"
  const fullText = "Welcome to dPanda.ng";
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting && typedText === fullText) {
      // Pause at full text
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && typedText === "") {
      // Pause before typing again
      timeout = setTimeout(() => setIsDeleting(false), 500);
    } else {
      const speed = isDeleting ? 40 : 80;
      timeout = setTimeout(() => {
        setTypedText((prev) =>
          isDeleting
            ? fullText.substring(0, prev.length - 1)
            : fullText.substring(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting]);

  // 2. Auto-switching words effect for "Limits", "Delays", "Hassle", etc.
  const [wordIndex, setWordIndex] = useState(0);
  const [fadeState, setFadeState] = useState<"in" | "out">("in");

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setFadeState("out");
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        setFadeState("in");
      }, 250);
    }, 2800);

    return () => clearInterval(wordInterval);
  }, []);

  return (
    <div className="relative z-10 text-center max-w-3xl mx-auto px-4 pt-16 sm:pt-24 pb-4 flex flex-col items-center">
      {/* 3D Panda Seated with Phone (Far Right Desktop Gutter - Never Touches Text) */}
      <div
        className="hidden xl:block absolute -right-44 2xl:-right-60 top-4 2xl:top-0 w-[340px] 2xl:w-[400px] h-[420px] 2xl:h-[480px] pointer-events-none select-none z-0"
        style={{
          animation: "heroPandaLevitate 8s ease-in-out infinite alternate",
        }}
      >
        {/* Soft green ambient backlight glow behind panda */}
        <div
          className="absolute inset-0 m-auto w-[75%] h-[75%] rounded-full pointer-events-none opacity-80"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(47, 203, 110, 0.22) 0%, rgba(20, 80, 50, 0.08) 50%, transparent 75%)",
            filter: "blur(42px)",
          }}
        />

        {/* Faded gradient overlay mask so the panda seamlessly dissolves into the dark background */}
        <div
          className="relative w-full h-full"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 65%, rgba(0,0,0,0.4) 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 65%, rgba(0,0,0,0.4) 85%, transparent 100%)",
          }}
        >
          <Image
            src="/assets/3d/panda-seated-phone.webp"
            alt="dPanda mascot seated with smartphone"
            fill
            priority
            className="object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.85)]"
            sizes="(max-width: 1024px) 320px, (max-width: 1280px) 390px, 440px"
          />
        </div>
      </div>

      {/* Clean Typing Text without rounded rectangle container */}
      <div className="mb-6 flex items-center justify-center min-h-[30px] select-none relative z-10">
        <span className="font-mono text-[13px] sm:text-[14px] font-semibold tracking-[0.12em] uppercase text-[#2FCB6E]">
          {typedText}
        </span>
        <span className="inline-block w-1.5 h-3.5 bg-[#2FCB6E] ml-1.5 rounded-sm animate-pulse" />
      </div>

      {/* Main Heading H1 with light-green "without limits" and switching word */}
      <h1
        className="font-heading font-semibold text-[#F5F5F7] tracking-[-0.03em] leading-[1.05] max-w-2xl text-center relative z-10"
        style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
      >
        Trade
        <br />
        <span className="text-[#2FCB6E]">without </span>
        <span
          className={`inline-block text-[#7CF0A8] transition-all duration-300 transform ${
            fadeState === "in"
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2"
          }`}
        >
          {ROTATING_WORDS[wordIndex]}
        </span>
      </h1>

      {/* Body: 17px, line-height 1.47, colour #86868B */}
      <p className="mt-5 text-[17px] leading-[1.47] text-[#86868B] max-w-[460px] mx-auto text-center font-normal relative z-10">
        See today&apos;s naira rate for your gift card or crypto. Pick an asset, enter your amount, and receive fast payment to your bank account.
      </p>

      {/* Action Buttons: "Trade Now" and "Today's rate" */}
      <div className="flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-3.5 mt-8 relative z-10 w-full px-2">
        <Button
          variant="solid-green"
          size="md"
          href={whatsappUrl}
          isExternal
          className="h-11 sm:h-12 px-5 sm:px-7 rounded-full font-medium shadow-[0_4px_16px_rgba(47,203,110,0.25)] inline-flex flex-row items-center justify-center gap-2 whitespace-nowrap text-[15px] sm:text-[17px]"
        >
          <span>Trade Now</span>
          <ArrowUpRight className="w-4 h-4 stroke-[2.4] text-[#020605]" />
        </Button>

        <Button
          variant="glass"
          size="md"
          href="/gift-cards"
          className="h-11 sm:h-12 px-5 sm:px-7 rounded-full font-medium border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)] inline-flex flex-row items-center justify-center gap-2 whitespace-nowrap text-[15px] sm:text-[17px]"
        >
          <span>Today&apos;s rate</span>
          <TrendingUp className="w-4 h-4 stroke-[2.2] text-[#2FCB6E]" />
        </Button>
      </div>

      <style jsx>{`
        @keyframes heroPandaLevitate {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-12px) rotate(1.5deg);
          }
          100% {
            transform: translateY(-4px) rotate(-1deg);
          }
        }
      `}</style>
    </div>
  );
};
