"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SITE_COPY } from "@/content/site";
import { Tag } from "@/components/ui/Tag";
import { GlassCard } from "@/components/ui/GlassCard";
import { ChevronDown, ArrowRight } from "lucide-react";

export const FaqTeaserSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const questions = SITE_COPY.faqTeaser.questions.slice(0, 3);

  return (
    <section className="relative bg-green-950 py-24 px-6 border-t border-glass-bd/30">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <Tag variant="outline">FAQ</Tag>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
            {SITE_COPY.faqTeaser.heading}
          </h2>
          <p className="text-sm md:text-base text-white/70 font-body">
            {SITE_COPY.faqTeaser.subheading}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <GlassCard
                key={item.q}
                className="overflow-hidden transition-colors duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-mint-200"
                >
                  <span className="font-heading font-bold text-base md:text-lg text-white">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-mint-200 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-white/75 font-body leading-relaxed border-t border-glass-bd/30 animate-in fade-in duration-200">
                    {item.a}
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>

        {/* Link to Full FAQ */}
        <div className="text-center pt-2">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-mint-200 hover:text-white transition-colors"
          >
            <span>{SITE_COPY.faqTeaser.viewAll}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
