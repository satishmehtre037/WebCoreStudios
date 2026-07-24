"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonBackgroundProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
}

export const ButtonBackground = forwardRef<HTMLDivElement, ButtonBackgroundProps>(
  ({ variant = "primary", className }, ref) => {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(
          "absolute inset-0 pointer-events-none overflow-hidden rounded-full transition-colors duration-300",
          className
        )}
      >
        {/* Glossy Liquid Glass Sweep Highlight Layer */}
        <div
          className={cn(
            "absolute top-0 bottom-0 -left-1/2 w-[120%] pointer-events-none opacity-0",
            "bg-[linear-gradient(115deg,transparent_0%,rgba(255,249,235,0.32)_50%,transparent_100%)]",
            "blur-[2px]"
          )}
        />
      </div>
    );
  }
);

ButtonBackground.displayName = "ButtonBackground";
