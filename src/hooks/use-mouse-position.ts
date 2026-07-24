"use client";

import { useState, useCallback } from "react";
import { useIsomorphicLayoutEffect } from "./use-isomorphic-layout-effect";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

/**
 * Track the mouse position in viewport coordinates and normalized (-1 to 1).
 */
export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({
      x: e.clientX,
      y: e.clientY,
      normalizedX: (e.clientX / window.innerWidth) * 2 - 1,
      normalizedY: -(e.clientY / window.innerHeight) * 2 + 1,
    });
  }, []);

  useIsomorphicLayoutEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return position;
}
