"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  initials: string;
  avatarUrl: string;
  tradeType: string;
  comment: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "chioma-a",
    name: "Chioma Adeyemi",
    role: "Freelance Designer",
    location: "Lagos",
    initials: "CA",
    avatarUrl: "/assets/testimonials/chioma-adeyemi.jpg",
    tradeType: "$200 Amazon Gift Card",
    comment:
      "I sold an Amazon card from an overseas client. The naira payout landed in my account within four minutes.",
    rating: 5,
  },
  {
    id: "tunde-o",
    name: "Tunde Oladipo",
    role: "Software Engineer",
    location: "Ibadan",
    initials: "TO",
    avatarUrl: "/assets/testimonials/tunde-oladipo.jpg",
    tradeType: "450 USDT to NGN",
    comment:
      "Converted USDT directly to my GTBank account. The rate matched the live calculator with zero hidden deductions.",
    rating: 5,
  },
  {
    id: "zainab-b",
    name: "Zainab Bello",
    role: "Content Creator",
    location: "Abuja",
    initials: "ZB",
    avatarUrl: "/assets/testimonials/zainab-bello.jpg",
    tradeType: "$150 Steam Card",
    comment:
      "Clean rate and polite trade desk response. My naira was paid promptly without any back and forth.",
    rating: 5,
  },
  {
    id: "emeka-e",
    name: "Emeka Eze",
    role: "Growth Lead",
    location: "Enugu",
    initials: "EE",
    avatarUrl: "/assets/testimonials/emeka-eze.jpg",
    tradeType: "0.025 BTC",
    comment:
      "The best rate I have seen for Bitcoin. Fast settlement and clear confirmation right on WhatsApp.",
    rating: 5,
  },
  {
    id: "femi-b",
    name: "Femi Bakare",
    role: "Product Manager",
    location: "Lagos",
    initials: "FB",
    avatarUrl: "/assets/testimonials/femi-bakare.jpg",
    tradeType: "$100 Apple Gift Card",
    comment:
      "No tedious sign-up procedures. I checked the today's rate, tapped Trade Now, and completed the trade smoothly.",
    rating: 5,
  },
  {
    id: "daniel-a",
    name: "Daniel Alabi",
    role: "Mobile Developer",
    location: "Port Harcourt",
    initials: "DA",
    avatarUrl: "/assets/testimonials/daniel-alabi.jpg",
    tradeType: "12 SOL to NGN",
    comment:
      "Traded Solana during a market shift. The naira transfer arrived before I even closed my banking app.",
    rating: 5,
  },
];

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const total = TESTIMONIALS.length;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Pointer drag/swipe handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    setDragOffset(0);
    setIsPaused(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || dragStartX.current === null) return;
    const diff = e.clientX - dragStartX.current;
    setDragOffset(diff);
  };

  const handlePointerEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -40) {
      handleNext();
    } else if (dragOffset > 40) {
      handlePrev();
    }
    setDragOffset(0);
    dragStartX.current = null;
    setIsPaused(false);
  };

  // Auto-switching loop: 2 seconds
  useEffect(() => {
    if (isPaused || isDragging) return;
    const interval = setInterval(() => {
      handleNext();
    }, 2000);
    return () => clearInterval(interval);
  }, [isPaused, isDragging, handleNext]);

  return (
    <section
      aria-label="What Our Clients Say about dPanda"
      className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        if (!isDragging) setIsPaused(false);
      }}
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-10 sm:mb-12">
        <Eyebrow>Verified Reviews</Eyebrow>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold text-[#F5F5F7] tracking-tight">
          What Our Clients Says about dPanda
        </h2>
        <p className="text-[#86868B] text-sm sm:text-base font-body max-w-lg mx-auto">
          Real feedback from active traders receiving verified naira payouts daily across Nigeria.
        </p>
      </div>

      {/* Testimonial Cards Carousel with Drag / Swipe */}
      <div
        className="relative overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
        {/* Mobile View: Single Sliding Card */}
        <div className="md:hidden">
          <div
            className={`flex ${
              isDragging
                ? "transition-none"
                : "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            }`}
            style={{
              transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
            }}
          >
            {TESTIMONIALS.map((item) => (
              <div key={item.id} className="w-full shrink-0 px-1 pointer-events-none">
                <div className="relative rounded-[24px] bg-gradient-to-b from-[rgba(16,38,28,0.60)] via-[rgba(9,22,16,0.50)] to-[rgba(4,10,7,0.70)] border border-[#2FCB6E]/30 p-6 backdrop-blur-[24px] shadow-[0_16px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(47,203,110,0.10)] flex flex-col justify-between min-h-[260px]">
                  {/* Top Specular Rim */}
                  <div className="absolute inset-x-6 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#7CF0A8]/50 to-transparent pointer-events-none rounded-t-[24px]" />

                  <div>
                    {/* Stars & Trade Pill */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-[#FFD62E] text-[#FFD62E]"
                          />
                        ))}
                      </div>
                      <span className="text-[11px] font-mono text-[#7CF0A8] bg-[#2FCB6E]/10 border border-[#2FCB6E]/30 px-2.5 py-0.5 rounded-full">
                        {item.tradeType}
                      </span>
                    </div>

                    {/* Quote */}
                    <p className="text-[15px] text-[#F5F5F7] font-body leading-relaxed mb-6">
                      &ldquo;{item.comment}&rdquo;
                    </p>
                  </div>

                  {/* Profile Footer */}
                  <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                    <div className="relative w-10 h-10 rounded-full border border-[#2FCB6E]/40 overflow-hidden shrink-0 shadow-inner bg-[#0A2414]">
                      <Image
                        src={item.avatarUrl}
                        alt={item.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[14px] font-heading font-semibold text-[#F5F5F7] truncate">
                          {item.name}
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2FCB6E] shrink-0" />
                      </div>
                      <span className="text-xs text-[#86868B] block truncate">
                        {item.role} · {item.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop / Tablet View: 3-Card Carousel Track */}
        <div className="hidden md:block">
          <div
            className={`flex -mx-3 ${
              isDragging
                ? "transition-none"
                : "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            }`}
            style={{
              transform: `translateX(calc(-${currentIndex * 33.3333}% + ${dragOffset}px))`,
            }}
          >
            {[...TESTIMONIALS, ...TESTIMONIALS].map((item, idx) => {
              const activeIndex = currentIndex % total;
              const isLeadCard = idx % total === activeIndex;
              return (
                <div key={`${item.id}-${idx}`} className="w-1/3 shrink-0 px-3 pointer-events-none">
                  <div
                    className={`relative rounded-[26px] bg-gradient-to-b from-[rgba(16,38,28,0.55)] via-[rgba(9,22,16,0.45)] to-[rgba(4,10,7,0.65)] border ${
                      isLeadCard
                        ? "border-[#2FCB6E]/50 shadow-[0_20px_48px_rgba(0,0,0,0.8)]"
                        : "border-[#2FCB6E]/20 shadow-[0_16px_40px_rgba(0,0,0,0.6)]"
                    } p-6 backdrop-blur-[24px] flex flex-col justify-between h-[270px] transition-all duration-300`}
                  >
                    {/* Top Specular Rim */}
                    <div className="absolute inset-x-6 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#7CF0A8]/50 to-transparent pointer-events-none rounded-t-[26px]" />

                    <div>
                      {/* Stars & Trade Pill */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: item.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-[#FFD62E] text-[#FFD62E]"
                            />
                          ))}
                        </div>
                        <span className="text-[11px] font-mono text-[#7CF0A8] bg-[#2FCB6E]/10 border border-[#2FCB6E]/30 px-2.5 py-0.5 rounded-full">
                          {item.tradeType}
                        </span>
                      </div>

                      {/* Quote */}
                      <p className="text-[14px] text-[#F5F5F7] font-body leading-relaxed line-clamp-4">
                        &ldquo;{item.comment}&rdquo;
                      </p>
                    </div>

                    {/* Profile Footer */}
                    <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                      <div className="relative w-10 h-10 rounded-full border border-[#2FCB6E]/40 overflow-hidden shrink-0 shadow-inner bg-[#0A2414]">
                        <Image
                          src={item.avatarUrl}
                          alt={item.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[14px] font-heading font-semibold text-[#F5F5F7] truncate">
                            {item.name}
                          </span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2FCB6E] shrink-0" />
                        </div>
                        <span className="text-xs text-[#86868B] block truncate">
                          {item.role} · {item.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Carousel Controls & Pagination Indicators */}
      <div className="flex items-center justify-between mt-8 max-w-xs mx-auto">
        <button
          onClick={handlePrev}
          aria-label="Previous review"
          className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#2FCB6E]/40 hover:bg-[#2FCB6E]/10 flex items-center justify-center text-[#86868B] hover:text-[#7CF0A8] transition-all active:scale-95"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Progress Indicators */}
        <div className="flex items-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to review ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "w-6 bg-[#2FCB6E]"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Next review"
          className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#2FCB6E]/40 hover:bg-[#2FCB6E]/10 flex items-center justify-center text-[#86868B] hover:text-[#7CF0A8] transition-all active:scale-95"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
