/**
 * Scroll Progress Animations
 * GSAP-based scroll progress indicators and progress-linked animations.
 */
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Animate an element's scaleX based on overall page scroll progress.
 * Great for progress bars at the top of the page.
 */
export function scrollProgressBar(
  element: gsap.TweenTarget,
  options: { scrub?: number } = {}
) {
  const { scrub = 0.3 } = options;

  return gsap.fromTo(
    element,
    { scaleX: 0, transformOrigin: "left center" },
    {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub,
      },
    }
  );
}

/**
 * Track scroll progress within a specific section.
 * Calls onProgress with a 0-1 value.
 */
export function sectionProgress(
  trigger: HTMLElement | string,
  onProgress: (progress: number) => void,
  options: { start?: string; end?: string } = {}
) {
  const { start = "top bottom", end = "bottom top" } = options;

  return ScrollTrigger.create({
    trigger,
    start,
    end,
    onUpdate: (self) => onProgress(self.progress),
  });
}
