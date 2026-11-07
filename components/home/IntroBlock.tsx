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

  // 1. Back-and-forth typing animation for "welcome to dPanda.ng"
  const fullText = "welcome to dPanda.ng";
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

  // 3. Text reveal trigger on mount
  const [isTextRevealed, setIsTextRevealed] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsTextRevealed(true), 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative z-10 text-center max-w-3xl mx-auto px-4 pt-12 sm:pt-24 pb-4 flex flex-col items-center">
      {/* 3D Panda Seated with Phone (Hero accent with luxury green glow & seamless gradient mask) */}
      <div
        className="block absolute -right-2 sm:-right-6 md:-right-16 lg:-right-32 xl:-right-44 top-1 sm:top-2 md:top-6 lg:top-2 w-[115px] sm:w-[180px] md:w-[280px] lg:w-[340px] xl:w-[380px] h-[145px] sm:h-[220px] md:h-[350px] lg:h-[420px] xl:h-[460px] pointer-events-none select-none z-0"
        style={{
          animation: "heroPandaLevitate 8s ease-in-out infinite alternate",
        }}
      >
        {/* Soft green ambient backlight glow behind panda */}
        <div
          className="absolute inset-0 m-auto w-[80%] h-[80%] rounded-full pointer-events-none opacity-75"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(47, 203, 110, 0.25) 0%, rgba(20, 80, 50, 0.08) 55%, transparent 75%)",
            filter: "blur(40px)",
          }}
        />

        {/* Faded gradient overlay mask so the panda seamlessly dissolves into the dark background */}
        <div
          className="relative w-full h-full"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 70%, rgba(0,0,0,0.3) 88%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 70%, rgba(0,0,0,0.3) 88%, transparent 100%)",
          }}
        >
          <Image
            src="/assets/3d/panda-seated-phone.webp"
            alt="dPanda mascot seated with smartphone"
            fill
            priority
            className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
            sizes="(max-width: 640px) 115px, (max-width: 768px) 180px, (max-width: 1024px) 280px, (max-width: 1280px) 340px, 380px"
          />
        </div>
      </div>

      {/* Clean Typing Text without rounded rectangle container or glowing dot */}
      <div className="mb-2 sm:mb-4 flex items-center justify-center min-h-[24px] select-none relative z-10">
        <span className="font-mono text-[13px] sm:text-[14px] font-semibold tracking-[0.08em] text-[#2FCB6E]">
          {typedText}
        </span>
        <span className="inline-block w-1.5 h-3.5 bg-[#2FCB6E] ml-1.5 rounded-sm opacity-90" />
      </div>

      {/* Main Heading H1 with text reveal effect */}
      <h1
        className={`font-heading font-semibold text-[#F5F5F7] tracking-[-0.035em] leading-[1.0] sm:leading-[1.04] max-w-2xl text-center relative z-10 ${
          isTextRevealed ? "text-revealed" : ""
        }`}
        style={{ fontSize: "clamp(2.5rem, 8vw, 4.8rem)" }}
      >
        <span className="text-reveal-mask">
          <span className="text-reveal-item">Trade</span>
        </span>
        <span className="text-reveal-mask">
          <span className="text-reveal-item text-[#2FCB6E]">
            without{" "}
            <span
              className={`inline-block text-[#7CF0A8] transition-all duration-300 transform ${
                fadeState === "in"
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2"
              }`}
            >
              {ROTATING_WORDS[wordIndex]}
            </span>
          </span>
        </span>
      </h1>

      {/* Body: 15-17px, line-height 1.4-1.47, colour #86868B with smooth reveal */}
      <p
        className={`mt-3 sm:mt-5 text-[15px] sm:text-[17px] leading-[1.4] sm:leading-[1.47] text-[#86868B] max-w-[460px] mx-auto text-center font-normal relative z-10 transition-all duration-700 delay-150 ${
          isTextRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        See today&apos;s naira rate for your gift card or crypto. Pick an asset, enter your amount, and receive fast payment to your bank account.
      </p>

      {/* Action Buttons: "Trade Now" and "Today's rate" */}
      <div className="flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 mt-5 sm:mt-8 relative z-10 w-full max-w-sm sm:max-w-md mx-auto px-2">
        <Button
          variant="solid-green"
          size="md"
          href={whatsappUrl}
          isExternal
          className="h-11 sm:h-12 px-6 sm:px-8 rounded-full font-medium shadow-[0_4px_16px_rgba(47,203,110,0.25)] flex items-center justify-center gap-2 whitespace-nowrap text-[15px] sm:text-[16px] text-[#020605] hover:bg-[#34db77] transition-all active:scale-[0.98] flex-1 sm:flex-initial"
        >
          <span>Trade Now</span>
          <ArrowUpRight className="w-4 h-4 stroke-[2.4] text-[#020605]" />
        </Button>

        <Button
          variant="glass"
          size="md"
          href="/gift-cards"
          className="h-11 sm:h-12 px-6 sm:px-8 rounded-full font-medium border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)] flex items-center justify-center gap-2 whitespace-nowrap text-[15px] sm:text-[16px] text-[#F5F5F7] transition-all active:scale-[0.98] flex-1 sm:flex-initial"
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
