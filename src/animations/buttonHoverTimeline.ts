import { gsap, EASE } from "@/lib/gsap";

export interface ButtonElements {
  button: HTMLElement;
  sweepLayer: HTMLElement;
  label?: HTMLElement | null;
  arrow?: HTMLElement | null;
}

export interface ButtonTimelineOptions {
  reducedMotion?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost";
}

/**
 * Creates a decoupled GSAP hover animation timeline for the premium CTA button.
 */
export function createButtonHoverTimeline(
  elements: ButtonElements,
  options: ButtonTimelineOptions = {}
) {
  const { button, sweepLayer, label, arrow } = elements;
  const { reducedMotion = false, variant = "primary" } = options;

  const tl = gsap.timeline({ paused: true });

  if (reducedMotion) {
    // Accessibility fallback: simple color opacity fade only
    tl.to(button, {
      backgroundColor: variant === "primary" ? "#7A1222" : "rgba(255,249,235,0.12)",
      duration: 0.25,
      ease: EASE.smooth,
    });
    return tl;
  }

  // 1. Button Lift & Shadow Deepening
  tl.to(
    button,
    {
      y: -2,
      boxShadow:
        variant === "primary"
          ? "0 12px 28px -6px rgba(93, 13, 24, 0.45), 0 4px 12px -2px rgba(0, 0, 0, 0.3)"
          : "0 10px 24px -6px rgba(0, 0, 0, 0.4)",
      backgroundColor: variant === "primary" ? "#7A1222" : undefined,
      duration: 0.35,
      ease: "power2.out",
    },
    0
  );

  // 2. Liquid Glass Sweep Layer (slides from -100% to 150% across button)
  if (sweepLayer) {
    gsap.set(sweepLayer, { xPercent: -120, opacity: 0 });
    tl.to(
      sweepLayer,
      {
        xPercent: 160,
        opacity: 0.75,
        duration: 0.42,
        ease: "power3.inOut",
      },
      0
    );
  }

  // 3. Label Text Smooth Transition
  if (label) {
    tl.to(
      label,
      {
        color: "#FFF9EB",
        duration: 0.3,
        ease: "power2.out",
      },
      0
    );
  }

  // 4. Arrow Translation (6-8px right) & Rotation (2-5 degrees)
  if (arrow) {
    tl.to(
      arrow,
      {
        x: 7,
        rotate: 3,
        duration: 0.38,
        ease: "power2.out",
      },
      0
    );
  }

  return tl;
}
