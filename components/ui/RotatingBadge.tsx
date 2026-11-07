"use client";

import React from "react";
import { ArrowDownRight } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface RotatingBadgeProps {
  text?: string;
  icon?: React.ReactNode;
  size?: number;
  className?: string;
  onClick?: () => void;
}

export const RotatingBadge: React.FC<RotatingBadgeProps> = ({
  text = "FAST · RELIABLE · SAFE · ",
  icon = <ArrowDownRight className="w-5 h-5 text-yellow-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />,
  size = 110,
  className,
  onClick,
}) => {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={{ width: size, height: size }}
      className={twMerge(
        clsx(
          "relative inline-flex items-center justify-center rounded-full cursor-pointer group select-none transition-transform duration-300 hover:scale-105",
          className
        )
      )}
    >
      {/* Outer subtle ring border */}
      <div className="absolute inset-0 rounded-full border border-glass-bd bg-glass-bg/60 backdrop-blur-md" />

      {/* Rotating SVG with circular text */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full animate-[spin_14s_linear_infinite] group-hover:[animation-play-state:paused]"
      >
        <path
          id="badgeCirclePath"
          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          fill="none"
        />
        <text
          fill="var(--mint-200)"
          fontSize="9.2"
          fontWeight="700"
          letterSpacing="0.16em"
          fontFamily="var(--font-heading)"
        >
          <textPath xlinkHref="#badgeCirclePath" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>

      {/* Center Icon */}
      <div className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-green-800/80 border border-glass-bd flex items-center justify-center shadow-inner">
        {icon}
      </div>
    </div>
  );
};
