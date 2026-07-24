"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { createButtonHoverAnimations, ButtonElements } from "@/animations/buttonHoverTimeline";

export interface UseButtonHoverOptions {
  disabled?: boolean;
}

export function useButtonHover<T extends HTMLElement = HTMLButtonElement>(
  options: UseButtonHoverOptions = {}
) {
  const { disabled = false } = options;
  const buttonRef = useRef<T | null>(null);
  const hoverLayerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const arrowRef = useRef<HTMLSpanElement | null>(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const button = buttonRef.current;
    if (!button || disabled) return;

    const elements: ButtonElements = {
      button,
      hoverLayer: hoverLayerRef.current!,
      text: textRef.current,
      arrow: arrowRef.current,
    };

    const anims = createButtonHoverAnimations(elements, {
      reducedMotion: prefersReducedMotion,
    });

    const handleMouseEnter = () => {
      anims.playEnter();
    };

    const handleMouseLeave = () => {
      anims.playLeave();
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
      anims.kill();
    };
  }, [disabled, prefersReducedMotion]);

  return {
    buttonRef,
    hoverLayerRef,
    textRef,
    arrowRef,
  };
}
