/**
 * Magnetic Button Effect
 * Elements that subtly follow the cursor when hovered, creating a magnetic pull.
 */
import { gsap, EASE } from "@/lib/gsap";

export interface MagneticOptions {
  strength?: number;
  ease?: string;
  duration?: number;
}

/**
 * Apply a magnetic effect to an element.
 * Returns a cleanup function to remove event listeners.
 */
export function magneticEffect(
  element: HTMLElement,
  options: MagneticOptions = {}
) {
  const { strength = 0.3, ease = EASE.smooth, duration = 0.4 } = options;

  function handleMouseMove(e: MouseEvent) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration,
      ease,
    });
  }

  function handleMouseLeave() {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: EASE.elastic,
    });
  }

  element.addEventListener("mousemove", handleMouseMove);
  element.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    element.removeEventListener("mousemove", handleMouseMove);
    element.removeEventListener("mouseleave", handleMouseLeave);
    gsap.set(element, { x: 0, y: 0 });
  };
}
