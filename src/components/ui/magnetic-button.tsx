"use client";

import { useEffect, useRef } from "react";
import { magneticEffect } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
}

/**
 * Wrapper component that applies the magnetic hover effect to its child.
 */
export function MagneticButton({ children, strength = 0.4 }: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!wrapperRef.current || prefersReducedMotion) return;

    // Apply the magnetic effect from our animation foundation
    const cleanup = magneticEffect(wrapperRef.current, { strength });

    return () => cleanup();
  }, [strength, prefersReducedMotion]);

  return (
    <div ref={wrapperRef} className="inline-block relative">
      {children}
    </div>
  );
}
