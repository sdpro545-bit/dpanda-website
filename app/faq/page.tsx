"use client";

import React, { useState } from "react";
import { SITE_COPY } from "@/content/site";
import { BRAND } from "@/config/brand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ChevronDown } from "lucide-react";

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const whatsappUrl = `https://wa.me/${BRAND.whatsappNumberIntl}?text=${encodeURIComponent(
    "Hello dPanda, I have a question about trading."
  )}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 space-y-20">
      {/* Page Header */}
      <ScrollReveal className="text-center space-y-4">
        <Eyebrow>Questions & Answers</Eyebrow>
        <h1 className="text-4xl md:text-5xl font-heading font-semibold text-[#F5F5F7] tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-[#86868B] font-body text-[17px] leading-[1.47] max-w-xl mx-auto">
          Clear, transparent answers on how rates, trade settlements, and payments work at dPanda.ng.
        </p>
      </ScrollReveal>

      {/* Accordion Questions */}
      <ScrollReveal className="space-y-4" delay={100}>
        {SITE_COPY.faqTeaser.questions.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <GlassCard
              key={item.q}
              className="rounded-[24px] overflow-hidden border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.025)] transition-colors hover:border-[rgba(255,255,255,0.12)]"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                aria-expanded={isOpen}
                className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7CF0A8]"
              >
                <span className="font-heading font-semibold text-[17px] text-[#F5F5F7]">
                  {item.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#86868B] shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-[#2FCB6E]" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-[15px] text-[#86868B] font-body leading-relaxed border-t border-[rgba(255,255,255,0.04)] animate-in fade-in duration-200">
                  {item.a}
                </div>
              )}
            </GlassCard>
          );
        })}
      </ScrollReveal>

      {/* Escalation Support Card */}
      <ScrollReveal delay={150}>
        <GlassCard className="p-8 md:p-10 text-center space-y-4 rounded-[28px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)]">
          <h3 className="font-heading font-semibold text-xl text-[#F5F5F7]">
            Still have a question?
          </h3>
          <p className="text-sm text-[#86868B] max-w-md mx-auto font-body leading-relaxed">
            Our support desk is online on WhatsApp to answer your specific questions in real time.
          </p>
          <div className="pt-2">
            <Button href={whatsappUrl} isExternal variant="solid-green" size="md">
              Chat with Support
            </Button>
          </div>
        </GlassCard>
      </ScrollReveal>
    </div>
  );
}
