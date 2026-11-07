"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export const BeamBackdrop: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const handleVisibility = () => setIsPaused(document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);

    let observer: IntersectionObserver | null = null;
    if (containerRef.current && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          setIsPaused(!entries[0].isIntersecting);
        },
        { threshold: 0.05 }
      );
      observer.observe(containerRef.current);
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1200);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 800);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 1200;
      height = canvas.height = canvas.parentElement?.clientHeight || 800;
    };
    window.addEventListener("resize", handleResize, { passive: true });

    const particleCount = 15; // Optimized for performance
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 1.0,
      speedY: Math.random() * 0.4 + 0.3,
      opacity: Math.random() * 0.25 + 0.15,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      if (isPaused || reducedMotion) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.pulsePhase += 0.02;
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }

        const alpha = p.opacity * (0.8 + 0.2 * Math.sin(p.pulsePhase));
        ctx.fillStyle = `rgba(180, 245, 225, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [isPaused, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-x-0 top-0 -bottom-40 sm:-bottom-56 pointer-events-none overflow-hidden select-none"
    >
      {/* Cool Teal-White Light Shafts */}
      <div className="absolute inset-0 flex items-end justify-center mix-blend-screen pointer-events-none">
        <div
          className="absolute -bottom-16 w-[650px] h-[950px] pointer-events-none origin-bottom"
          style={{
            background:
              "linear-gradient(0deg, rgba(160, 245, 220, 0.28) 0%, rgba(120, 225, 195, 0.06) 60%, transparent 90%)",
            filter: "blur(60px)",
            animation: reducedMotion ? "none" : "beamSweep1 24s ease-in-out infinite",
            animationPlayState: isPaused ? "paused" : "running",
            willChange: "transform, opacity",
          }}
        />
        <div
          className="absolute -bottom-12 w-[500px] h-[850px] pointer-events-none origin-bottom"
          style={{
            background:
              "linear-gradient(0deg, rgba(180, 255, 235, 0.22) 0%, rgba(130, 235, 205, 0.05) 55%, transparent 85%)",
            filter: "blur(48px)",
            animation: reducedMotion ? "none" : "beamSweep2 30s ease-in-out infinite",
            animationPlayState: isPaused ? "paused" : "running",
            willChange: "transform, opacity",
          }}
        />
      </div>

      {/* Beam Haze Image with soft gradient mask & subtle scale drift */}
      <div className="absolute inset-0 flex items-end justify-center">
        <div
          className="relative w-full h-[135%] -bottom-16 opacity-70"
          style={{
            animation: reducedMotion
              ? "none"
              : "beamSweep3 26s ease-in-out infinite alternate",
            animationPlayState: isPaused ? "paused" : "running",
            willChange: "transform, opacity",
            maskImage:
              "linear-gradient(to bottom, black 70%, rgba(0,0,0,0.6) 88%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 70%, rgba(0,0,0,0.6) 88%, transparent 100%)",
          }}
        >
          <Image
            src="/assets/3d/beam-haze.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-bottom"
            priority={false}
          />
        </div>
      </div>

      {/* Extended Green Gradient Reaching Below to completely cover the black gap */}
      <div
        className="absolute bottom-0 inset-x-0 h-[480px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 110% 85% at 50% 100%, rgba(47, 203, 110, 0.24) 0%, rgba(20, 80, 50, 0.14) 45%, rgba(6, 22, 16, 0.06) 80%, transparent 100%)",
        }}
      />
      <div
        className="absolute bottom-0 inset-x-0 h-[300px] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(47, 203, 110, 0.12) 40%, rgba(15, 60, 42, 0.18) 75%, rgba(1, 5, 4, 0.6) 100%)",
        }}
      />

      {/* Upward Particle Field */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />
    </div>
  );
};
