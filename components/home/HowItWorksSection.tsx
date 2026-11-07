"use client";

import React from "react";
import { SITE_COPY } from "@/content/site";
import { Tag } from "@/components/ui/Tag";
import { GlassCard } from "@/components/ui/GlassCard";

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="relative bg-green-950 py-24 px-6 border-t border-glass-bd/40">
      <div className="max-w-6xl mx-auto space-y-14">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <Tag variant="yellow">SIMPLE FLOW</Tag>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
            {SITE_COPY.howItWorks.heading}
          </h2>
          <p className="text-base text-white/70 font-body">
            Four transparent steps from rate check to bank payout.
          </p>
        </div>

        {/* 4 Numbered Steps in Glass Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SITE_COPY.howItWorks.steps.map((step) => (
            <GlassCard
              key={step.step}
              className="p-6 flex flex-col justify-between gap-6 hover:border-mint-200/50 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-green-800 border border-glass-bd flex items-center justify-center font-heading font-extrabold text-yellow-400 text-sm group-hover:bg-yellow-400 group-hover:text-ink-900 transition-colors">
                  0{step.step}
                </div>
                <h3 className="font-heading font-bold text-lg text-white leading-snug">
                  {step.title}
                </h3>
              </div>
              <p className="text-xs text-white/70 font-body leading-relaxed border-t border-glass-bd/30 pt-3">
                {step.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
