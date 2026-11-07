"use client";

import React, { useEffect, useState } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface OdometerNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const OdometerNumber: React.FC<OdometerNumberProps> = ({
  value,
  prefix = "",
  suffix = "",
  className,
}) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [prevValue, setPrevValue] = useState(value);

  useEffect(() => {
    if (value !== displayValue) {
      setPrevValue(displayValue);
      setDisplayValue(value);
    }
  }, [value, displayValue]);

  const formattedStr = Math.floor(value).toLocaleString();
  const digits = formattedStr.split("");

  return (
    <span
      className={twMerge(
        clsx("inline-flex items-center tabular-nums font-heading", className)
      )}
      aria-live="polite"
      aria-atomic="true"
    >
      {prefix && <span className="mr-0.5 select-none">{prefix}</span>}
      <span className="inline-flex overflow-hidden h-[1.15em] leading-[1.15em]">
        {digits.map((char, index) => {
          if (isNaN(Number(char))) {
            return (
              <span key={`sep-${index}`} className="inline-block">
                {char}
              </span>
            );
          }

          const digitNum = Number(char);
          return (
            <span
              key={`digit-${index}-${char}`}
              className="relative inline-block w-[0.62em] overflow-hidden text-center"
            >
              <span
                style={{
                  transform: `translateY(-${digitNum * 10}%)`,
                  transition: "transform 400ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
                className="inline-flex flex-col will-change-transform"
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <span key={n} className="h-[1.15em] flex items-center justify-center">
                    {n}
                  </span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
      {suffix && <span className="ml-0.5 select-none">{suffix}</span>}
    </span>
  );
};
