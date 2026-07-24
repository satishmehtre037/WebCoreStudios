"use client";

import { useState } from "react";
import { useIsomorphicLayoutEffect } from "./use-isomorphic-layout-effect";

interface WindowSize {
  width: number;
  height: number;
}

/**
 * Track the current window dimensions reactively.
 */
export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>({ width: 0, height: 0 });

  useIsomorphicLayoutEffect(() => {
    function handleResize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}
