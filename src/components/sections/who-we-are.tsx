"use client";

import { useRef } from "react";
import { Container, Section, Heading } from "@/components/ui";
import { PinnedSection } from "@/components/layout";
import { useScrollReveal } from "@/hooks";
import { cn } from "@/lib/utils";

export function WhoWeAre() {
  const contentRef = useScrollReveal<HTMLDivElement>({
    type: "text",
    stagger: 0.1, // Slower stagger for confident reading pace
    start: "top 60%", // Start animating when it hits middle of screen, right before/as it pins
  });

  return (
    <PinnedSection pinDuration="+=100%" className="bg-primary text-background">
      <Section id="about" spacing="none" className="h-full flex items-center">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 relative">
            
            {/* Visual Accent: Architectural Line */}
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-background/20 overflow-hidden">
              {/* Animated fill line */}
              <div 
                className="w-full bg-background absolute top-0 left-0 animate-draw-line"
                style={{ height: "100%", transformOrigin: "top", animation: "drawDown 2s ease-out forwards" }}
              />
            </div>

            <div 
              ref={contentRef} 
              className="col-span-1 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3"
            >
              {/* Punchy Statement */}
              <Heading level="h2" className="mb-10 text-background">
                <span className="line block">We engineer software</span>
                <span className="line block">systems, not websites.</span>
              </Heading>

              {/* Thesis Paragraph */}
              <div className="text-body-lg lg:text-h5 font-medium text-background/90 leading-relaxed mb-12 space-y-2">
                <span className="line block">WebCore builds reusable, proven software</span>
                <span className="line block">engines and configures them per client.</span>
                <span className="line block">We don&apos;t start from a blank page; we start</span>
                <span className="line block">from a powerful operating system.</span>
              </div>

              {/* Transition Line */}
              <div className="text-body-md uppercase tracking-widest text-background/60 font-semibold">
                <span className="line block">Welcome to the studio.</span>
              </div>
            </div>

          </div>
        </Container>
      </Section>
    </PinnedSection>
  );
}
