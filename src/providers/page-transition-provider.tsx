"use client";

import { createContext, useContext, useCallback, useRef } from "react";
import { useUIStore } from "@/store";
import { gsap } from "gsap";
import type { WithChildren } from "@/types";

/* ── Context ────────────────────────────────────────────────── */
interface PageTransitionContextValue {
  navigateWithTransition: (href: string) => void;
}

const PageTransitionContext = createContext<PageTransitionContextValue>({
  navigateWithTransition: () => {},
});

export const usePageTransition = () => useContext(PageTransitionContext);

/* ── Provider ───────────────────────────────────────────────── */
export function PageTransitionProvider({ children }: WithChildren) {
  const { setTransitioning } = useUIStore();
  const overlayRef = useRef<HTMLDivElement>(null);

  const navigateWithTransition = useCallback(
    (href: string) => {
      if (!overlayRef.current) return;

      setTransitioning(true);

      const tl = gsap.timeline({
        onComplete: () => {
          window.location.href = href;
        },
      });

      tl.to(overlayRef.current, {
        scaleY: 1,
        transformOrigin: "bottom",
        duration: 0.8,
        ease: "power3.inOut",
      });
    },
    [setTransitioning]
  );

  return (
    <PageTransitionContext.Provider value={{ navigateWithTransition }}>
      {children}

      {/* Transition overlay */}
      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 origin-bottom bg-background"
        style={{
          zIndex: "var(--z-overlay)" as unknown as number,
          transform: "scaleY(0)",
        }}
      />
    </PageTransitionContext.Provider>
  );
}
