import React from "react";
import { SITE_COPY } from "@/content/site";
import { BRAND } from "@/config/brand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "How It Works — 4 Simple Steps to Trade",
  description:
    "Learn how to trade gift cards and cryptocurrency for instant naira payout on dPanda.ng.",
};

export default function HowItWorksPage() {
  const whatsappUrl = `https://wa.me/${BRAND.whatsappNumberIntl}?text=${encodeURIComponent(
    "Hello dPanda, I want to trade."
  )}`;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 md:py-24 space-y-20">
      {/* Page Header */}
      <ScrollReveal className="text-center max-w-2xl mx-auto space-y-4">
        <Eyebrow>How It Works</Eyebrow>
        <h1 className="text-4xl md:text-5xl font-heading font-semibold text-[#F5F5F7] tracking-tight">
          How to Trade on dPanda.ng
        </h1>
        <p className="text-[#86868B] font-body text-[17px] leading-[1.47]">
          No sign-ups, no wallets to connect, no unnecessary delays. Check your rate on the website and trade directly on WhatsApp.
        </p>
      </ScrollReveal>

      {/* 4 Steps Timeline */}
      <ScrollReveal className="space-y-6" delay={100}>
        {SITE_COPY.howItWorks.steps.map((step) => (
          <GlassCard
            key={step.step}
            className="p-8 rounded-[28px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-[rgba(255,255,255,0.12)] transition-colors"
          >
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center font-heading font-semibold text-lg text-[#F5F5F7] shrink-0">
                0{step.step}
              </div>
              <div className="space-y-1.5">
                <h2 className="text-xl md:text-2xl font-heading font-semibold text-[#F5F5F7]">
                  {step.title}
                </h2>
                <p className="text-[15px] md:text-base text-[#86868B] font-body max-w-xl leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
            <div className="shrink-0 text-[#2FCB6E]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </GlassCard>
        ))}
      </ScrollReveal>

      {/* Direct CTA Block */}
      <ScrollReveal delay={150}>
        <div className="p-8 md:p-14 rounded-[28px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] backdrop-blur-2xl text-center space-y-6 shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-[#F5F5F7]">
            Ready to trade your card or coin?
          </h2>
          <p className="text-sm md:text-base text-[#86868B] max-w-lg mx-auto font-body leading-relaxed">
            Our WhatsApp trade desk is active right now. Send your details and receive your payout promptly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href={whatsappUrl} isExternal variant="solid-green" size="lg">
              Start Trade on WhatsApp
            </Button>
            <Button href="/gift-cards" variant="glass" size="lg">
              Check Gift Card Rates
            </Button>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
