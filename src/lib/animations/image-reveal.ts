/**
 * Image Reveal Animations
 * Scale + clip-path reveals for images with optional overlay wipe.
 */
import { gsap, EASE } from "@/lib/gsap";

export interface ImageRevealOptions {
  duration?: number;
  delay?: number;
  ease?: string;
  scale?: number;
  scrub?: boolean | number;
  start?: string;
}

/**
 * Image reveal with scale-down and clip-path wipe.
 */
export function imageReveal(
  element: gsap.TweenTarget,
  options: ImageRevealOptions = {}
) {
  const {
    duration = 1.2,
    delay = 0,
    ease = EASE.expoInOut,
    scale = 1.3,
    scrub = false,
    start = "top 80%",
  } = options;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element as gsap.DOMTarget,
      start,
      scrub,
    },
  });

  tl.fromTo(
    element,
    {
      clipPath: "inset(100% 0% 0% 0%)",
      scale,
    },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      scale: 1,
      duration,
      delay,
      ease,
    }
  );

  return tl;
}

/**
 * Simple scale-in image reveal.
 */
export function imageScaleIn(
  element: gsap.TweenTarget,
  options: Omit<ImageRevealOptions, "scale"> & { scale?: number } = {}
) {
  const {
    duration = 0.8,
    delay = 0,
    ease = EASE.smooth,
    scale = 0.9,
    scrub = false,
    start = "top 85%",
  } = options;

  return gsap.fromTo(
    element,
    { opacity: 0, scale },
    {
      opacity: 1,
      scale: 1,
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: element as gsap.DOMTarget,
        start,
        scrub,
      },
    }
  );
}
