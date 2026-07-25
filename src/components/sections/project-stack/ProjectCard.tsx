"use client";

import { forwardRef } from "react";
import { PinnedProjectItem } from "@/types";
import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { Heading } from "@/components/ui/heading";
import { ProjectPreview } from "./ProjectPreview";
import { ProjectButtons } from "./ProjectButtons";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProjectCardProps {
  project: PinnedProjectItem;
  index: number;
  onViewCaseStudy?: () => void;
  onOpenLiveWebsite?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ project, index, onViewCaseStudy, onOpenLiveWebsite, className, style }, ref) => {
    return (
      <Card
        ref={ref}
        style={style}
        variant="elevated"
        className={cn(
          "group relative w-full rounded-2xl sm:rounded-3xl border border-border/80 bg-surface/95 overflow-hidden",
          "shadow-xl hover:shadow-glow hover:border-primary/40",
          "transition-all duration-500 ease-out hover:scale-[1.01]",
          "p-5 sm:p-8 md:p-10 flex flex-col lg:flex-row gap-6 lg:gap-12 items-stretch select-none",
          className
        )}
      >
        {/* Background Subtle Gradient & Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Left Column: Project Content & Features */}
        <div className="flex flex-col justify-between flex-1 space-y-4 sm:space-y-6 z-10">
          {/* Header Tag & Status */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3">
              <Tag variant="primary" size="sm">
                {project.category}
              </Tag>
              <span className="text-overline text-emerald-400 font-mono flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {project.status.toUpperCase()}
              </span>
            </div>

            {/* Product Title */}
            <Heading level="h2" className="text-h3 sm:text-h2 md:text-h1 tracking-tight text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </Heading>

            {/* Short Description */}
            <p className="text-body-sm sm:text-body-md text-foreground/80 leading-relaxed max-w-xl">
              {project.description}
            </p>
          </div>

          {/* Key Features List */}
          <div className="space-y-2">
            <span className="text-overline text-foreground/40 block">KEY CAPABILITIES</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.keyFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2 text-body-sm text-foreground/80">
                  <div className="w-4 h-4 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={11} />
                  </div>
                  <span className="leading-snug">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Badges */}
          <div className="space-y-2 pt-2 border-t border-border/40">
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.tags.map((tag) => (
                <Tag key={tag} variant="outline" size="sm" className="bg-surface-elevated/40 text-[0.7rem] sm:text-xs">
                  {tag}
                </Tag>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 sm:pt-4 border-t border-border/40">
            <ProjectButtons
              onViewCaseStudy={onViewCaseStudy}
              onOpenLiveWebsite={onOpenLiveWebsite}
            />
          </div>
        </div>

        {/* Right Column: Animated Device Mockup */}
        <div className="flex-1 relative h-48 sm:h-64 lg:h-full lg:min-h-full rounded-2xl border border-border/60 bg-background/50 overflow-hidden flex items-center justify-center z-10 shrink-0">
          <ProjectPreview project={project} />
        </div>
      </Card>
    );
  }
);

ProjectCard.displayName = "ProjectCard";
