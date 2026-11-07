import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "raised" | "subtle" | "interactive";
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = "default",
  className,
  ...props
}) => {
  const base =
    "relative rounded-[28px] border border-[rgba(255,255,255,0.06)] transition-all duration-300 backdrop-blur-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.45),0_1px_1px_rgba(255,255,255,0.05)_inset]";

  const variants = {
    default: "bg-[rgba(255,255,255,0.03)] text-[#F5F5F7]",
    raised: "bg-[rgba(255,255,255,0.045)] border-[rgba(255,255,255,0.08)] text-[#F5F5F7] shadow-[0_16px_40px_rgba(0,0,0,0.6)]",
    subtle: "bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.04)] text-[#F5F5F7]",
    interactive:
      "bg-[rgba(255,255,255,0.03)] text-[#F5F5F7] hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.12)] transition-colors cursor-pointer",
  };

  return (
    <div
      className={twMerge(clsx(base, variants[variant], className))}
      {...props}
    >
      {children}
    </div>
  );
};
