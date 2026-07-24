/**
 * Pinned Section Animations
 * Pin elements to the viewport while scrolling through content.
 */
import { gsap, ScrollTrigger } from "@/lib/gsap";

export interface PinnedSectionOptions {
  start?: string;
  end?: string;
  endTrigger?: string | HTMLElement;
  pinSpacing?: boolean;
  scrub?: boolean | number;
}

/**
 * Pin a section in place while scrolling through a defined scroll distance.
 */
export function pinnedSection(
  element: HTMLElement | string,
  options: PinnedSectionOptions = {}
) {
  const {
    start = "top top",
    end = "+=100%",
    pinSpacing = true,
    scrub = true,
  } = options;

  return ScrollTrigger.create({
    trigger: element,
    start,
    end: options.endTrigger ? undefined : end,
    endTrigger: options.endTrigger,
    pin: true,
    pinSpacing,
    scrub,
  });
}

/**
 * Pin with content that fades between panels (stacking cards effect).
 */
export function pinnedPanels(
  container: HTMLElement,
  panels: HTMLElement[],
  options: { stagger?: number } = {}
) {
  const { stagger = 0.5 } = options;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: () => `+=${panels.length * 100}%`,
      pin: true,
      scrub: 1,
    },
  });

  panels.forEach((panel, i) => {
    if (i > 0) {
      tl.fromTo(
        panel,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1 },
        i * stagger
      );
    }
    if (i < panels.length - 1) {
      tl.to(
        panel,
        { yPercent: -20, opacity: 0, duration: 1 },
        (i + 1) * stagger
      );
    }
  });

  return tl;
}
