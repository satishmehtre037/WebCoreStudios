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
          "absolute inset-0 pointer-events-none overflow-hidden rounded-full bg-[#5D0D18]",
          className
        )}
      >
        {/* Layer 2: Lighter Bloodstone Hover Layer with Integrated Glossy Highlight Sweep */}
        <div
          ref={ref}
          className={cn(
            "absolute inset-0 w-full h-full pointer-events-none rounded-full will-change-transform transform-gpu",
            "bg-[linear-gradient(115deg,#7A1222_0%,#8A1426_70%,rgba(255,249,235,0.38)_88%,#7A1222_100%)]"
          )}
          style={{ transform: "translateX(-105%)" }}
        />
      </div>
    );
  }
);

ButtonBackground.displayName = "ButtonBackground";
