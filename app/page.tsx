import React from "react";
import { FloatingLayer } from "@/components/ui/FloatingLayer";
import { IntroBlock } from "@/components/home/IntroBlock";
import { Carousel3D } from "@/components/home/Carousel3D";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { BeamSection } from "@/components/home/BeamSection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#020605] via-[#010403] to-[#000000] overflow-hidden text-[#F5F5F7]">
      {/* Background Floating Layer: 3 depth layers, light shafts, particle canvas, mouse parallax */}
      <FloatingLayer />

      {/* Main Content Column (Max-width 980px) */}
      <div className="relative z-10 max-w-[980px] mx-auto flex flex-col gap-10 sm:gap-20 md:gap-32">
        {/* Reference Part B: Intro Block with Apple Typography */}
        <ScrollReveal delay={100}>
          <IntroBlock />
        </ScrollReveal>

        {/* Reference Part C: 3D Arc Carousel Centrepiece Calculator with Autoplay & Progress Bar */}
        <ScrollReveal delay={200}>
          <Carousel3D />
        </ScrollReveal>

        {/* What Our Clients Says about dPanda: Auto-switching Verified Testimonials */}
        <ScrollReveal delay={250}>
          <TestimonialsSection />
        </ScrollReveal>
      </div>

      {/* Reference Part D: Full Width Light-Beam Stage Section Reaching Seamlessly Down Into Footer */}
      <div className="relative z-10 w-full mt-4 sm:mt-8 md:mt-12">
        <ScrollReveal delay={150}>
          <BeamSection />
        </ScrollReveal>
      </div>
    </div>
  );
}
