"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BRAND } from "@/config/brand";
import { MessageCircle, Instagram } from "lucide-react";

// X (formerly Twitter) icon component
const XIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-0 pt-0">
      {/* Outer wrapper with concave curved notch mask at top-left */}
      <div
        className="relative bg-gradient-to-b from-[#020605] via-[#010504] to-[#000000] border-t border-[rgba(47,203,110,0.2)] pt-16 pb-12 overflow-hidden"
        style={{
          maskImage:
            "radial-gradient(circle 32px at 0 0, transparent 32px, black 33px)",
          WebkitMaskImage:
            "radial-gradient(circle 32px at 0 0, transparent 32px, black 33px)",
        }}
      >
        {/* Soft Ambient Green Glow Bleed from BeamSection */}
        <div
          className="absolute top-0 inset-x-0 h-[220px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 90% 120px at 50% 0%, rgba(47, 203, 110, 0.22) 0%, rgba(20, 80, 50, 0.10) 45%, transparent 75%)",
          }}
        />

        {/* Subtle decorative concave notch outline */}
        <svg
          className="absolute top-0 left-0 w-8 h-8 pointer-events-none"
          viewBox="0 0 32 32"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M 0,32 A 32,32 0 0,0 32,0"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>

        <div className="max-w-[980px] mx-auto px-6 sm:px-8">
          {/* Top Row: Logo & Wordmark (Left) + Socials (Right) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-12 border-b border-[rgba(255,255,255,0.06)]">
            {/* Logo + Wordmark */}
            <Link
              href="/"
              className="flex items-center gap-3.5 group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#7CF0A8] rounded-lg"
            >
              <div className="w-10 h-10 relative shrink-0 transition-transform duration-200 group-hover:scale-105">
                <Image
                  src="/assets/brand/logo-mark.png"
                  alt="dPanda Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-semibold text-xl tracking-tight text-[#F5F5F7] flex items-center">
                  dPanda<span className="text-[#2FCB6E] text-base font-normal">.ng</span>
                </span>
                <span className="text-[12px] text-[#86868B] font-sans tracking-wide">
                  Fast, secure gift card & crypto trades
                </span>
              </div>
            </Link>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/${BRAND.whatsappNumberIntl}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#86868B] hover:text-[#F5F5F7] hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.06)] transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#7CF0A8]"
              >
                <MessageCircle className="w-4 h-4 text-[#2FCB6E]" />
              </a>
              <a
                href={`https://instagram.com/${BRAND.instagramHandle.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#86868B] hover:text-[#F5F5F7] hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.06)] transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#7CF0A8]"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://x.com/${BRAND.xHandle.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#86868B] hover:text-[#F5F5F7] hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.06)] transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#7CF0A8]"
              >
                <XIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Middle Row: Disclaimer */}
          <div className="py-6 text-xs text-[#6E6E73] font-sans leading-relaxed border-b border-[rgba(255,255,255,0.04)]">
            <p>{BRAND.ratesDisclaimer}</p>
          </div>

          {/* Bottom Row: Copyright (Left) + Terms, Privacy, Phone (Right) */}
          <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#86868B] font-sans">
            <p>© {currentYear} dPanda.ng. All rights reserved.</p>

            <div className="flex items-center gap-6">
              <Link
                href="/terms"
                className="hover:text-[#2FCB6E] transition-colors duration-150 focus:outline-none focus-visible:underline"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="hover:text-[#2FCB6E] transition-colors duration-150 focus:outline-none focus-visible:underline"
              >
                Privacy
              </Link>
              <a
                href={`https://wa.me/${BRAND.whatsappNumberIntl}`}
                className="text-[#86868B] hover:text-[#2FCB6E] font-medium transition-colors duration-150 focus:outline-none focus-visible:underline"
              >
                {BRAND.whatsappNumberLocal}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
