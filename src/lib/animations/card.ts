/**
 * Card Animations
 * Staggered card entrance and hover lift effects.
 */
import { gsap, EASE } from "@/lib/gsap";

export interface CardAnimationOptions {
  duration?: number;
  stagger?: number;
  delay?: number;
  ease?: string;
  y?: number;
  scrub?: boolean | number;
  start?: string;
}

/**
 * Staggered card entrance from below.
 */
export function cardStaggerIn(
  cards: gsap.TweenTarget,
  options: CardAnimationOptions = {}
) {
  const {
    duration = 0.7,
    stagger = 0.1,
    delay = 0,
    ease = EASE.smooth,
    y = 60,
    scrub = false,
    start = "top 85%",
  } = options;

  return gsap.fromTo(
    cards,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease,
      scrollTrigger: {
        trigger: cards as gsap.DOMTarget,
        start,
        scrub,
      },
    }
  );
}

/**
 * Card 3D tilt on hover (call on mouseenter, reverse on mouseleave).
 */
export function cardTilt(
  card: HTMLElement,
  { rotateX = 5, rotateY = 5, scale = 1.02 } = {}
) {
  function handleMouseMove(e: MouseEvent) {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateX: -y * rotateX,
      rotateY: x * rotateY,
      scale,
      transformPerspective: 800,
      duration: 0.3,
      ease: EASE.smooth,
    });
  }

  function handleMouseLeave() {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: EASE.smooth,
    });
  }

  card.addEventListener("mousemove", handleMouseMove);
  card.addEventListener("mouseleave", handleMouseLeave);

  /* Return cleanup function */
  return () => {
    card.removeEventListener("mousemove", handleMouseMove);
    card.removeEventListener("mouseleave", handleMouseLeave);
  };
}
