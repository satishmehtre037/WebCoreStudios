/**
 * Fade Animations
 * Versatile fade-in/out with optional directional movement.
 */
import { gsap, EASE } from "@/lib/gsap";
import type { AnimationDirection } from "@/types";

export interface FadeOptions {
  duration?: number;
  delay?: number;
  ease?: string;
  distance?: number;
  direction?: AnimationDirection;
  stagger?: number;
  scrub?: boolean | number;
  start?: string;
}

/**
 * Fade in with optional directional slide.
 */
export function fadeIn(
  elements: gsap.TweenTarget,
  options: FadeOptions = {}
) {
  const {
    duration = 0.8,
    delay = 0,
    ease = EASE.smooth,
    distance = 40,
    direction = "up",
    stagger = 0,
    scrub = false,
    start = "top 85%",
  } = options;

  const dirMap: Record<AnimationDirection, { x: number; y: number }> = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };

  const { x, y } = dirMap[direction];

  return gsap.fromTo(
    elements,
    { opacity: 0, x, y },
    {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease,
      stagger,
      scrollTrigger: scrub !== false
        ? {
            trigger: elements as gsap.DOMTarget,
            start,
            scrub,
          }
        : {
            trigger: elements as gsap.DOMTarget,
            start,
          },
    }
  );
}

/**
 * Fade out with optional directional slide.
 */
export function fadeOut(
  elements: gsap.TweenTarget,
  options: Omit<FadeOptions, "stagger"> = {}
) {
  const {
    duration = 0.5,
    delay = 0,
    ease = EASE.smooth,
    distance = 20,
    direction = "up",
  } = options;

  const dirMap: Record<AnimationDirection, { x: number; y: number }> = {
    up: { x: 0, y: -distance },
    down: { x: 0, y: distance },
    left: { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
  };

  const { x, y } = dirMap[direction];

  return gsap.to(elements, {
    opacity: 0,
    x,
    y,
    duration,
    delay,
    ease,
  });
}
