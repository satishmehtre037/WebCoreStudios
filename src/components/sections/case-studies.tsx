"use client";

import { CASE_STUDIES_DATA } from "@/config/site";
import { Section, Container, Heading, Card, Tag } from "@/components/ui";
import { HorizontalScroll } from "@/components/layout";
import { useScrollReveal } from "@/hooks";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useUIStore } from "@/store";
import { cn } from "@/lib/utils";

export function CaseStudies() {
  const { setCursorVariant } = useUIStore();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Reveal for the vertical stack fallback
  const verticalStackRef = useScrollReveal<HTMLDivElement>({
    type: "fade",
    stagger: 0.1,
    start: "top 80%",
  });

  const renderCaseStudyCards = () => {
    return CASE_STUDIES_DATA.map((study) => {
      return (
        <Card
          key={study.id}
          variant="elevated"
          className={cn(
            "case-study-card flex flex-col lg:flex-row group flex-shrink-0 overflow-hidden",
            "cursor-none rounded-3xl",
            // Width/height variations
            prefersReducedMotion ? "w-full min-h-[500px]" : "w-[85vw] max-w-[1200px] h-[75vh] min-h-[500px]"
          )}
          onMouseEnter={() => setCursorVariant("media")}
          onMouseLeave={() => setCursorVariant("default")}
        >
          {/* Content Area */}
          <div className="flex flex-col flex-1 p-8 md:p-12 z-10 bg-surface/50 justify-center">
            <div className="mb-8">
              <Tag variant="primary" size="sm" className="mb-4">
                {study.category}
              </Tag>
              <Heading level="h3" className="tracking-tight text-foreground">
                {study.client}
              </Heading>
            </div>

            {/* The 3 Beats (Problem, Build, Outcome) - Staged via CSS delays or GSAP in future, but simple layout for now */}
            <div className="flex flex-col gap-6 md:gap-8 mt-4">
              <div className="reveal-beat">
                <span className="text-overline text-foreground/40 block mb-2">The Problem</span>
                <p className="text-body-md text-foreground/80 leading-relaxed">
                  {study.problem}
                </p>
              </div>
              
              <div className="reveal-beat">
                <span className="text-overline text-foreground/40 block mb-2">The Build</span>
                <p className="text-body-md text-foreground/80 leading-relaxed">
                  {study.build}
                </p>
              </div>

              <div className="reveal-beat">
                <span className="text-overline text-foreground/40 block mb-2">The Outcome</span>
                <p className="text-body-md text-foreground/80 leading-relaxed">
                  {study.outcome}
                </p>
              </div>
            </div>
          </div>
          
          {/* Visual Area (Mockup/Placeholder) */}
          <div className="flex-1 relative bg-background/50 border-t lg:border-t-0 lg:border-l border-border/50 overflow-hidden min-h-[300px] lg:min-h-full">
            {study.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={study.image} 
                alt={`${study.client} project mockup`} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            ) : (
              // Sleek Placeholder
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="w-full h-full max-w-md bg-surface border border-border/50 rounded-2xl shadow-2xl relative overflow-hidden flex flex-col transition-transform duration-1000 group-hover:scale-105 group-hover:shadow-glow">
                  {/* Fake Browser Chrome */}
                  <div className="h-10 border-b border-border/50 bg-background/50 flex items-center px-4 gap-2 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-border/50" />
                    <div className="w-3 h-3 rounded-full bg-border/50" />
                    <div className="w-3 h-3 rounded-full bg-border/50" />
                  </div>
                  {/* Fake Content Lines */}
                  <div className="flex-1 p-6 flex flex-col gap-4 opacity-20">
                    <div className="w-3/4 h-8 rounded-lg bg-foreground/20" />
                    <div className="w-full h-4 rounded bg-foreground/10" />
                    <div className="w-5/6 h-4 rounded bg-foreground/10" />
                    <div className="w-full h-32 rounded-xl bg-foreground/10 mt-4" />
                  </div>
                  {/* Overlay Glow */}
                  <div className="absolute inset-0 bg-radial-glow from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </div>
              </div>
            )}
          </div>
        </Card>
      );
    });
  };

  return (
    <Section spacing="none" className="bg-surface text-foreground relative z-10">
      
      {/* Intro Header */}
      <Container className="pt-24 md:pt-32 pb-8 md:pb-16">
        <Heading level="h2" className="mb-4">
          Case Studies.
        </Heading>
        <p className="text-body-lg text-foreground-secondary max-w-2xl">
          Real products built for real businesses. The philosophy in motion.
        </p>
      </Container>

      {/* Case Studies Showcase */}
      {prefersReducedMotion ? (
        <Container>
          <div ref={verticalStackRef} className="flex flex-col gap-16 pb-24 md:pb-32">
            {renderCaseStudyCards()}
          </div>
        </Container>
      ) : (
        <HorizontalScroll speed={1} className="bg-surface">
          <div className="flex gap-6 md:gap-12 px-6 md:px-12 h-full items-center">
            {renderCaseStudyCards()}
            {/* Spacer at the end so the last card doesn't stick to the edge */}
            <div className="w-[10vw] flex-shrink-0" />
          </div>
        </HorizontalScroll>
      )}

    </Section>
  );
}
