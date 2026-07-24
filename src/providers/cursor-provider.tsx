"use client";

import { useEffect, useRef, createContext, useContext, useCallback } from "react";
import { useUIStore } from "@/store";
import { useMousePosition } from "@/hooks";
import { useMediaQuery } from "@/hooks";
import { lerp } from "@/lib/utils";
import type { WithChildren, CursorVariant } from "@/types";

/* ── Context ────────────────────────────────────────────────── */
interface CursorContextValue {
  setCursor: (variant: CursorVariant, label?: string) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextValue>({
  setCursor: () => {},
  resetCursor: () => {},
});

export const useCursor = () => useContext(CursorContext);

/* ── Provider ───────────────────────────────────────────────── */
export function CursorProvider({ children }: WithChildren) {
  const { setCursorVariant, setCursorLabel, resetCursor } = useUIStore();
  const cursorVariant = useUIStore((s) => s.cursorVariant);
  const cursorLabel = useUIStore((s) => s.cursorLabel);
  const mouse = useMousePosition();
  const isDesktop = useMediaQuery("lg");

  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);

  const setCursor = useCallback(
    (variant: CursorVariant, label = "") => {
      setCursorVariant(variant);
      setCursorLabel(label);
    },
    [setCursorVariant, setCursorLabel]
  );

  useEffect(() => {
    if (!isDesktop) return;

    let rafId: number;

    function animate() {
      posRef.current.x = lerp(posRef.current.x, mouse.x, 0.15);
      posRef.current.y = lerp(posRef.current.y, mouse.y, 0.15);

      // Only show cursor after first mouse movement
      if (!hasMovedRef.current && (mouse.x !== 0 || mouse.y !== 0)) {
        hasMovedRef.current = true;
        if (cursorRef.current) cursorRef.current.style.opacity = '1';
        if (cursorDotRef.current) cursorDotRef.current.style.opacity = '1';
      }

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    }

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isDesktop, mouse.x, mouse.y]);

  /* Cursor size map */
  const sizeMap: Record<CursorVariant, number> = {
    default: 32,
    pointer: 48,
    text: 80,
    hidden: 0,
    magnetic: 64,
    media: 96,
    card: 40,
  };

  const size = sizeMap[cursorVariant];

  return (
    <CursorContext.Provider value={{ setCursor, resetCursor }}>
      {children}

      {isDesktop && (
        <>
          {/* Outer ring */}
          <div
            ref={cursorRef}
            className="pointer-events-none fixed top-0 left-0 rounded-full border border-foreground/20 mix-blend-difference transition-[width,height,opacity] duration-300 ease-out"
            style={{
              width: size,
              height: size,
              marginLeft: -size / 2,
              marginTop: -size / 2,
              zIndex: "var(--z-cursor)" as unknown as number,
              opacity: 0,
            }}
          >
            {cursorLabel && (
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium uppercase tracking-widest text-foreground">
                {cursorLabel}
              </span>
            )}
          </div>

          {/* Inner dot */}
          <div
            ref={cursorDotRef}
            className="pointer-events-none fixed top-0 left-0 h-1.5 w-1.5 -ml-[3px] -mt-[3px] rounded-full bg-foreground mix-blend-difference transition-opacity duration-200"
            style={{
              zIndex: "var(--z-cursor)" as unknown as number,
              opacity: 0,
            }}
          />
        </>
      )}
    </CursorContext.Provider>
  );
}
