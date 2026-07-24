"use client";

import { useEffect, createContext, useContext } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { WithChildren } from "@/types";

/* ── Register GSAP Plugins ──────────────────────────────────── */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Context ────────────────────────────────────────────────── */
interface AnimationContextValue {
  gsapInstance: typeof gsap;
}

const AnimationContext = createContext<AnimationContextValue>({
  gsapInstance: gsap,
});

export const useAnimation = () => useContext(AnimationContext);

/* ── Provider ───────────────────────────────────────────────── */
export function AnimationProvider({ children }: WithChildren) {
  useEffect(() => {
    /* Set GSAP defaults for consistent timing across the app */
    gsap.defaults({
      ease: "power3.out",
      duration: 0.6,
    });

    /* Configure ScrollTrigger defaults */
    ScrollTrigger.defaults({
      toggleActions: "play none none reverse",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <AnimationContext.Provider value={{ gsapInstance: gsap }}>
      {children}
    </AnimationContext.Provider>
  );
}
