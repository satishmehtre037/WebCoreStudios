"use client";

import { forwardRef } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonArrowProps {
  size?: number;
  className?: string;
}

export const ButtonArrow = forwardRef<HTMLSpanElement, ButtonArrowProps>(
  ({ size = 18, className }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "relative z-10 inline-flex items-center justify-center shrink-0 text-foreground will-change-transform transform-gpu",
          className
        )}
      >
        <ArrowRight size={size} />
      </span>
    );
  }
);

ButtonArrow.displayName = "ButtonArrow";
