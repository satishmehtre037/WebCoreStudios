"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { createButtonHoverTimeline, ButtonElements } from "@/animations/buttonHoverTimeline";

export interface UseButtonHoverOptions {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  disabled?: boolean;
}

export function useButtonHover<T extends HTMLElement = HTMLButtonElement>(
  options: UseButtonHoverOptions = {}
) {
  const { variant = "primary", disabled = false } = options;
  const buttonRef = useRef<T | null>(null);
  const sweepRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const arrowRef = useRef<HTMLSpanElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const button = buttonRef.current;
    if (!button || disabled) return;

    const elements: ButtonElements = {
      button,
      sweepLayer: sweepRef.current!,
      label: labelRef.current,
      arrow: arrowRef.current,
    };

    const tl = createButtonHoverTimeline(elements, {
      reducedMotion: prefersReducedMotion,
      variant,
    });
    timelineRef.current = tl;

    const handleMouseEnter = () => {
      tl.play();
    };

    const handleMouseLeave = () => {
      tl.reverse();
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
      tl.kill();
    };
  }, [variant, disabled, prefersReducedMotion]);

  return {
    buttonRef,
    sweepRef,
    labelRef,
    arrowRef,
  };
}
