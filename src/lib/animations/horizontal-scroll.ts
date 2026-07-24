/**
 * Horizontal Scroll Animation
 * Transform a horizontally-overflowing container into a scroll-linked experience.
 */
import { gsap, ScrollTrigger } from "@/lib/gsap";

export interface HorizontalScrollOptions {
  ease?: string;
  scrub?: number;
  pin?: boolean;
  anticipatePin?: number;
  start?: string;
  end?: string;
}

/**
 * Create a horizontal scroll section.
 * The container element should have children laid out in a flex row.
 * @param container - The outer wrapper that gets pinned.
 * @param track - The inner track that moves horizontally.
 */
export function horizontalScroll(
  container: HTMLElement,
  track: HTMLElement,
  options: HorizontalScrollOptions = {}
) {
  const {
    ease = "none",
    scrub = 1,
    pin = true,
    anticipatePin = 1,
    start = "top top",
  } = options;

  const totalWidth = track.scrollWidth - container.offsetWidth;

  return gsap.to(track, {
    x: -totalWidth,
    ease,
    scrollTrigger: {
      trigger: container,
      start,
      end: () => `+=${totalWidth}`,
      scrub,
      pin,
      anticipatePin,
      invalidateOnRefresh: true,
    },
  });
}
