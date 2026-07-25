"use client";

import { useEffect, useRef } from "react";
import { X, CheckCircle2, Layers, Clock, AlertTriangle, Trophy } from "lucide-react";
import { gsap, EASE } from "@/lib/gsap";
import { PinnedProjectItem } from "@/types";
import { Tag } from "@/components/ui/tag";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { ProjectPreview } from "./ProjectPreview";
import { ProjectButtons } from "./ProjectButtons";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

export interface ProjectModalProps {
  project: PinnedProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (containerRef.current && cardRef.current) {
      if (prefersReducedMotion) {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.25, ease: EASE.smooth }
        );
      } else {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.35, ease: EASE.smooth }
        );
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, scale: 0.96, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: EASE.expo }
        );
      }
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, prefersReducedMotion]);

  const handleClose = () => {
    if (!containerRef.current) {
      onClose();
      return;
    }

    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: EASE.smooth,
      onComplete: onClose,
    });
  };

  if (!project) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-background/85 backdrop-blur-lg overflow-hidden"
    >
      {/* Backdrop area click */}
      <div className="absolute inset-0 cursor-pointer" onClick={handleClose} aria-hidden="true" />

      {/* Presentation Modal Card Container */}
      <div
        ref={cardRef}
        className={cn(
          "relative w-full max-w-[1140px] h-[94dvh] max-h-[900px]",
          "bg-surface border border-border/80 shadow-2xl rounded-2xl sm:rounded-3xl",
          "flex flex-col overflow-hidden z-10"
        )}
      >
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-3.5 sm:py-5 border-b border-border/50 bg-surface/90 backdrop-blur-md shrink-0 z-20">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Tag variant="primary" size="sm">
              {project.category}
            </Tag>
            <span className="text-overline text-emerald-400 font-mono flex items-center gap-1.5 text-[0.65rem] sm:text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              LIVE SYSTEM PREVIEW
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="rounded-full hover:bg-foreground/10 text-foreground/70 hover:text-foreground"
            aria-label="Close presentation"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-12 space-y-8 sm:space-y-12 text-foreground scrollbar-thin">
          {/* Header Title & Tagline */}
          <div className="space-y-2 sm:space-y-3 max-w-3xl">
            <Heading level="h1" className="text-h3 sm:text-h2 md:text-h1 tracking-tight text-foreground">
              {project.title}
            </Heading>
            <p className="text-body-md sm:text-body-lg text-primary font-medium leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Desktop & Mobile Dual Device Previews */}
          <div className="rounded-2xl border border-border/60 bg-background/50 overflow-hidden shadow-inner">
            <ProjectPreview project={project} isModal />
          </div>

          {/* Overview & Engineering Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-border/40">
            {/* Overview */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-overline text-primary font-semibold tracking-wider">
                <Layers size={16} />
                <span>PROJECT OVERVIEW</span>
              </div>
              <p className="text-body-md text-foreground/80 leading-relaxed">
                {project.overview}
              </p>
            </div>

            {/* Timeline & Delivery */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-overline text-accent font-semibold tracking-wider">
                <Clock size={16} />
                <span>TIMELINE & DISCOVERY</span>
              </div>
              <p className="text-body-md text-foreground/80 leading-relaxed">
                {project.timeline}
              </p>
            </div>
          </div>

          {/* Challenges & Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-border/40">
            {/* Engineering Challenges */}
            <div className="p-6 rounded-2xl bg-surface-elevated/60 border border-border/60 space-y-3">
              <div className="flex items-center gap-2 text-overline text-yellow-400 font-semibold tracking-wider">
                <AlertTriangle size={16} />
                <span>ENGINEERING CHALLENGES</span>
              </div>
              <p className="text-body-md text-foreground/80 leading-relaxed">
                {project.challenges}
              </p>
            </div>

            {/* Business Results */}
            <div className="p-6 rounded-2xl bg-surface-elevated/60 border border-border/60 space-y-3">
              <div className="flex items-center gap-2 text-overline text-emerald-400 font-semibold tracking-wider">
                <Trophy size={16} />
                <span>MEASURABLE RESULTS</span>
              </div>
              <p className="text-body-md text-foreground/80 leading-relaxed">
                {project.results}
              </p>
            </div>
          </div>

          {/* Tech Stack Badges */}
          <div className="pt-6 border-t border-border/40 space-y-4">
            <span className="text-overline text-foreground/50 block">TECHNOLOGY USED</span>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Tag key={tech} variant="outline" size="sm" className="bg-surface-elevated/40">
                  {tech}
                </Tag>
              ))}
            </div>
          </div>

          {/* Action Buttons Footer */}
          <div className="flex items-center justify-between pt-6 border-t border-border/40">
            <div className="hidden sm:flex items-center gap-2 text-body-sm text-foreground/60">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>Production system deployment verified by WebCore Studios.</span>
            </div>

            <ProjectButtons
              variant="modal"
              onBack={handleClose}
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
