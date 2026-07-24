/**
 * Parallax Animations
 * Scroll-linked parallax movement for backgrounds, images, and elements.
 */
import { gsap, ScrollTrigger } from "@/lib/gsap";

export interface ParallaxOptions {
  speed?: number;
  direction?: "vertical" | "horizontal";
  scrub?: boolean | number;
  start?: string;
  end?: string;
}

/**
 * Apply parallax movement to an element on scroll.
 * Speed: 0.5 = half speed (moves slower than scroll), 2 = double speed.
 */
export function parallax(
  element: gsap.TweenTarget,
  options: ParallaxOptions = {}
) {
  const {
    speed = 0.5,
    direction = "vertical",
    scrub = true,
    start = "top bottom",
    end = "bottom top",
  } = options;

  const distance = speed * 100;
  const axis = direction === "vertical" ? "y" : "x";

  return gsap.fromTo(
    element,
    { [axis]: -distance },
    {
      [axis]: distance,
      ease: "none",
      scrollTrigger: {
        trigger: element as gsap.DOMTarget,
        start,
        end,
        scrub,
      },
    }
  );
}

/**
 * Parallax background with scale effect for immersive depth.
 */
export function parallaxBackground(
  element: gsap.TweenTarget,
  options: { speed?: number; scale?: number } = {}
) {
  const { speed = 0.3, scale = 1.15 } = options;

  return gsap.fromTo(
    element,
    { y: -speed * 100, scale },
    {
      y: speed * 100,
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: element as gsap.DOMTarget,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    }
  );
}
