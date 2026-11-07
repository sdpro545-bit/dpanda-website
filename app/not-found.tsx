import React from "react";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-6 text-center space-y-6">
      <ScrollReveal className="flex flex-col items-center space-y-6">
        <Eyebrow>404 Not Found</Eyebrow>

        <div className="relative w-48 h-56 my-2">
          <Image
            src="/assets/3d/panda-phone.webp"
            alt="404 Panda Mascot"
            fill
            priority
            className="object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.6)]"
          />
        </div>

        <div className="space-y-2 max-w-md">
          <h1 className="text-3xl md:text-4xl font-heading font-semibold text-[#F5F5F7] tracking-tight">
            Page Not Found
          </h1>
          <p className="text-[#86868B] font-body text-[17px] leading-[1.47]">
            The page or rate sheet you are looking for does not exist or has been relocated.
          </p>
        </div>

        <div className="pt-2">
          <Button href="/" variant="solid-green" size="md">
            Back to Home Rates
          </Button>
        </div>
      </ScrollReveal>
    </div>
  );
}
