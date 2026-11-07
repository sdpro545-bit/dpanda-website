"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BRAND } from "@/config/brand";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "Gift Cards", href: "/gift-cards" },
  { label: "Crypto", href: "/crypto" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Contact", href: "/contact" },
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const whatsappTradeUrl = `https://wa.me/${BRAND.whatsappNumberIntl}?text=${encodeURIComponent(
    "Hello dPanda, I want to trade."
  )}`;

  return (
    <header className="sticky top-0 left-0 right-0 z-50 h-[48px] bg-[rgba(0,0,0,0.6)] backdrop-blur-[20px] backdrop-saturate-[180%] border-b border-[rgba(255,255,255,0.06)] transition-all duration-200">
      <div className="max-w-[980px] mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        {/* Brand Logo Left */}
        <Link
          href="/"
          className="flex items-center gap-2 group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#7CF0A8] rounded-md"
        >
          <div className="w-6 h-6 relative shrink-0 transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/assets/brand/logo-mark.png"
              alt="dPanda Logo"
              width={24}
              height={24}
              className="object-contain"
              priority
            />
          </div>
          <span className="font-heading font-semibold text-[15px] tracking-tight text-[#F5F5F7] flex items-center">
            dPanda<span className="text-[#2FCB6E] text-[13px] font-normal">.ng</span>
          </span>
        </Link>

        {/* Right Navigation & CTA matching Apple Reference */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-sans transition-colors duration-150 ${
                  isActive
                    ? "text-[#2FCB6E] font-medium"
                    : "text-[#86868B] hover:text-[#F5F5F7]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <Button
            href={whatsappTradeUrl}
            isExternal
            variant="solid-green"
            size="sm"
            className="text-[12px] font-medium px-3.5 py-1 rounded-full shadow-none"
          >
            Trade
          </Button>
        </div>

        {/* Animated Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
          aria-expanded={mobileMenuOpen}
          className="md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-1.5 text-[#86868B] hover:text-[#F5F5F7] focus:outline-none rounded-lg"
        >
          <span
            className={`w-5 h-[1.5px] bg-current rounded-full transition-all duration-300 ease-out origin-center ${
              mobileMenuOpen ? "rotate-45 translate-y-[3.75px] bg-[#2FCB6E]" : ""
            }`}
          />
          <span
            className={`w-5 h-[1.5px] bg-current rounded-full transition-all duration-300 ease-out origin-center ${
              mobileMenuOpen ? "-rotate-45 -translate-y-[3.75px] bg-[#2FCB6E]" : ""
            }`}
          />
        </button>
      </div>

      {/* Animated Card Folder Drawer */}
      <div
        className={`md:hidden overflow-hidden origin-top transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border-b border-[rgba(255,255,255,0.08)] bg-[#020605]/95 backdrop-blur-3xl shadow-[0_24px_48px_rgba(0,0,0,0.85)] ${
          mobileMenuOpen
            ? "max-h-[360px] opacity-100 scale-y-100 translate-y-0"
            : "max-h-0 opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="px-6 py-5 space-y-3">
          {NAV_LINKS.map((link, idx) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  transitionDelay: `${idx * 40}ms`,
                }}
                className={`block text-[15px] font-medium py-1.5 transition-all duration-200 ${
                  isActive
                    ? "text-[#2FCB6E]"
                    : "text-[#86868B] hover:text-[#F5F5F7] hover:translate-x-1"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2">
            <Button
              href={whatsappTradeUrl}
              isExternal
              variant="solid-green"
              size="sm"
              className="w-full text-[14px] font-medium py-2.5 rounded-full shadow-[0_4px_16px_rgba(47,203,110,0.25)] flex items-center justify-center text-[#020605]"
            >
              Trade Now
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
