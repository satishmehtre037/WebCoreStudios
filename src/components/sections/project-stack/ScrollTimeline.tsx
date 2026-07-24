"use client";

import { cn } from "@/lib/utils";

export interface ScrollTimelineProps {
  total: number;
  activeIndex: number;
  className?: string;
}

export function ScrollTimeline({ total, activeIndex, className }: ScrollTimelineProps) {
  return (
    <div className={cn("flex items-center gap-3 text-overline text-foreground/50", className)}>
      <span className="font-mono text-primary font-bold">
        {String(activeIndex + 1).padStart(2, "0")}
      </span>
      <div className="flex gap-1.5 items-center">
        {Array.from({ length: total }).map((_, idx) => (
          <div
            key={idx}
            className={cn(
              "h-1 rounded-full transition-all duration-500",
              idx === activeIndex
                ? "w-8 bg-primary shadow-glow"
                : "w-2 bg-border/60"
            )}
          />
        ))}
      </div>
      <span className="font-mono text-foreground/40">
        {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}
