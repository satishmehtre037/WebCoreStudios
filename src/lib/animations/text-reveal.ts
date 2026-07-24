/**
 * Text Reveal Animations
 * Split text into lines/words/chars and reveal with staggered animation.
 */
import { gsap, ScrollTrigger, EASE } from "@/lib/gsap";

export interface TextRevealOptions {
  duration?: number;
  stagger?: number;
  delay?: number;
  ease?: string;
  y?: number;
  scrub?: boolean | number;
  start?: string;
  end?: string;
}

/**
 * Reveal text lines by translating from below with a clip mask.
 */
export function textRevealLines(
  element: HTMLElement | string,
  options: TextRevealOptions = {}
) {
  const {
    duration = 0.8,
    stagger = 0.06,
    delay = 0,
    ease = EASE.expo,
    y = 100,
    scrub = false,
    start = "top 85%",
    end = "top 20%",
  } = options;

  const target = typeof element === "string" ? document.querySelector(element) : element;
  if (!target) return null;

  /* Wrap each line for overflow hidden */
  const lines = target.querySelectorAll(".line, [data-line]");
  if (lines.length === 0) {
    /* Fallback: animate the element itself */
    return gsap.fromTo(
      target,
      { y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration,
        delay,
        ease,
        scrollTrigger: {
          trigger: target,
          start,
          end,
          scrub,
        },
      }
    );
  }

  return gsap.fromTo(
    lines,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      delay,
      ease,
      scrollTrigger: {
        trigger: target,
        start,
        end,
        scrub,
      },
    }
  );
}

/**
 * Reveal individual characters with stagger.
 */
export function textRevealChars(
  element: HTMLElement | string,
  options: TextRevealOptions = {}
) {
  const {
    duration = 0.5,
    stagger = 0.02,
    delay = 0,
    ease = EASE.smooth,
    y = 40,
    scrub = false,
    start = "top 85%",
    end = "top 20%",
  } = options;

  const target = typeof element === "string" ? document.querySelector(element) : element;
  if (!target) return null;

  const chars = target.querySelectorAll(".char, [data-char]");
  if (chars.length === 0) return null;

  return gsap.fromTo(
    chars,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      delay,
      ease,
      scrollTrigger: {
        trigger: target,
        start,
        end,
        scrub,
      },
    }
  );
}
