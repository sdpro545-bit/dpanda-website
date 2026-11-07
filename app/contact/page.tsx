import React from "react";
import Image from "next/image";
import { BRAND } from "@/config/brand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MessageCircle, Instagram, Clock, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Contact dPanda.ng — Trade Desk & Channels",
  description: "Official WhatsApp trade desk, social channels, and contact information for dPanda.ng.",
};

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${BRAND.whatsappNumberIntl}?text=${encodeURIComponent(
    "Hello dPanda, I want to trade."
  )}`;

  return (
    <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 space-y-20">
      {/* 3D Panda Side Background Blend */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] pointer-events-none select-none -z-10 overflow-hidden">
        <div
          className="relative w-full h-full opacity-[0.11] transform -translate-y-2"
          style={{
            maskImage: "radial-gradient(circle at 50% 45%, black 40%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(circle at 50% 45%, black 40%, transparent 75%)",
          }}
        >
          <Image
            src="/assets/3d/panda-side.webp"
            alt="dPanda Side Profile"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Header */}
      <ScrollReveal className="text-center space-y-4">
        <Eyebrow>Official Channels</Eyebrow>
        <h1 className="text-4xl md:text-5xl font-heading font-semibold text-[#F5F5F7] tracking-tight">
          Contact dPanda.ng
        </h1>
        <p className="text-[#86868B] font-body text-[17px] leading-[1.47] max-w-xl mx-auto">
          Reach our live trade desk on WhatsApp or connect through our verified social profiles.
        </p>
      </ScrollReveal>

      {/* Primary Contact Cards Grid */}
      <ScrollReveal className="grid grid-cols-1 md:grid-cols-2 gap-6" delay={100}>
        {/* Card 1: WhatsApp Trade Desk */}
        <GlassCard className="p-8 rounded-[28px] space-y-6 flex flex-col justify-between border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] hover:border-[rgba(255,255,255,0.14)] transition-colors">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-[rgba(47,203,110,0.12)] border border-[rgba(47,203,110,0.25)] text-[#2FCB6E] flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-heading font-medium uppercase tracking-widest text-[#2FCB6E] block">
                Primary Desk
              </span>
              <h2 className="text-2xl font-heading font-semibold text-[#F5F5F7] mt-1">
                WhatsApp Trade Desk
              </h2>
              <p className="text-xs text-[#86868B] font-body mt-1">
                Direct trade execution, rate confirmation, and bank settlement.
              </p>
            </div>
            <div className="p-4 rounded-[20px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] flex items-center gap-3 font-mono text-base text-[#2FCB6E]">
              <MessageCircle className="w-5 h-5 text-[#2FCB6E] shrink-0" />
              <span>{BRAND.whatsappNumberLocal}</span>
            </div>
          </div>

          <Button href={whatsappUrl} isExternal variant="solid-green" size="md" className="w-full rounded-full">
            Open WhatsApp Chat
          </Button>
        </GlassCard>

        {/* Card 2: Social & Verification */}
        <GlassCard className="p-8 rounded-[28px] space-y-6 flex flex-col justify-between border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] hover:border-[rgba(255,255,255,0.14)] transition-colors">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#F5F5F7] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#2FCB6E]" />
            </div>
            <div>
              <span className="text-[11px] font-heading font-medium uppercase tracking-widest text-[#86868B] block">
                Verified Profiles
              </span>
              <h2 className="text-2xl font-heading font-semibold text-[#F5F5F7] mt-1">
                Official Presence
              </h2>
              <p className="text-xs text-[#86868B] font-body mt-1">
                Verify official announcements and daily market updates.
              </p>
            </div>
            <div className="space-y-2.5 pt-2">
              <a
                href={`https://instagram.com/${BRAND.instagramHandle.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-2.5 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.16)] text-xs text-[#F5F5F7] font-medium flex items-center gap-3 transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#86868B]" />
                <span>{BRAND.instagramHandle}</span>
              </a>
              <a
                href={`https://x.com/${BRAND.xHandle.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-2.5 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.16)] text-xs text-[#F5F5F7] font-medium flex items-center gap-3 transition-colors"
              >
                <span className="font-bold text-xs text-[#86868B]">𝕏</span>
                <span>{BRAND.xHandle}</span>
              </a>
            </div>
          </div>

          <div className="p-3 rounded-[18px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] text-[11px] text-[#6E6E73] flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#2FCB6E] shrink-0" />
            <span>Operating Hours: Monday – Sunday, 24/7 Desk Available</span>
          </div>
        </GlassCard>
      </ScrollReveal>
    </div>
  );
}
