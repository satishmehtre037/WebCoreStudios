"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonBackgroundProps {
  className?: string;
}

export const ButtonBackground = forwardRef<HTMLDivElement, ButtonBackgroundProps>(
  ({ className }, ref) => {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 pointer-events-none overflow-hidden rounded-full bg-primary",
          className
        )}
      >
        {/* Layer 2: Lighter Terracotta Hover Layer with Integrated Glossy Highlight Sweep */}
        <div
          ref={ref}
          className={cn(
            "absolute inset-0 w-full h-full pointer-events-none rounded-full will-change-transform transform-gpu",
            "bg-[linear-gradient(115deg,rgb(var(--primary))_0%,#D35D3B_70%,rgba(253,245,230,0.38)_88%,rgb(var(--primary))_100%)]"
          )}
          style={{ transform: "translateX(-105%)" }}
        />
      </div>
    );
  }
);

ButtonBackground.displayName = "ButtonBackground";
