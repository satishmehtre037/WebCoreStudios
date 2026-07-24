"use client";

import { useEffect, useRef } from "react";
import { X, ArrowRight, CheckCircle2, Layers, Cpu, TrendingUp } from "lucide-react";
import { gsap, EASE } from "@/lib/gsap";
import { CaseStudyItem } from "@/types";
import { Tag } from "@/components/ui/tag";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

export interface CaseStudyModalProps {
  study: CaseStudyItem | null;
  originRect: DOMRect | null;
  onClose: () => void;
}

export function CaseStudyModal({ study, originRect, onClose }: CaseStudyModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardMorphRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!study) return;

    // Handle Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Lock scroll smoothly
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Perform shared element GSAP morph transition
    if (containerRef.current && cardMorphRef.current && contentRef.current) {
      if (prefersReducedMotion) {
        // Reduced motion fallback: Simple fade in
        gsap.fromTo(
          containerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: EASE.smooth }
        );
        gsap.fromTo(
          cardMorphRef.current,
          { opacity: 0, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 0.3, ease: EASE.smooth }
        );
      } else if (originRect) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Target target rect for expanded view inside modal
        const targetWidth = Math.min(viewportWidth - 32, 1100);
        const targetHeight = Math.min(viewportHeight - 48, 850);
        const targetLeft = (viewportWidth - targetWidth) / 2;
        const targetTop = (viewportHeight - targetHeight) / 2;

        // Calculate delta scales and offsets
        const scaleX = originRect.width / targetWidth;
        const scaleY = originRect.height / targetHeight;
        const translateX = originRect.left - targetLeft;
        const translateY = originRect.top - targetTop;

        const tl = gsap.timeline({ defaults: { ease: EASE.smooth, duration: 0.65 } });

        // Fade backdrop in
        tl.fromTo(
          containerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          0
        );

        // Morph card element from original card position & size to target modal rect
        tl.fromTo(
          cardMorphRef.current,
          {
            x: translateX,
            y: translateY,
            scaleX: scaleX,
            scaleY: scaleY,
            borderRadius: "1.5rem",
            transformOrigin: "top left",
          },
          {
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            borderRadius: "1.5rem",
          },
          0
        );

        // Fade & slide in inner content
        tl.fromTo(
          contentRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.45, ease: EASE.expo },
          0.2
        );
      }
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [study, originRect, prefersReducedMotion]);

  const handleClose = () => {
    if (!containerRef.current || !cardMorphRef.current || !contentRef.current) {
      onClose();
      return;
    }

    if (prefersReducedMotion) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: EASE.smooth,
        onComplete: onClose,
      });
      return;
    }

    if (originRect) {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const targetWidth = Math.min(viewportWidth - 32, 1100);
      const targetHeight = Math.min(viewportHeight - 48, 850);
      const targetLeft = (viewportWidth - targetWidth) / 2;
      const targetTop = (viewportHeight - targetHeight) / 2;

      const scaleX = originRect.width / targetWidth;
      const scaleY = originRect.height / targetHeight;
      const translateX = originRect.left - targetLeft;
      const translateY = originRect.top - targetTop;

      const tl = gsap.timeline({
        onComplete: onClose,
        defaults: { ease: EASE.smoothInOut, duration: 0.5 },
      });

      tl.to(contentRef.current, { opacity: 0, y: 10, duration: 0.2 }, 0);
      tl.to(
        cardMorphRef.current,
        {
          x: translateX,
          y: translateY,
          scaleX: scaleX,
          scaleY: scaleY,
          borderRadius: "1.5rem",
        },
        0
      );
      tl.to(containerRef.current, { opacity: 0, duration: 0.35 }, 0.15);
    } else {
      onClose();
    }
  };

  if (!study) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-background/80 backdrop-blur-md overflow-hidden"
    >
      {/* Backdrop click area */}
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Morphing Expanded Card Container */}
      <div
        ref={cardMorphRef}
        className={cn(
          "relative w-full max-w-[1100px] h-[85vh] max-h-[850px]",
          "bg-surface border border-border shadow-2xl rounded-3xl",
          "flex flex-col overflow-hidden z-10"
        )}
      >
        {/* Top Sticky Bar with Category & Close Action */}
        <div className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-border/50 bg-surface/80 backdrop-blur-md shrink-0 z-20">
          <div className="flex items-center gap-3">
            <Tag variant="primary" size="sm">
              {study.category}
            </Tag>
            {study.year && (
              <span className="text-overline text-foreground/40">{study.year}</span>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="rounded-full hover:bg-foreground/10 text-foreground/70 hover:text-foreground transition-colors"
            aria-label="Close Case Study"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Scrollable Expanded Case Study Body */}
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto p-6 md:p-12 space-y-12 text-foreground scrollbar-thin"
        >
          {/* Header & Tagline */}
          <div className="space-y-4 max-w-3xl">
            <Heading level="h1" className="text-h1 tracking-tight text-foreground">
              {study.client}
            </Heading>
            <p className="text-body-lg text-primary/90 font-medium leading-relaxed">
              {study.tagline}
            </p>
          </div>

          {/* Key Metrics Grid */}
          {study.metrics && study.metrics.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 p-6 rounded-2xl bg-surface-elevated/60 border border-border/60">
              {study.metrics.map((metric, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <span className="text-overline text-foreground/50">{metric.label}</span>
                  <span className="text-h2 text-primary font-bold tracking-tight">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* 3 Beats: Problem, Build, Outcome */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 pt-4 border-t border-border/40">
            {/* The Problem */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-foreground/60 text-overline font-semibold tracking-wider">
                <Layers size={16} className="text-accent" />
                <span>01 / The Challenge</span>
              </div>
              <Heading level="h4" className="text-h4 text-foreground">
                The Problem
              </Heading>
              <p className="text-body-md text-foreground/80 leading-relaxed">
                {study.problem}
              </p>
            </div>

            {/* The Build */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-foreground/60 text-overline font-semibold tracking-wider">
                <Cpu size={16} className="text-primary" />
                <span>02 / Engineering</span>
              </div>
              <Heading level="h4" className="text-h4 text-foreground">
                The Build
              </Heading>
              <p className="text-body-md text-foreground/80 leading-relaxed">
                {study.build}
              </p>
            </div>

            {/* The Outcome */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-foreground/60 text-overline font-semibold tracking-wider">
                <TrendingUp size={16} className="text-emerald-400" />
                <span>03 / Impact</span>
              </div>
              <Heading level="h4" className="text-h4 text-foreground">
                The Outcome
              </Heading>
              <p className="text-body-md text-foreground/80 leading-relaxed">
                {study.outcome}
              </p>
            </div>
          </div>

          {/* Tech Stack Tags */}
          <div className="pt-6 border-t border-border/40 space-y-4">
            <span className="text-overline text-foreground/50 block">Technologies & Systems Built</span>
            <div className="flex flex-wrap gap-2">
              {study.tags.map((tag) => (
                <Tag key={tag} variant="outline" size="sm" className="bg-surface-elevated/40">
                  {tag}
                </Tag>
              ))}
            </div>
          </div>

          {/* Visual Showcase Box */}
          <div className="relative h-64 md:h-96 rounded-2xl border border-border/50 overflow-hidden bg-background/60 flex items-center justify-center">
            {study.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={study.image}
                alt={`${study.client} showcase`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="relative w-full h-full p-8 flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-70 pointer-events-none" />
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-overline text-foreground/60">System Operational</span>
                  </div>
                  <span className="text-overline text-foreground/40">{study.client}</span>
                </div>
                <div className="z-10 max-w-lg space-y-2">
                  <Heading level="h3" className="text-h3 text-foreground">
                    Engineered to scale seamlessly.
                  </Heading>
                  <p className="text-body-sm text-foreground/70">
                    Production architecture optimized for low-latency client rendering and high availability.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Call to Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border/40">
            <div className="flex items-center gap-2 text-body-sm text-foreground/60">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>Full case study verified by WebCore Studios engineering audit.</span>
            </div>
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              onClick={handleClose}
            >
              <span>Back to Showcase</span>
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
