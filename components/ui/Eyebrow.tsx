import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export const Eyebrow: React.FC<EyebrowProps> = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        clsx(
          "inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[rgba(47,203,110,0.08)] border border-[rgba(47,203,110,0.2)] text-[#2FCB6E] text-[12px] font-semibold tracking-[0.08em] uppercase select-none",
          className
        )
      )}
    >
      {children}
    </div>
  );
};
