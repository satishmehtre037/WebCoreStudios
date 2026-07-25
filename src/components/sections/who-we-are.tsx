"use client";

import { useRef } from "react";
import { Container, Section, Heading } from "@/components/ui";
import { PinnedSection } from "@/components/layout";
import { useScrollReveal } from "@/hooks";
import { cn } from "@/lib/utils";

export function WhoWeAre() {
  const contentRef = useScrollReveal<HTMLDivElement>({
    type: "text",
    stagger: 0.1,
    start: "top 75%",
  });

  return (
    <PinnedSection pinDuration="+=100%" className="bg-surface text-foreground">
      <Section id="about" spacing="none" className="h-full flex items-center py-16 md:py-0">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 relative">
            
            {/* Visual Accent: Architectural Line */}
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-white/20 overflow-hidden">
              {/* Animated fill line */}
              <div 
                className="w-full bg-accent absolute top-0 left-0"
                style={{ height: "100%", transformOrigin: "top", animation: "drawDown 2s ease-out forwards" }}
              />
            </div>

            <div 
              ref={contentRef} 
              className="col-span-1 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3"
            >
              {/* Punchy Statement */}
              <Heading level="h2" className="mb-6 sm:mb-10 text-foreground">
                <span className="line sm:block inline-block mr-1.5">We engineer software</span>
                <span className="line sm:block inline-block">systems, not websites.</span>
              </Heading>

              {/* Thesis Paragraph */}
              <div className="text-body-md sm:text-body-lg lg:text-h5 font-medium text-foreground/90 leading-relaxed mb-8 sm:mb-12">
                <span className="line sm:block inline-block mr-1.5">WebCore builds reusable, proven software</span>
                <span className="line sm:block inline-block mr-1.5">engines and configures them per client.</span>
                <span className="line sm:block inline-block mr-1.5">We don&apos;t start from a blank page; we start</span>
                <span className="line sm:block inline-block">from a powerful operating system.</span>
              </div>

              {/* Transition Line */}
              <div className="text-body-sm sm:text-body-md uppercase tracking-widest text-foreground-secondary font-semibold">
                <span className="line block">Welcome to the studio.</span>
              </div>
            </div>

          </div>
        </Container>
      </Section>
    </PinnedSection>
  );
}
