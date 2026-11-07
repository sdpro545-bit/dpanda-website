"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface FloatingItem {
  id: string;
  src: string;
  coinSrc?: string;
  alt: string;
  layer: "far" | "mid" | "near";
  initialTop: string;
  initialLeft?: string;
  initialRight?: string;
  width: number;
  height: number;
  driftX1: number; // 25% drift vw
  driftY1: number; // 25% drift vh
  driftX2: number; // 50% drift vw
  driftY2: number; // 50% drift vh
  driftX3: number; // 75% drift vw
  driftY3: number; // 75% drift vh
  rotateMax: number; // degrees
  duration: number; // seconds
  delay: number; // seconds offset
  isCryptoBox?: boolean;
}

const FLOATING_ITEMS: FloatingItem[] = [
  // 1. Box 1 with 3D BTC Logo (Far Left Gutters Only)
  {
    id: "box-btc",
    src: "/assets/3d/shape-diamond-1.webp",
    coinSrc: "/assets/3d/coin-btc.webp",
    alt: "Bitcoin 3D Box",
    layer: "near",
    initialTop: "14%",
    initialLeft: "1.5%",
    width: 120,
    height: 120,
    driftX1: -0.6,
    driftY1: -6,
    driftX2: 0.8,
    driftY2: 8,
    driftX3: -0.4,
    driftY3: 12,
    rotateMax: 10,
    duration: 32,
    delay: -4,
    isCryptoBox: true,
  },

  // 2. Box 2 with 3D USDT Logo (Far Right Gutters Only)
  {
    id: "box-usdt",
    src: "/assets/3d/shape-diamond-2.webp",
    coinSrc: "/assets/3d/coin-usdt.webp",
    alt: "USDT 3D Box",
    layer: "near",
    initialTop: "15%",
    initialRight: "1.5%",
    width: 115,
    height: 115,
    driftX1: 0.6,
    driftY1: 8,
    driftX2: -0.8,
    driftY2: -8,
    driftX3: 0.5,
    driftY3: -12,
    rotateMax: -10,
    duration: 36,
    delay: -14,
    isCryptoBox: true,
  },

  // 3. Box 3 with 3D Ethereum Logo (Far Lower Left Gutters Only)
  {
    id: "box-eth",
    src: "/assets/3d/shape-diamond-3.webp",
    coinSrc: "/assets/3d/coin-eth.webp",
    alt: "Ethereum 3D Box",
    layer: "near",
    initialTop: "76%",
    initialLeft: "1.5%",
    width: 115,
    height: 115,
    driftX1: 0.5,
    driftY1: -6,
    driftX2: -0.8,
    driftY2: 6,
    driftX3: 0.4,
    driftY3: -2,
    rotateMax: 10,
    duration: 38,
    delay: -22,
    isCryptoBox: true,
  },

  // 4. Pixel Cluster (Far Upper Right)
  {
    id: "pixel-cluster",
    src: "/assets/3d/shape-pixel-cluster.webp",
    alt: "",
    layer: "mid",
    initialTop: "10%",
    initialLeft: "93%",
    width: 85,
    height: 85,
    driftX1: -0.5,
    driftY1: 6,
    driftX2: 0.5,
    driftY2: 12,
    driftX3: -0.3,
    driftY3: 6,
    rotateMax: 12,
    duration: 44,
    delay: -12,
  },

  // 5. Check Tile (Far Mid Right)
  {
    id: "tile-check",
    src: "/assets/3d/tile-check.webp",
    alt: "",
    layer: "mid",
    initialTop: "54%",
    initialLeft: "94%",
    width: 80,
    height: 80,
    driftX1: 0.4,
    driftY1: 6,
    driftX2: -0.6,
    driftY2: 10,
    driftX3: 0.3,
    driftY3: 4,
    rotateMax: -12,
    duration: 46,
    delay: -25,
  },

  // 6. Clock Tile (Far Lower Right)
  {
    id: "tile-clock",
    src: "/assets/3d/tile-clock.webp",
    alt: "",
    layer: "far",
    initialTop: "84%",
    initialLeft: "92%",
    width: 75,
    height: 75,
    driftX1: -0.4,
    driftY1: -6,
    driftX2: 0.5,
    driftY2: 6,
    driftX3: -0.3,
    driftY3: 8,
    rotateMax: -10,
    duration: 50,
    delay: -18,
  },

  // 7. Chat Tile (Far Lower Left)
  {
    id: "tile-chat",
    src: "/assets/3d/tile-chat.webp",
    alt: "",
    layer: "far",
    initialTop: "88%",
    initialLeft: "3%",
    width: 75,
    height: 75,
    driftX1: 0.4,
    driftY1: -5,
    driftX2: -0.5,
    driftY2: -2,
    driftX3: 0.3,
    driftY3: 5,
    rotateMax: 10,
    duration: 52,
    delay: -8,
  },
];

export const FloatingLayer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Pause when tab is hidden or off-screen
  useEffect(() => {
    const handleVisibility = () => {
      setIsPaused(document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);

    let observer: IntersectionObserver | null = null;
    if (containerRef.current && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          setIsPaused(!entry.isIntersecting);
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

  // Particle Canvas across hero (silky smooth, cool teal-white upward drift)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 1400);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 1400;
    };
    window.addEventListener("resize", handleResize, { passive: true });

    const particleCount = 18; // Lightweight, high-fps performance
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 1.0,
      speedY: Math.random() * 0.4 + 0.25,
      opacity: Math.random() * 0.25 + 0.12,
      pulseSpeed: Math.random() * 0.02 + 0.01,
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
        p.pulsePhase += p.pulseSpeed;
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
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
    >
      {/* 1. Soft dark-teal radial glow behind content (opacity 0.08 - 0.10) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[850px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle 500px at 50% 40%, rgba(26, 82, 68, 0.09), transparent 75%)",
        }}
      />

      {/* 2. Soft Light Beams: 3 shafts with cool teal-white tint & slow breathing opacity */}
      <div className="absolute inset-0 flex items-start justify-center overflow-hidden pointer-events-none mix-blend-screen">
        {/* Shaft 1 */}
        <div
          className="absolute -top-[15%] left-[20%] w-[380px] h-[1300px] pointer-events-none origin-top"
          style={{
            background:
              "linear-gradient(180deg, rgba(160, 245, 220, 0.20) 0%, rgba(120, 225, 195, 0.05) 55%, transparent 90%)",
            filter: "blur(48px)",
            animation: reducedMotion ? "none" : "beamSweep1 24s ease-in-out infinite",
            animationPlayState: isPaused ? "paused" : "running",
            willChange: "transform, opacity",
          }}
        />
        {/* Shaft 2 */}
        <div
          className="absolute -top-[20%] right-[22%] w-[420px] h-[1400px] pointer-events-none origin-top"
          style={{
            background:
              "linear-gradient(180deg, rgba(180, 255, 235, 0.18) 0%, rgba(130, 235, 205, 0.04) 50%, transparent 85%)",
            filter: "blur(54px)",
            animation: reducedMotion ? "none" : "beamSweep2 28s ease-in-out infinite",
            animationPlayState: isPaused ? "paused" : "running",
            willChange: "transform, opacity",
          }}
        />
        {/* Shaft 3 */}
        <div
          className="absolute -top-[10%] left-[45%] w-[320px] h-[1200px] pointer-events-none origin-top"
          style={{
            background:
              "linear-gradient(180deg, rgba(200, 255, 245, 0.14) 0%, rgba(140, 240, 215, 0.03) 60%, transparent 85%)",
            filter: "blur(42px)",
            animation: reducedMotion ? "none" : "beamSweep3 22s ease-in-out infinite",
            animationPlayState: isPaused ? "paused" : "running",
            willChange: "transform, opacity",
          }}
        />
      </div>

      {/* 3. Upward Particle Canvas across whole hero */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* 4. Autonomous Dynamically Animated 3D Objects (No Parallax) */}
      {FLOATING_ITEMS.map((item) => {
        const layerStyles = item.isCryptoBox
          ? "opacity-[0.92] drop-shadow-[0_12px_36px_rgba(0,0,0,0.85)] scale-55 sm:scale-80 md:scale-100 origin-center"
          : item.layer === "far"
          ? "hidden sm:block blur-[2px] opacity-[0.25] scale-75 sm:scale-90"
          : "hidden sm:block opacity-[0.55] scale-80 sm:scale-95";

        return (
          <div
            key={item.id}
            className={`absolute pointer-events-none ${layerStyles}`}
            style={{
              top: item.initialTop,
              left: item.initialLeft,
              right: item.initialRight,
              width: `${item.width}px`,
              height: `${item.height}px`,
              willChange: "transform",
            }}
          >
            {/* Autonomous orbital loop container */}
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                animation: reducedMotion
                  ? "none"
                  : `autonomousLoop-${item.id} ${item.duration}s ease-in-out infinite`,
                animationDelay: `${item.delay}s`,
                animationPlayState: isPaused ? "paused" : "running",
                willChange: "transform",
              }}
            >
              {/* Outer 3D Diamond/Tile Shape */}
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="160px"
                className="object-contain"
                priority={item.isCryptoBox}
              />

              {/* 3D Crypto Coin centered inside with micro-levitation */}
              {item.coinSrc && (
                <div className="absolute inset-0 flex items-center justify-center p-[20%]">
                  <div
                    className="relative w-full h-full"
                    style={{
                      animation: reducedMotion
                        ? "none"
                        : "cryptoCoinLevitate 7s ease-in-out infinite alternate",
                      animationPlayState: isPaused ? "paused" : "running",
                      filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.75))",
                    }}
                  >
                    <Image
                      src={item.coinSrc}
                      alt={item.alt}
                      fill
                      sizes="120px"
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Continuous, graceful closed-loop keyframe animation */}
            <style jsx>{`
              @keyframes autonomousLoop-${item.id} {
                0% {
                  transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
                }
                25% {
                  transform: translate3d(${item.driftX1}vw, ${item.driftY1}vh, 0)
                    rotate(${item.rotateMax * 0.6}deg) scale(1.03);
                }
                50% {
                  transform: translate3d(${item.driftX2}vw, ${item.driftY2}vh, 0)
                    rotate(${item.rotateMax}deg) scale(0.97);
                }
                75% {
                  transform: translate3d(${item.driftX3}vw, ${item.driftY3}vh, 0)
                    rotate(${item.rotateMax * 0.4}deg) scale(1.02);
                }
                100% {
                  transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
                }
              }

              @keyframes cryptoCoinLevitate {
                0% {
                  transform: translateY(-3px) scale(0.98) rotate(-2deg);
                }
                50% {
                  transform: translateY(3px) scale(1.02) rotate(2deg);
                }
                100% {
                  transform: translateY(-3px) scale(0.98) rotate(-2deg);
                }
              }
            `}</style>
          </div>
        );
      })}
    </div>
  );
};
