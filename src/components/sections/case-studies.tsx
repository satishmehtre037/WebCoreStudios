"use client";

import { useState, useRef } from "react";
import { CASE_STUDIES_DATA } from "@/config/site";
import { Section, Container, Heading, Card, Tag } from "@/components/ui";
import { HorizontalScroll } from "@/components/layout";
import { useScrollReveal } from "@/hooks";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useUIStore } from "@/store";
import { CaseStudyItem } from "@/types";
import { CaseStudyModal } from "./case-study-modal";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function CaseStudies() {
  const { setCursorVariant } = useUIStore();
  const prefersReducedMotion = usePrefersReducedMotion();

  // State for active expanded case study modal
  const [selectedStudy, setSelectedStudy] = useState<CaseStudyItem | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);

  // Card element refs for capturing bounding rects
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Scroll reveal for cards
  const verticalStackRef = useScrollReveal<HTMLDivElement>({
    type: "fade",
    stagger: 0.15,
    start: "top 80%",
  });

  const handleCardClick = (study: CaseStudyItem, id: string) => {
    const cardEl = cardRefs.current.get(id);
    if (cardEl) {
      const rect = cardEl.getBoundingClientRect();
      setOriginRect(rect);
    }
    setSelectedStudy(study);
  };

  const handleCloseModal = () => {
    setSelectedStudy(null);
    setOriginRect(null);
  };

  const renderCaseStudyCards = () => {
    return CASE_STUDIES_DATA.map((rawStudy) => {
      const study = rawStudy as unknown as CaseStudyItem;
      return (
        <Card
          key={study.id}
          ref={(el) => {
            if (el) cardRefs.current.set(study.id, el);
            else cardRefs.current.delete(study.id);
          }}
          variant="elevated"
          onClick={() => handleCardClick(study as CaseStudyItem, study.id)}
          className={cn(
            "case-study-card group flex flex-col justify-between flex-shrink-0 overflow-hidden",
            "cursor-pointer rounded-3xl border border-border/80 bg-surface/90 hover:border-primary/50 transition-all duration-500",
            "p-8 md:p-10 select-none relative",
            prefersReducedMotion
              ? "w-full min-h-[420px]"
              : "w-[85vw] max-w-[620px] md:max-w-[700px] h-[550px]"
          )}
          onMouseEnter={() => setCursorVariant("pointer")}
          onMouseLeave={() => setCursorVariant("default")}
        >
          {/* Background Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* Card Top: Category Tag, Year, and Expand Icon */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <Tag variant="primary" size="sm">
                {study.category}
              </Tag>
              {"year" in study && study.year && (
                <span className="text-overline text-foreground/40">{study.year}</span>
              )}
            </div>

            <div className="w-10 h-10 rounded-full bg-surface-elevated border border-border/60 flex items-center justify-center text-foreground/60 group-hover:text-primary group-hover:border-primary/40 group-hover:scale-110 transition-all duration-300">
              <ArrowUpRight size={18} />
            </div>
          </div>

          {/* Card Middle: Title & Tagline / One-liner */}
          <div className="z-10 my-auto space-y-3">
            <Heading
              level="h3"
              className="text-h3 md:text-h2 tracking-tight text-foreground group-hover:text-primary transition-colors duration-300"
            >
              {study.client}
            </Heading>
            <p className="text-body-md text-foreground/80 line-clamp-3 leading-relaxed">
              {study.tagline || study.problem}
            </p>
          </div>

          {/* Card Bottom: Quick Preview Metrics or Tech Tags */}
          <div className="z-10 pt-6 border-t border-border/40 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              {study.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-overline text-foreground/50 bg-background/50 px-2.5 py-1 rounded-md border border-border/30"
                >
                  {tag}
                </span>
              ))}
              {study.tags.length > 3 && (
                <span className="text-overline text-foreground/40">
                  +{study.tags.length - 3} more
                </span>
              )}
            </div>
            <span className="text-body-sm font-semibold text-primary group-hover:translate-x-1 transition-transform duration-300">
              View Study &rarr;
            </span>
          </div>
        </Card>
      );
    });
  };

  return (
    <Section id="work" spacing="none" className="bg-surface text-foreground relative z-10">
      {/* Intro Header */}
      <Container className="pt-24 md:pt-32 pb-8 md:pb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Heading level="h2" className="mb-4">
              Case Studies & Showcase.
            </Heading>
            <p className="text-body-lg text-foreground-secondary max-w-2xl">
              Real software systems engineered for ambitious teams. Tap any project to explore the complete architecture and metrics.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 text-overline text-foreground/40">
            <span>Scroll or drag horizontally</span>
            <div className="w-12 h-px bg-border" />
          </div>
        </div>
      </Container>

      {/* Case Studies Showcase */}
      {prefersReducedMotion ? (
        <Container>
          <div ref={verticalStackRef} className="flex flex-col gap-8 pb-24 md:pb-32">
            {renderCaseStudyCards()}
          </div>
        </Container>
      ) : (
        <HorizontalScroll speed={1} className="bg-surface">
          <div className="flex gap-6 md:gap-8 px-6 md:px-12 h-full items-center">
            {renderCaseStudyCards()}
            {/* End spacer */}
            <div className="w-[10vw] flex-shrink-0" />
          </div>
        </HorizontalScroll>
      )}

      {/* Shared Element Case Study Modal */}
      <CaseStudyModal
        study={selectedStudy}
        originRect={originRect}
        onClose={handleCloseModal}
      />
    </Section>
  );
}
