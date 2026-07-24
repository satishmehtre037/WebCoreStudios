"use client";

import { forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ButtonLabelProps {
  children: ReactNode;
  className?: string;
}

export const ButtonLabel = forwardRef<HTMLSpanElement, ButtonLabelProps>(
  ({ children, className }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "relative z-10 font-sans font-medium tracking-wide text-body-sm sm:text-body-md transition-colors duration-200 inline-flex items-center gap-2",
          className
        )}
      >
        {children}
      </span>
    );
  }
);

ButtonLabel.displayName = "ButtonLabel";
