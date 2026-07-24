"use client";

import { useRef } from "react";
import { PROCESS_DATA } from "@/config/site";
import { Section, Container, Heading, Timeline } from "@/components/ui";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // GSAP Animation for drawing the line and revealing the items
  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion || !containerRef.current) {
      // If reduced motion, just make sure items are visible and line is drawn
      if (prefersReducedMotion && containerRef.current) {
        gsap.set(".timeline-item", { opacity: 1, y: 0 });
        if (lineRef.current) gsap.set(lineRef.current, { scaleY: 1 });
      }
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Draw the line down as user scrolls through the section
      if (lineRef.current) {
        gsap.to(lineRef.current, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom 75%",
            scrub: true,
          },
        });
      }

      // 2. Reveal each timeline item sequentially as it enters the viewport
      const items = gsap.utils.toArray<HTMLElement>(".timeline-item");
      items.forEach((item) => {
        gsap.to(item, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%", // Reveal slightly before it hits the bottom
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Convert PROCESS_DATA to match TimelineEntry
  const timelineEntries = PROCESS_DATA.map((process) => ({
    id: process.id,
    title: process.label,
    description: process.description,
  }));

  return (
    <Section 
      spacing="lg" 
      className="bg-background text-foreground relative z-10 border-t border-border/50"
    >
      <Container ref={containerRef}>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
          
          {/* Left Column: Sticky Header */}
          <div className="w-full lg:w-1/3">
            <div className="lg:sticky lg:top-32">
              <Heading level="h2" className="mb-4">
                Our Process.
              </Heading>
              <p className="text-body-lg text-foreground-secondary max-w-sm">
                A deterministic engineering workflow from first contact to launch. No guesswork.
              </p>
            </div>
          </div>

          {/* Right Column: Timeline */}
          <div className="w-full lg:w-2/3 mt-8 lg:mt-0">
            <Timeline 
              entries={timelineEntries} 
              variant="process" 
              lineRef={lineRef}
            />
          </div>

        </div>
      </Container>
    </Section>
  );
}
