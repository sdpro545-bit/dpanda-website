import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface ChipProps {
  icon?: React.ReactNode;
  label: string;
  href?: string;
  variant?: "yellow" | "dark" | "mint";
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  icon,
  label,
  href,
  variant = "yellow",
  className,
}) => {
  const base =
    "inline-flex items-center gap-2 px-4 py-2 rounded-pill text-xs md:text-sm font-heading font-semibold transition-all duration-200 select-none";

  const variants = {
    yellow: "bg-yellow-400 text-ink-900 hover:brightness-105 active:scale-95 shadow-[0_2px_12px_rgba(255,214,46,0.15)]",
    dark: "bg-green-800 text-white border border-glass-bd hover:bg-green-700 active:scale-95",
    mint: "bg-mint-50 text-ink-900 border border-mint-200/50 hover:bg-white active:scale-95",
  };

  const content = (
    <>
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span className="tabular-nums tracking-wide">{label}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={twMerge(clsx(base, variants[variant], className))}
      >
        {content}
      </a>
    );
  }

  return <div className={twMerge(clsx(base, variants[variant], className))}>{content}</div>;
};
