import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface TagProps {
  children: React.ReactNode;
  variant?: "outline" | "solid" | "yellow";
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  children,
  variant = "outline",
  className,
}) => {
  const base =
    "inline-flex items-center text-[10px] md:text-xs font-heading uppercase tracking-widest px-2.5 py-1 rounded-pill font-medium select-none";

  const variants = {
    outline: "border border-glass-bd text-mint-200 bg-glass-bg/40 backdrop-blur-md",
    solid: "bg-green-800 text-mint-200 border border-green-700/60",
    yellow: "bg-yellow-400 text-ink-900 font-bold",
  };

  return (
    <span className={twMerge(clsx(base, variants[variant], className))}>
      {children}
    </span>
  );
};
