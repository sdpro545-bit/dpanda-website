"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Noise } from "@/components/ui/Noise";

interface SiteShellProps {
  children: React.ReactNode;
  adminSlug: string;
}

export function SiteShell({ children, adminSlug }: SiteShellProps) {
  const pathname = usePathname();

  // Admin route exact match
  const isAdmin = Boolean(adminSlug && pathname === `/${adminSlug}`);

  if (isAdmin) {
    return (
      <main className="min-h-screen bg-[var(--green-950)] text-white">
        {children}
      </main>
    );
  }

  const isHome = pathname === "/";

  return (
    <SmoothScrollProvider>
      <Noise />
      <Header />
      <main className="min-h-screen relative bg-gradient-to-b from-[#020605] via-[#010403] to-[#000000]">
        {!isHome && (
          <div
            aria-hidden="true"
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] pointer-events-none select-none z-0"
            style={{
              background:
                "radial-gradient(circle 420px at 50% 30%, rgba(26, 82, 68, 0.08), transparent 70%)",
            }}
          />
        )}
        <div className="relative z-10">{children}</div>
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
