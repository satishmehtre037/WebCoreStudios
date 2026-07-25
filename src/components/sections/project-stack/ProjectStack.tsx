"use client";

import { useRef, useState } from "react";
import { PINNED_PROJECTS_DATA } from "@/config/site";
import { PinnedProjectItem } from "@/types";
import { Section, Container, Heading } from "@/components/ui";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { ScrollTimeline } from "./ScrollTimeline";
import { useUIStore } from "@/store";

export function ProjectStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { setCursorVariant } = useUIStore();

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedModalProject, setSelectedModalProject] = useState<PinnedProjectItem | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion || !containerRef.current || !cardsWrapperRef.current) return;
    if (window.innerWidth < 768) return; // Allow natural scrolling on mobile

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    const totalProjects = cards.length;

    const ctx = gsap.context(() => {
      // Create ScrollTrigger pin for the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          end: `+=${totalProjects * 100}%`,
          scrub: 0.8, // Calm, smooth scroll scrub with zero bounce
          onUpdate: (self) => {
            const idx = Math.min(
              Math.floor(self.progress * totalProjects),
              totalProjects - 1
            );
            setActiveIndex(idx);
          },
        },
      });

      // Animate card stacking sequence
      cards.forEach((card, index) => {
        if (index === 0) {
          // First card starts in view
          gsap.set(card, { yPercent: 0, opacity: 1, scale: 1 });
          return;
        }

        // Set initial state for subsequent cards off-screen below
        gsap.set(card, {
          yPercent: 110,
          opacity: 0.9,
          scale: 0.96 + index * 0.01,
        });

        // Slide current card upward over previous card while leaving previous card partially visible
        tl.to(card, {
          yPercent: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "none",
        });

        // Scale down & slightly dim previous card beneath
        const prevCard = cards[index - 1];
        if (prevCard) {
          tl.to(
            prevCard,
            {
              scale: 0.95,
              opacity: 0.5,
              duration: 1,
              ease: "none",
            },
            "<"
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleOpenLiveWebsite = (project: PinnedProjectItem) => {
    setSelectedModalProject(project);
  };

  const handleViewCaseStudy = (project: PinnedProjectItem) => {
    const workSection = document.getElementById("work");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Section
      id="products-stack"
      spacing="none"
      className="bg-background text-foreground relative z-20 overflow-hidden"
    >
      <div ref={containerRef} className="w-full min-h-[auto] md:min-h-screen flex flex-col justify-between py-12 md:py-16">
        {/* Section Header */}
        <Container className="shrink-0 z-30">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 pb-6 border-b border-border/40">
            <div>
              <Heading level="h2" className="mb-2">
                Flagship Operating Engines.
              </Heading>
              <p className="text-body-md sm:text-body-lg text-foreground-secondary max-w-2xl">
                Stacked software products built for scale, speed, and immediate operational impact.
              </p>
            </div>

            {/* Scroll Progress Timeline */}
            <ScrollTimeline
              total={PINNED_PROJECTS_DATA.length}
              activeIndex={activeIndex}
              className="shrink-0 hidden md:flex"
            />
          </div>
        </Container>

        {/* Stacked Floating Cards Container */}
        <Container className="flex-1 relative flex items-center justify-center my-auto py-6 md:py-8">
          <div
            ref={cardsWrapperRef}
            className="relative w-full max-w-[1240px] flex flex-col md:block h-auto md:h-[620px] gap-6 md:gap-0"
          >
            {PINNED_PROJECTS_DATA.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="relative md:absolute inset-0 w-full h-auto md:h-full flex items-center justify-center"
                onMouseEnter={() => setCursorVariant("card")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <ProjectCard
                  project={project as unknown as PinnedProjectItem}
                  index={index}
                  onViewCaseStudy={() => handleViewCaseStudy(project as unknown as PinnedProjectItem)}
                  onOpenLiveWebsite={() => handleOpenLiveWebsite(project as unknown as PinnedProjectItem)}
                />
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Expanded Project Presentation Modal */}
      <ProjectModal
        project={selectedModalProject}
        onClose={() => setSelectedModalProject(null)}
      />
    </Section>
  );
}
