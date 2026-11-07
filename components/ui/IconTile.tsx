import React from "react";
import Image from "next/image";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface IconTileProps {
  src?: string | null;
  alt?: string;
  fallbackText?: string;
  size?: number; // size in px, defaults to 72
  className?: string;
}

export const IconTile: React.FC<IconTileProps> = ({
  src,
  alt = "",
  fallbackText,
  size = 72,
  className,
}) => {
  return (
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className={twMerge(
        clsx(
          "relative rounded-[18px] bg-gradient-to-b from-[#0B1210] to-[#030706] border border-[#7CF0A8]/30 shadow-[0_12px_24px_rgba(0,0,0,0.7),0_0_12px_rgba(124,240,168,0.08)] flex items-center justify-center overflow-hidden shrink-0 select-none",
          className
        )
      )}
    >
      {/* Top bevel highlight */}
      <div className="absolute inset-x-2 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

      {src ? (
        <div className="relative w-[75%] h-[75%] flex items-center justify-center">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="120px"
            className="object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
          />
        </div>
      ) : fallbackText ? (
        <span className="font-heading font-black text-sm text-[var(--mint-200)] tracking-tight uppercase">
          {fallbackText.slice(0, 4)}
        </span>
      ) : (
        <div className="w-6 h-6 rounded-lg bg-[var(--green-500)]/20 border border-[var(--green-400)]/30" />
      )}
    </div>
  );
};
