"use client";

import { useRef, useState, useEffect } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { gsap, ScrollTrigger, EASE } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { WithChildren, WithClassName } from "@/types";

interface HorizontalScrollProps extends WithChildren, WithClassName {
  speed?: number;
}

/**
 * A layout wrapper that pins its container and scrolls the inner content horizontally
 * based on the user's vertical scroll progression.
 */
export function HorizontalScroll({ children, className, speed = 1 }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [scrollWidth, setScrollWidth] = useState(0);

  // Measure the total width of the horizontal content
  useEffect(() => {
    if (scrollContainerRef.current) {
      setScrollWidth(scrollContainerRef.current.scrollWidth);
    }
    
    const handleResize = () => {
      if (scrollContainerRef.current) {
        setScrollWidth(scrollContainerRef.current.scrollWidth);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [children]);

  useIsomorphicLayoutEffect(() => {
    // If reduced motion or small screen width (< 768px), fallback to native swipe scrolling
    if (prefersReducedMotion || scrollWidth <= window.innerWidth || window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      const scrollDistance = scrollWidth - window.innerWidth;
      
      gsap.to(scrollContainerRef.current, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${scrollDistance * speed}`,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [scrollWidth, speed, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div className={cn("w-full overflow-x-auto", className)}>
        <div className="flex w-max">{children}</div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn("relative w-full h-auto md:h-screen overflow-x-auto md:overflow-hidden pb-8 md:pb-0", className)}>
      <div 
        ref={scrollContainerRef} 
        className="relative md:absolute top-0 left-0 h-auto md:h-full flex items-center will-change-transform overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-none"
      >
        {children}
      </div>
    </div>
  );
}
