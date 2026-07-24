"use client";

import { useEffect, useRef, createContext, useContext, useCallback } from "react";
import Lenis from "lenis";
import { LENIS_CONFIG } from "@/config/site";
import type { WithChildren } from "@/types";

/* ── Context ────────────────────────────────────────────────── */
interface SmoothScrollContextValue {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: object) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

/* ── Provider ───────────────────────────────────────────────── */
export function SmoothScrollProvider({ children }: WithChildren) {
  const lenisRef = useRef<Lenis | null>(null);

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, options?: object) => {
      lenisRef.current?.scrollTo(target, options);
    },
    []
  );

  useEffect(() => {
    const lenis = new Lenis(LENIS_CONFIG);
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
