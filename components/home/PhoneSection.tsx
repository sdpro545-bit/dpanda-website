"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE_COPY } from "@/content/site";
import { BRAND } from "@/config/brand";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { GlassCard } from "@/components/ui/GlassCard";
import { MessageCircle, CheckCheck, Send } from "lucide-react";

export const PhoneSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Headline blur reveal
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { y: 50, opacity: 0, filter: "blur(12px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2. Phone rotation from -14deg to 0deg (Reference Video Beat 5 & 6)
      if (phoneRef.current) {
        gsap.fromTo(
          phoneRef.current,
          { rotate: -14, y: 80, opacity: 0.7 },
          {
            rotate: 0,
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "center center",
              scrub: 1,
            },
          }
        );
      }

      // 3. Floating glass info card rise
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 50%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const whatsappUrl = `https://wa.me/${BRAND.whatsappNumberIntl}?text=${encodeURIComponent(
    `Hello dPanda, I want to trade.\n\nCard: Amazon (US e-code)\nAmount: $100\nRate: ₦1,330 per $1\nEstimated payout: ₦133,000`
  )}`;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-green-950 text-white py-28 px-6 overflow-hidden flex flex-col justify-center"
    >
      {/* Background Soft Glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-green-500/15 blur-[120px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headline, Body Copy, WhatsApp Button */}
        <div className="lg:col-span-5 space-y-6">
          <Tag variant="yellow">FAST WA ROUTING</Tag>
          <h2
            ref={headlineRef}
            className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight leading-[1.1] will-change-[transform,opacity,filter]"
          >
            {SITE_COPY.phoneSection.heading}
          </h2>
          <p className="text-base text-white/80 font-body leading-relaxed max-w-md">
            {SITE_COPY.phoneSection.body}
          </p>

          <div className="pt-2">
            <Button
              href={whatsappUrl}
              isExternal
              variant="white-pill-arrow"
              size="lg"
            >
              {SITE_COPY.phoneSection.button}
            </Button>
          </div>
        </div>

        {/* Center: 3D Phone Mockup rotating from -14deg to upright */}
        <div className="lg:col-span-4 flex justify-center relative">
          <div
            ref={phoneRef}
            className="relative w-[280px] sm:w-[310px] h-[580px] rounded-[44px] bg-[#0c1310] border-[6px] border-[#22352b] p-3 shadow-[0_30px_70px_rgba(0,0,0,0.8)] will-change-transform flex flex-col justify-between overflow-hidden"
          >
            {/* Dynamic Island / Speaker */}
            <div className="w-24 h-4 rounded-full bg-black mx-auto mb-3 shrink-0" />

            {/* Simulated WhatsApp Screen Preview (7.4 template) */}
            <div className="flex-1 rounded-[28px] bg-[#0a1812] border border-glass-bd/30 flex flex-col justify-between overflow-hidden p-3 font-body">
              {/* WhatsApp Chat Header */}
              <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                <div className="w-7 h-7 rounded-full bg-green-700 flex items-center justify-center text-xs font-bold font-heading">
                  dP
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-heading font-bold text-white truncate">
                    dPanda Exchange
                  </div>
                  <div className="text-[10px] text-mint-200">Online</div>
                </div>
              </div>

              {/* Chat Message Bubble */}
              <div className="my-auto space-y-2">
                <div className="bg-[#0f3423] p-3 rounded-2xl rounded-tr-none border border-green-600/30 text-[11px] leading-relaxed text-white space-y-1 shadow-md">
                  <p className="font-semibold text-mint-200">
                    Hello dPanda, I want to trade.
                  </p>
                  <div className="text-white/80 space-y-0.5 pt-1 border-t border-white/10 font-mono text-[10px]">
                    <p>Card: Amazon (US e-code)</p>
                    <p>Amount: $100</p>
                    <p>Rate: ₦1,330 per $1</p>
                    <p className="text-yellow-400 font-bold text-[11px]">
                      Estimated payout: ₦133,000
                    </p>
                  </div>
                  <div className="flex justify-end items-center gap-1 text-[9px] text-white/50 pt-0.5">
                    <span>Just now</span>
                    <CheckCheck className="w-3 h-3 text-mint-200" />
                  </div>
                </div>
              </div>

              {/* Chat Input Bar */}
              <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                <div className="flex-1 bg-white/5 rounded-pill px-3 py-1.5 text-[10px] text-white/40">
                  Message dPanda...
                </div>
                <div className="w-7 h-7 rounded-full bg-green-500 text-ink-900 flex items-center justify-center shrink-0">
                  <Send className="w-3.5 h-3.5 ml-0.5" />
                </div>
              </div>
            </div>

            {/* Home indicator bar */}
            <div className="w-28 h-1 rounded-full bg-white/30 mx-auto mt-2 shrink-0" />
          </div>
        </div>

        {/* Right Column: Floating Glass Info Card (Reference Video Beat 6) */}
        <div className="lg:col-span-3 flex justify-center lg:justify-start">
          <div ref={cardRef} className="w-full max-w-xs">
            <GlassCard variant="raised" className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Tag variant="yellow">
                  {SITE_COPY.phoneSection.sampleRateTag}
                </Tag>
                <span className="text-[10px] font-mono text-mint-200">LIVE</span>
              </div>
              <div className="space-y-1">
                <h4 className="font-heading font-bold text-base text-white">
                  {SITE_COPY.phoneSection.sampleRateTitle}
                </h4>
                <div className="text-2xl md:text-3xl font-heading font-extrabold text-yellow-400 tabular-nums">
                  ₦142,000
                </div>
              </div>
              <p className="text-xs text-white/70 font-body leading-relaxed border-t border-glass-bd/40 pt-3">
                Rate confirmed instantly via WhatsApp desk. Direct payout to your bank.
              </p>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};
