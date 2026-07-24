import { gsap } from "@/lib/gsap";

export interface ButtonElements {
  button: HTMLElement;
  hoverLayer: HTMLElement;
  text?: HTMLElement | null;
  arrow?: HTMLElement | null;
}

export interface ButtonTimelineOptions {
  reducedMotion?: boolean;
}

/**
 * Creates handcrafted GSAP timelines for Enter and Forward-Exiting Leave animations.
 */
export function createButtonHoverAnimations(
  elements: ButtonElements,
  options: ButtonTimelineOptions = {}
) {
  const { button, hoverLayer, text, arrow } = elements;
  const { reducedMotion = false } = options;

  if (reducedMotion) {
    const enterTl = gsap.timeline({ paused: true });
    enterTl.to(button, { backgroundColor: "#7A1222", duration: 0.35, ease: "power2.out" });

    const leaveTl = gsap.timeline({ paused: true });
    leaveTl.to(button, { backgroundColor: "#5D0D18", duration: 0.35, ease: "power2.out" });

    return {
      playEnter: () => enterTl.play(0),
      playLeave: () => leaveTl.play(0),
      kill: () => {
        enterTl.kill();
        leaveTl.kill();
      },
    };
  }

  // Ensure initial states
  gsap.set(hoverLayer, { xPercent: -105 });

  const playEnter = () => {
    // 1. Container Lift & Shadow Deepening
    gsap.to(button, {
      y: -2,
      boxShadow: "0 14px 32px -8px rgba(93, 13, 24, 0.45), 0 4px 12px -2px rgba(0, 0, 0, 0.3)",
      duration: 0.35,
      ease: "power3.out",
    });

    // 2. Layer 2 Liquid Sweep (LEFT -> COVERED)
    gsap.fromTo(
      hoverLayer,
      { xPercent: -105 },
      { xPercent: 0, duration: 0.35, ease: "power3.out" }
    );

    // 3. Text Micro-Lift (Up 2px & Slight Fade, then Settle)
    if (text) {
      const textTl = gsap.timeline();
      textTl
        .to(text, { y: -2, opacity: 0.85, duration: 0.16, ease: "power2.out" })
        .to(text, { y: 0, opacity: 1, duration: 0.19, ease: "power3.out" });
    }

    // 4. Arrow 8px Translation & 5° Rotation
    if (arrow) {
      gsap.to(arrow, {
        x: 8,
        rotate: 5,
        duration: 0.35,
        ease: "power3.out",
      });
    }
  };

  const playLeave = () => {
    // 1. Container Return
    gsap.to(button, {
      y: 0,
      boxShadow: "0 4px 14px rgba(93, 13, 24, 0.35)",
      duration: 0.35,
      ease: "power2.out",
    });

    // 2. Layer 2 Forward Exit (COVERED -> RIGHT), then Reset to LEFT
    gsap.to(hoverLayer, {
      xPercent: 105,
      duration: 0.35,
      ease: "power2.out",
      onComplete: () => {
        gsap.set(hoverLayer, { xPercent: -105 });
      },
    });

    // 3. Text Reset
    if (text) {
      gsap.to(text, { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" });
    }

    // 4. Arrow Return
    if (arrow) {
      gsap.to(arrow, {
        x: 0,
        rotate: 0,
        duration: 0.35,
        ease: "power2.out",
      });
    }
  };

  return {
    playEnter,
    playLeave,
    kill: () => {
      gsap.killTweensOf([button, hoverLayer, text, arrow]);
    },
  };
}
