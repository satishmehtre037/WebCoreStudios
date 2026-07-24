/**
 * GSAP Core Configuration
 * Central place for plugin registration and custom ease curves.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* Register all GSAP plugins once */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Custom Ease Curves ─────────────────────────────────────── */
export const EASE = {
  smooth: "power3.out",
  smoothInOut: "power3.inOut",
  expo: "expo.out",
  expoInOut: "expo.inOut",
  elastic: "elastic.out(1, 0.5)",
  bounce: "bounce.out",
  back: "back.out(1.7)",
  sharp: "power4.out",
  sharpInOut: "power4.inOut",
} as const;

/* ── Default Timeline Defaults ──────────────────────────────── */
export const TIMELINE_DEFAULTS: gsap.TweenVars = {
  ease: EASE.smooth,
  duration: 0.6,
};

export { gsap, ScrollTrigger };
