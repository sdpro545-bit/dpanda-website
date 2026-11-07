import React from "react";
import { BRAND } from "@/config/brand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "Terms of Service — dPanda.ng",
  description: "Terms and conditions governing gift card and crypto exchange rates on dPanda.ng.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 space-y-16">
      <ScrollReveal className="space-y-4">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="text-4xl md:text-5xl font-heading font-semibold text-[#F5F5F7] tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-[#6E6E73] font-body">
          Last updated: November 2026
        </p>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <GlassCard className="p-8 md:p-12 rounded-[28px] space-y-8 text-[15px] text-[#86868B] font-body leading-relaxed border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)]">
          <section className="space-y-2">
            <h2 className="text-lg font-heading font-semibold text-[#F5F5F7]">1. Nature of Service</h2>
            <p>
              dPanda.ng operates as an independent peer exchange routing platform providing rate information for digital gift cards and selected cryptocurrencies. Website displays represent real-time estimates; transactions are executed and confirmed directly via authorized WhatsApp trade representatives.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-heading font-semibold text-[#F5F5F7]">2. Rate Fluctuations & Confirmations</h2>
            <p>
              {BRAND.ratesDisclaimer} Due to volatility in currency exchange and foreign gift card secondary markets, rate quotations remain indicative until final verification of the asset on WhatsApp.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-heading font-semibold text-[#F5F5F7]">3. Asset Verification & Fraud Prevention</h2>
            <p>
              All submitted digital cards, activation receipts, and cryptocurrency transaction IDs undergo authenticity screening prior to disbursement. Fraudulent or previously redeemed codes will be rejected immediately.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-heading font-semibold text-[#F5F5F7]">4. Payouts & Settlement</h2>
            <p>
              Approved payouts are disbursed in Nigerian Naira (NGN) directly to the designated bank account provided by the trader during WhatsApp conversation confirmation.
            </p>
          </section>
        </GlassCard>
      </ScrollReveal>
    </div>
  );
}
