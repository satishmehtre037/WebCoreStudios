"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { textRevealLines, fadeIn } from "@/lib/animations";
import { gsap } from "@/lib/gsap";

type RevealType = "text" | "fade" | "none";

interface UseScrollRevealOptions {
  type?: RevealType;
  delay?: number;
  duration?: number;
  stagger?: number;
  start?: string; // e.g. "top 80%"
}

/**
 * A hook that automatically applies a scroll-triggered reveal animation to a DOM element.
 * Useful for making future sections animate on scroll without writing custom GSAP code.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  type = "fade",
  delay = 0,
  duration,
  stagger,
  start = "top 85%",
}: UseScrollRevealOptions = {}) {
  const ref = useRef<T>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (!ref.current || prefersReducedMotion || type === "none") {
      // If reduced motion, ensure element is fully visible immediately
      if (ref.current) {
        gsap.set(ref.current, { opacity: 1, y: 0, x: 0 });
        const children = ref.current.querySelectorAll(".line, .word, .char");
        if (children.length > 0) {
          gsap.set(children, { opacity: 1, y: 0, x: 0 });
        }
      }
      return;
    }

    let tween: gsap.core.Tween | null = null;

    if (type === "text") {
      tween = textRevealLines(ref.current, { delay, duration, stagger, start });
    } else if (type === "fade") {
      tween = fadeIn(ref.current, { delay, duration, stagger, start, distance: 30 });
    }

    return () => {
      if (tween) tween.kill();
    };
  }, [type, delay, duration, stagger, start, prefersReducedMotion]);

  return ref;
}
