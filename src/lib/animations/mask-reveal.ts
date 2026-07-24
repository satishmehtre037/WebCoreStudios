/**
 * Mask Reveal Animations
 * Clip-path based reveal effects for text and images.
 */
import { gsap, EASE } from "@/lib/gsap";

export interface MaskRevealOptions {
  duration?: number;
  delay?: number;
  ease?: string;
  direction?: "up" | "down" | "left" | "right";
  scrub?: boolean | number;
  start?: string;
}

const clipPaths: Record<string, { from: string; to: string }> = {
  up: {
    from: "inset(100% 0% 0% 0%)",
    to: "inset(0% 0% 0% 0%)",
  },
  down: {
    from: "inset(0% 0% 100% 0%)",
    to: "inset(0% 0% 0% 0%)",
  },
  left: {
    from: "inset(0% 100% 0% 0%)",
    to: "inset(0% 0% 0% 0%)",
  },
  right: {
    from: "inset(0% 0% 0% 100%)",
    to: "inset(0% 0% 0% 0%)",
  },
};

/**
 * Reveal an element using a clip-path wipe.
 */
export function maskReveal(
  elements: gsap.TweenTarget,
  options: MaskRevealOptions = {}
) {
  const {
    duration = 1,
    delay = 0,
    ease = EASE.expoInOut,
    direction = "up",
    scrub = false,
    start = "top 80%",
  } = options;

  const { from, to } = clipPaths[direction];

  return gsap.fromTo(
    elements,
    { clipPath: from },
    {
      clipPath: to,
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: elements as gsap.DOMTarget,
        start,
        scrub,
      },
    }
  );
}
