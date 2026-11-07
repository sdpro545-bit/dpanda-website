"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";

interface IntroAnimationProps {
  children: React.ReactNode;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ children }) => {
  const [hasPlayed, setHasPlayed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftStreakRef = useRef<HTMLDivElement>(null);
  const rightStreakRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check session storage so intro runs once per session
    const played = sessionStorage.getItem("dpanda_intro_played");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (played || prefersReducedMotion) {
      setHasPlayed(true);
      return;
    }

    if (!containerRef.current) return;

    // Intro choreography: scale 0.86 -> 1, thin edge streak lines retreat outward (1.4s)
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("dpanda_intro_played", "true");
        setHasPlayed(true);
      },
    });

    tl.fromTo(
      containerRef.current,
      {
        scale: 0.86,
        borderRadius: "40px",
        overflow: "hidden",
      },
      {
        scale: 1,
        borderRadius: "0px",
        duration: 1.4,
        ease: "power3.inOut",
      }
    );

    if (leftStreakRef.current && rightStreakRef.current) {
      tl.fromTo(
        leftStreakRef.current,
        { x: 0, opacity: 1 },
        { x: -120, opacity: 0, duration: 1.1, ease: "power2.out" },
        0
      );
      tl.fromTo(
        rightStreakRef.current,
        { x: 0, opacity: 1 },
        { x: 120, opacity: 0, duration: 1.1, ease: "power2.out" },
        0
      );
    }
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-black">
      {/* Lateral edge streak lines (Reference Video Intro) */}
      {!hasPlayed && (
        <>
          <div
            ref={leftStreakRef}
            className="fixed left-2 top-1/2 -translate-y-1/2 w-[2px] h-[120px] bg-gradient-to-b from-transparent via-mint-200 to-transparent z-50 pointer-events-none"
          />
          <div
            ref={rightStreakRef}
            className="fixed right-2 top-1/2 -translate-y-1/2 w-[2px] h-[120px] bg-gradient-to-b from-transparent via-mint-200 to-transparent z-50 pointer-events-none"
          />
        </>
      )}

      <div ref={containerRef} className="w-full will-change-transform">
        {children}
      </div>
    </div>
  );
};
