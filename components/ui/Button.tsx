import React from "react";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "solid-green"
    | "solid-white"
    | "secondary"
    | "store"
    | "round-outline"
    | "solid-yellow"
    | "glass"
    | "white-pill-arrow";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
  storeLabel?: string;
  storeTitle?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "solid-green",
  size = "md",
  href,
  isExternal = false,
  className,
  storeLabel,
  storeTitle,
  icon,
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex flex-row items-center justify-center font-heading transition-all duration-200 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7CF0A8] disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap";

  const sizeStyles = {
    sm: "text-[14px] px-4 py-2 gap-1.5 rounded-full",
    md: "text-[17px] px-6 py-3 gap-2 rounded-full font-medium leading-none",
    lg: "text-[17px] px-8 py-3.5 gap-2.5 rounded-full font-medium leading-none",
  };

  const variantStyles = {
    "solid-green":
      "bg-[#2FCB6E] text-[#020605] hover:bg-[#34db77] active:scale-[0.98] font-medium shadow-[0_4px_16px_rgba(47,203,110,0.25)] rounded-full",
    "solid-white":
      "bg-[#F5F5F7] text-[#020605] hover:bg-white active:scale-[0.98] font-medium rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.3)]",
    secondary:
      "bg-transparent text-[#2FCB6E] hover:text-[#7CF0A8] p-0 font-medium hover:underline gap-1",
    store:
      "bg-[#080E0C]/80 hover:bg-[#101A16] text-[#F5F5F7] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.18)] active:scale-[0.98] rounded-full px-5 py-2.5 text-left gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.4)]",
    "round-outline":
      "w-10 h-10 rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.25)] text-[#F5F5F7] active:scale-95 p-0",
    "solid-yellow":
      "bg-[var(--yellow-400)] text-[#020605] hover:brightness-105 active:scale-[0.98] font-medium rounded-full",
    glass:
      "bg-[rgba(255,255,255,0.04)] text-[#F5F5F7] border border-[rgba(255,255,255,0.08)] backdrop-blur-md hover:bg-[rgba(255,255,255,0.08)] active:scale-[0.98] rounded-full",
    "white-pill-arrow":
      "bg-[#F5F5F7] text-[#020605] hover:bg-white active:scale-[0.98] group rounded-full font-medium",
  };

  const combinedClasses = twMerge(
    clsx(
      baseStyles,
      variant === "round-outline" ? "w-10 h-10 rounded-full p-0" : sizeStyles[size],
      variantStyles[variant],
      className
    )
  );

  let innerContent: React.ReactNode = null;

  if (variant === "store") {
    innerContent = (
      <>
        {icon && <span className="shrink-0 text-[#2FCB6E]">{icon}</span>}
        <div className="flex flex-col leading-tight">
          {storeLabel && (
            <span className="text-[11px] text-[#86868B] tracking-tight font-sans font-normal">
              {storeLabel}
            </span>
          )}
          <span className="text-[14px] font-semibold text-[#F5F5F7] tracking-tight">
            {storeTitle || children}
          </span>
        </div>
      </>
    );
  } else if (variant === "secondary") {
    innerContent = (
      <>
        {children && <span>{children}</span>}
        <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </>
    );
  } else {
    innerContent = (
      <span className="inline-flex flex-row items-center justify-center gap-2 whitespace-nowrap">
        {children}
        {icon && <span className="shrink-0">{icon}</span>}
        {variant === "white-pill-arrow" && (
          <span className="w-5 h-5 rounded-full bg-[#020605] text-[#F5F5F7] inline-flex items-center justify-center ml-1 transition-transform duration-200 group-hover:translate-x-0.5">
            <ArrowRight className="w-3 h-3" />
          </span>
        )}
      </span>
    );
  }

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {innerContent}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {innerContent}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {innerContent}
    </button>
  );
};
