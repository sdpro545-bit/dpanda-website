import React from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "Privacy Policy — dPanda.ng",
  description: "Privacy and data protection policy for dPanda.ng.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 space-y-16">
      <ScrollReveal className="space-y-4">
        <Eyebrow>Data Privacy</Eyebrow>
        <h1 className="text-4xl md:text-5xl font-heading font-semibold text-[#F5F5F7] tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-[#6E6E73] font-body">
          Last updated: November 2026
        </p>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <GlassCard className="p-8 md:p-12 rounded-[28px] space-y-8 text-[15px] text-[#86868B] font-body leading-relaxed border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)]">
          <section className="space-y-2">
            <h2 className="text-lg font-heading font-semibold text-[#F5F5F7]">1. Information We Collect</h2>
            <p>
              dPanda.ng does not mandate user accounts or registrations to browse rates. When using our calculators, inputs are processed client-side and temporarily queried against quote API endpoints without storing personally identifiable information.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-heading font-semibold text-[#F5F5F7]">2. WhatsApp Communications</h2>
            <p>
              When you initiate a trade conversation via WhatsApp, transaction information, payment bank details, and verification files are exchanged directly over encrypted WhatsApp messaging subject to WhatsApp&apos;s privacy standard.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-heading font-semibold text-[#F5F5F7]">3. Third-Party Market Data</h2>
            <p>
              Cryptocurrency benchmark rates are fetched anonymously from public market data providers (e.g., CoinGecko) to reflect live exchange values without transmitting user identity.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-heading font-semibold text-[#F5F5F7]">4. Cookies & Analytics</h2>
            <p>
              This website does not deploy invasive tracking cookies or commercial ad trackers. Essential session cookies are restricted to internal operational security.
            </p>
          </section>
        </GlassCard>
      </ScrollReveal>
    </div>
  );
}
