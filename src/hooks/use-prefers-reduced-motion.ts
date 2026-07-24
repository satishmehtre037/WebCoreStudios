"use client";

import { useState, useEffect } from "react";
import { isClient } from "@/lib/utils";

/**
 * Detect if the user prefers reduced motion.
 * Animations should gracefully degrade when this returns true.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (!isClient) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(media.matches);

    function listener(e: MediaQueryListEvent) {
      setPrefersReduced(e.matches);
    }

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return prefersReduced;
}
