"use client";

import { forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ButtonTextProps {
  children: ReactNode;
  className?: string;
}

export const ButtonText = forwardRef<HTMLSpanElement, ButtonTextProps>(
  ({ children, className }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "relative z-10 font-sans font-medium tracking-wide text-foreground text-body-md inline-flex items-center gap-2 will-change-transform transform-gpu",
          className
        )}
      >
        {children}
      </span>
    );
  }
);

ButtonText.displayName = "ButtonText";
