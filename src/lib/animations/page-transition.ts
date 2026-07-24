/**
 * Page Transition Animations
 * GSAP timelines for enter/exit page transitions.
 */
import { gsap, EASE } from "@/lib/gsap";

/**
 * Page exit animation — wipe overlay from bottom to top.
 */
export function pageExit(overlay: HTMLElement) {
  return gsap.timeline().fromTo(
    overlay,
    { scaleY: 0, transformOrigin: "bottom" },
    {
      scaleY: 1,
      duration: 0.6,
      ease: EASE.sharpInOut,
    }
  );
}

/**
 * Page enter animation — wipe overlay from top to reveal content beneath.
 */
export function pageEnter(overlay: HTMLElement) {
  return gsap.timeline().fromTo(
    overlay,
    { scaleY: 1, transformOrigin: "top" },
    {
      scaleY: 0,
      duration: 0.6,
      ease: EASE.sharpInOut,
    }
  );
}

/**
 * Content entrance after page transition.
 */
export function contentEntrance(elements: gsap.TweenTarget) {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: EASE.smooth,
      delay: 0.2,
    }
  );
}
