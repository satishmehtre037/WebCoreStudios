import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TimelineEntry {
  id: string;
  year?: string;
  title: string;
  description: string;
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  entries: TimelineEntry[];
  variant?: "default" | "process";
  lineRef?: React.RefObject<HTMLDivElement | null>;
}

/**
 * Vertical timeline component for displaying chronological or process entries.
 */
const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  ({ entries, className, variant = "default", lineRef, ...props }, ref) => {
    const isProcess = variant === "process";

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        {/* Background Vertical line */}
        <div className={cn(
          "absolute top-0 bottom-0 w-px bg-border",
          isProcess ? "left-0 md:left-0" : "left-4 md:left-1/2 md:-translate-x-px"
        )} />
        
        {/* Foreground Animated Line (for Process variant) */}
        {isProcess && (
          <div 
            ref={lineRef}
            className="timeline-draw-line absolute top-0 bottom-0 w-px bg-primary origin-top scale-y-0 left-0 md:left-0 z-10" 
          />
        )}

        <div className={cn("space-y-12", isProcess && "pl-8 md:pl-16")}>
          {entries.map((entry, index) => (
            <div
              key={entry.id}
              className={cn(
                "timeline-item relative flex flex-col md:flex-row md:items-start opacity-0 translate-y-4", // GSAP will animate this
                !isProcess && index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse",
                isProcess && "md:flex-row pb-8" // Reset direction for process
              )}
            >
              {/* Dot (Only for default variant) */}
              {!isProcess && (
                <div className="absolute left-4 top-1 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-primary bg-background md:left-1/2" />
              )}

              {/* Content */}
              <div
                className={cn(
                  isProcess ? "w-full md:w-3/4" : "ml-10 md:ml-0 md:w-1/2",
                  !isProcess && index % 2 === 0 ? "md:pr-12 md:text-right" : "",
                  !isProcess && index % 2 !== 0 ? "md:pl-12" : ""
                )}
              >
                {entry.year && (
                  <span className="text-caption text-accent block mb-1">{entry.year}</span>
                )}
                <h4 className={cn(
                  isProcess ? "text-h3 text-foreground tracking-tight" : "text-h4 mt-1"
                )}>
                  {entry.title}
                </h4>
                <p className={cn(
                  isProcess ? "text-body-lg text-foreground-secondary leading-relaxed mt-4 max-w-2xl" : "text-body-sm mt-2 text-foreground-secondary"
                )}>
                  {entry.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);
Timeline.displayName = "Timeline";

export { Timeline };
