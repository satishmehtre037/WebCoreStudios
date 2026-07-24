"use client";

import { useState, useEffect } from "react";
import { isClient } from "@/lib/utils";
import { BREAKPOINTS } from "@/types";
import type { Breakpoint } from "@/types";

/**
 * Reactive media query hook.
 * Usage: const isMobile = useMediaQuery("(max-width: 768px)");
 * Usage: const isDesktop = useMediaQuery("lg"); // uses breakpoint map
 */
export function useMediaQuery(query: string | Breakpoint): boolean {
  const resolvedQuery =
    query in BREAKPOINTS
      ? `(min-width: ${BREAKPOINTS[query as Breakpoint]}px)`
      : query;

  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (!isClient) return;

    const media = window.matchMedia(resolvedQuery);
    setMatches(media.matches);

    function listener(e: MediaQueryListEvent) {
      setMatches(e.matches);
    }

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [resolvedQuery]);

  return matches;
}
