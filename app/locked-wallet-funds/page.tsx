import React from "react";
import Image from "next/image";
import { BRAND } from "@/config/brand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Locked Wallet Funds — Service Details",
  description: "Information regarding locked wallet funds exchange assistance at dPanda.ng.",
};

export default function LockedWalletFundsPage() {
  const whatsappUrl = `https://wa.me/${BRAND.whatsappNumberIntl}?text=${encodeURIComponent(
    "Hello dPanda, I want to inquire about locked wallet funds."
  )}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 space-y-20">
      {/* Page Header */}
      <ScrollReveal className="text-center space-y-4">
        <Eyebrow>Service Explainer</Eyebrow>
        <h1 className="text-4xl md:text-5xl font-heading font-semibold text-[#F5F5F7] tracking-tight">
          Locked Wallet Funds
        </h1>
        <p className="text-[#86868B] font-body text-[17px] leading-[1.47] max-w-xl mx-auto">
          Need assistance with funds in locked or restricted wallets? Review our verification process and contact our WhatsApp desk.
        </p>
      </ScrollReveal>

      {/* Mascot & Service Information Card */}
      <ScrollReveal delay={100}>
        <GlassCard className="p-8 md:p-12 rounded-[28px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-56 h-64">
              <Image
                src="/assets/3d/panda-phone.webp"
                alt="dPanda Mascot"
                fill
                className="object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.6)]"
              />
            </div>
          </div>

          <div className="md:col-span-7 space-y-4">
            <span className="text-[11px] font-heading font-medium uppercase tracking-widest text-[#2FCB6E] block">
              Verification Criteria
            </span>
            <h2 className="text-2xl font-heading font-semibold text-[#F5F5F7]">
              How We Handle Locked Wallet Requests
            </h2>

            {/* Factual explainer block with explicit owner supply placeholder */}
            <div className="p-4 rounded-[20px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] text-sm text-[#86868B] font-body leading-relaxed space-y-2">
              <p className="text-[var(--yellow-400)] font-mono text-xs font-semibold">
                [Notice: Service description subject to owner verification]
              </p>
              <p>
                We review account status, network confirmations, and ownership proofs on an individual basis before confirming eligibility.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-sm text-[#86868B] font-body">
                <CheckCircle2 className="w-4 h-4 text-[#2FCB6E] shrink-0 mt-0.5" />
                <span>Step 1: Contact our desk with wallet network and status.</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-[#86868B] font-body">
                <CheckCircle2 className="w-4 h-4 text-[#2FCB6E] shrink-0 mt-0.5" />
                <span>Step 2: Provide ownership verification to prevent fraudulent claims.</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-[#86868B] font-body">
                <CheckCircle2 className="w-4 h-4 text-[#2FCB6E] shrink-0 mt-0.5" />
                <span>Step 3: Receive quotation and settlement timeline upon review.</span>
              </div>
            </div>

            <div className="pt-4">
              <Button href={whatsappUrl} isExternal variant="solid-green" size="md" className="rounded-full">
                Inquire on WhatsApp
              </Button>
            </div>
          </div>
        </GlassCard>
      </ScrollReveal>
    </div>
  );
}
