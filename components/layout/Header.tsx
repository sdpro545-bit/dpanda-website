"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BRAND } from "@/config/brand";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";

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

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
          aria-expanded={mobileMenuOpen}
          className="md:hidden p-1.5 text-[#86868B] hover:text-[#F5F5F7] focus:outline-none rounded-lg"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[rgba(255,255,255,0.06)] bg-[#010403]/95 px-6 py-4 space-y-3 backdrop-blur-2xl">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[14px] font-medium text-[#86868B] hover:text-[#2FCB6E] py-1"
            >
              {link.label}
            </Link>
          ))}
          <Button
            href={whatsappTradeUrl}
            isExternal
            variant="solid-green"
            size="sm"
            className="w-full text-[13px] font-medium py-2 mt-2"
          >
            Trade on WhatsApp
          </Button>
        </div>
      )}
    </header>
  );
};
