"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { WithChildren, WithClassName } from "@/types";

interface PinnedSectionProps extends WithChildren, WithClassName {
  pinDuration?: string | number; // e.g., "+=100%" or 1000
}

/**
 * A wrapper that pins its content while the user scrolls.
 * Ideal for sections where horizontal scrolling or complex storytelling animations occur inside.
 */
export function PinnedSection({ children, className, pinDuration = "+=100%" }: PinnedSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion || !containerRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        pin: pinRef.current,
        start: "top top",
        end: pinDuration,
        scrub: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [pinDuration, prefersReducedMotion]);

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div ref={pinRef} className="w-full h-screen">
        {children}
      </div>
    </div>
  );
}
