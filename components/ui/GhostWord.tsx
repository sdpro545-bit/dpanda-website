import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface GhostWordProps {
  text: string;
  className?: string;
  opacity?: number;
}

export const GhostWord: React.FC<GhostWordProps> = ({
  text,
  className,
  opacity = 0.07,
}) => {
  return (
    <div
      aria-hidden="true"
      style={{ opacity }}
      className={twMerge(
        clsx(
          "pointer-events-none select-none font-heading font-extrabold tracking-[-0.05em] uppercase text-white whitespace-nowrap text-[clamp(5rem,18vw,18rem)] leading-none",
          className
        )
      )}
    >
      {text}
    </div>
  );
};
