"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE_COPY } from "@/content/site";
import { Tag } from "@/components/ui/Tag";
import { RotatingBadge } from "@/components/ui/RotatingBadge";
import { GhostWord } from "@/components/ui/GhostWord";
import { ArrowUpRight } from "lucide-react";

export const PanelsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelsContainerRef = useRef<HTMLDivElement>(null);
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.innerWidth < 1024;

    if (prefersReducedMotion || isMobile) return;

    if (
      !sectionRef.current ||
      !panelsContainerRef.current ||
      !panel1Ref.current ||
      !panel2Ref.current
    )
      return;

    // Horizontal sliding panels animation matching video beat 4
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1200",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.fromTo(
        panel1Ref.current,
        { x: -180, opacity: 0.2 },
        { x: 0, opacity: 1, ease: "none" }
      );

      tl.fromTo(
        panel2Ref.current,
        { x: 200, opacity: 0.1 },
        { x: 0, opacity: 1, ease: "none" },
        "<"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-mint-50 text-ink-900 py-24 px-6 overflow-hidden flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Two Tall Rounded Panels (Reference Video Beat 4) */}
        <div
          ref={panelsContainerRef}
          className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 relative"
        >
          {/* Panel 1: Panda Mascot Panel */}
          <div
            ref={panel1Ref}
            className="relative h-[460px] md:h-[540px] rounded-panel bg-green-900 overflow-hidden border border-green-800 shadow-[0_20px_50px_rgba(4,40,26,0.3)] flex flex-col justify-end p-6 will-change-transform"
          >
            {/* Soft inner glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-green-500/20 blur-3xl pointer-events-none" />

            {/* Mascot cropped at edge */}
            <div className="absolute inset-0 top-12 flex items-center justify-center">
              <div className="relative w-full h-full max-h-[460px]">
                <Image
                  src="/assets/3d/panda-standing.webp"
                  alt="dPanda Ambassador"
                  fill
                  className="object-contain object-bottom scale-110 drop-shadow-[0_16px_32px_rgba(0,0,0,0.6)]"
                />
              </div>
            </div>

            <div className="relative z-10 space-y-1">
              <Tag variant="yellow">FAST PAYOUT</Tag>
              <h3 className="text-xl font-heading font-extrabold text-white">
                Guaranteed Naira Rates
              </h3>
            </div>
          </div>

          {/* Panel 2: Crypto & Gift Card Assets with Cropped Giant Ghost "LIMITS" */}
          <div
            ref={panel2Ref}
            className="relative h-[460px] md:h-[540px] rounded-panel bg-green-950 overflow-hidden border border-green-800/80 shadow-[0_20px_50px_rgba(4,40,26,0.3)] flex flex-col justify-between p-6 will-change-transform"
          >
            {/* Giant Cropped Ghost Wordmark LIMITS (Reference Video Section 4) */}
            <div className="absolute top-16 -left-6 pointer-events-none select-none opacity-[0.08] z-0">
              <GhostWord text="LIMITS" className="text-[9rem]" />
            </div>

            <div className="relative z-10 flex justify-between items-start">
              <Tag variant="outline">MULTI-ASSET</Tag>
              <span className="text-xs font-heading font-bold text-mint-200">
                01 // 03
              </span>
            </div>

            {/* Floating 3D Coin & Card Renders inside panel */}
            <div className="relative z-10 my-auto flex flex-col items-center gap-4">
              <div className="relative w-32 h-20 -rotate-12 transition-transform duration-300 hover:rotate-0">
                <Image
                  src="/assets/3d/card-amazon.webp"
                  alt="Amazon Card"
                  fill
                  className="object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
                />
              </div>
              <div className="relative w-24 h-24 rotate-6">
                <Image
                  src="/assets/3d/coin-btc.webp"
                  alt="Bitcoin"
                  fill
                  className="object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
                />
              </div>
            </div>

            <div className="relative z-10 space-y-1">
              <h3 className="text-xl font-heading font-extrabold text-white">
                All Major Cards & Coins
              </h3>
              <p className="text-xs text-white/70">
                Trade on your terms with direct transfer to Nigerian banks.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Headline, Services Copy & Rotating Badge */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Tag variant="solid">TRADE SERVICES</Tag>
              <RotatingBadge />
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-ink-900 tracking-tight leading-[1.08]">
              {SITE_COPY.services.heading}
            </h2>
            <p className="text-base text-ink-900/80 leading-relaxed font-body">
              Instant rates with no guesswork. Select your card or coin, verify the naira total, and trade in one tap on WhatsApp.
            </p>
          </div>

          {/* 3 Services Cards (from Flyer 1) */}
          <div className="space-y-4">
            {SITE_COPY.services.cards.map((service, index) => (
              <Link
                key={service.id}
                href={service.href}
                className="group block p-6 rounded-card bg-white border border-mint-200/80 hover:border-green-500/60 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-green-700">
                      Service 0{index + 1}
                    </span>
                    <h3 className="text-xl font-heading font-bold text-ink-900 group-hover:text-green-700 transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-mint-50 border border-mint-200 flex items-center justify-center text-ink-900 group-hover:bg-green-700 group-hover:text-white transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xs text-ink-900/70 mt-2 font-body leading-relaxed">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
