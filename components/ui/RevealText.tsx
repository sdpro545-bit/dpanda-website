"use client";

import React, { useEffect, useRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import gsap from "gsap";

interface RevealTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  delay?: number;
  stagger?: number;
}

export const RevealText: React.FC<RevealTextProps> = ({
  children,
  as: Component = "h2",
  className,
  delay = 0,
  stagger = 0.1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !containerRef.current) return;

    const words = containerRef.current.querySelectorAll(".reveal-word");
    gsap.fromTo(
      words,
      {
        y: 35,
        opacity: 0,
        filter: "blur(10px)",
      },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.9,
        stagger,
        delay,
        ease: "power3.out",
      }
    );
  }, [children, delay, stagger]);

  const words = children.split(" ");

  return (
    <div
      ref={containerRef}
      className={twMerge(clsx("inline-block overflow-hidden", className))}
    >
      <Component className="inline">
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="reveal-word inline-block mr-[0.28em] will-change-[transform,opacity,filter]"
          >
            {word}
          </span>
        ))}
      </Component>
    </div>
  );
};
