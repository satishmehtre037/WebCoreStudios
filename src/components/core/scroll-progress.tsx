"use client";

import { useScroll, useSpring, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * A minimal, fixed progress bar at the top of the viewport
 * that indicates how far the user has scrolled.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Smooth out the scroll progress to match our confident motion language
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left"
      style={{
        scaleX,
        zIndex: "var(--z-modal)" as unknown as number, // Above navbar
      }}
    />
  );
}
