"use client";

import { ArrowUpRight, ExternalLink, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function GithubIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export interface ProjectButtonsProps {
  onViewCaseStudy?: () => void;
  onOpenLiveWebsite?: () => void;
  onVisitExternalUrl?: () => void;
  onBack?: () => void;
  liveUrl?: string;
  githubUrl?: string;
  className?: string;
  variant?: "card" | "modal";
}

export function ProjectButtons({
  onViewCaseStudy,
  onOpenLiveWebsite,
  onVisitExternalUrl,
  onBack,
  liveUrl,
  githubUrl,
  className,
  variant = "card",
}: ProjectButtonsProps) {
  if (variant === "modal") {
    return (
      <div className={cn("flex flex-wrap items-center gap-4", className)}>
        {onBack && (
          <Button
            variant="outline"
            size="lg"
            onClick={onBack}
            className="border-border/60 hover:bg-foreground/10 text-foreground"
          >
            <ArrowLeft size={16} className="mr-2" />
            <span>Back</span>
          </Button>
        )}

        {liveUrl && (
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              if (onVisitExternalUrl) onVisitExternalUrl();
              window.open(liveUrl, "_blank", "noopener,noreferrer");
            }}
            className="shadow-glow"
          >
            <span>Visit Website</span>
            <ExternalLink size={16} className="ml-2" />
          </Button>
        )}

        {githubUrl && (
          <Button
            variant="secondary"
            size="lg"
            onClick={() => window.open(githubUrl, "_blank", "noopener,noreferrer")}
          >
            <GithubIcon size={16} className="mr-2" />
            <span>GitHub</span>
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-3 sm:gap-4", className)}>
      {onViewCaseStudy && (
        <Button
          variant="secondary"
          size="md"
          onClick={onViewCaseStudy}
          className="group/btn"
        >
          <span>View Case Study</span>
          <ArrowUpRight size={16} className="ml-1.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </Button>
      )}

      {onOpenLiveWebsite && (
        <Button
          variant="primary"
          size="md"
          onClick={onOpenLiveWebsite}
          className="shadow-lg hover:shadow-glow group/btn"
        >
          <span>Open Live Website</span>
          <ExternalLink size={15} className="ml-2 group-hover/btn:translate-x-0.5 transition-transform" />
        </Button>
      )}
    </div>
  );
}
