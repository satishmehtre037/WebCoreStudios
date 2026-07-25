"use client";

import { useRef, useState, useEffect } from "react";
import { useUIStore } from "@/store";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useWindowSize } from "@/hooks/use-window-size";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import { gsap, EASE } from "@/lib/gsap";
import { WebGLCanvas, SceneCamera, Particles, SceneGrid, SceneLights } from "@/components/three";
import { Section, Container, Heading, Button } from "@/components/ui";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const { isLoading, setCursorVariant } = useUIStore();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { width } = useWindowSize();
  const isMobile = width ? width < 768 : false;

  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  // Mount flag for Three.js to prevent hydration mismatch
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  useIsomorphicLayoutEffect(() => {
    // Wait until global loading is finished before playing entrance animation
    if (isLoading) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      if (prefersReducedMotion) {
        tl.to([headlineRef.current, subheadRef.current, actionsRef.current], {
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: EASE.smooth,
        });
      } else {
        // Headline text reveal (blur to focus, upward motion)
        if (headlineRef.current) {
          const words = headlineRef.current.querySelectorAll(".word");
          tl.fromTo(
            words,
            { opacity: 0, y: 30, filter: "blur(8px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1.2,
              stagger: 0.08,
              ease: "power3.out",
            }
          );
        }

        // Sub-headline fade and slide up
        tl.fromTo(
          subheadRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          "-=0.6"
        );

        // Actions fade in
        tl.fromTo(
          actionsRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoading, prefersReducedMotion]);

  // Wrap headline words for animation
  const headlineText = "We engineer premium digital products, not just websites.";
  const headlineWords = headlineText.split(" ").map((word, i) => (
    <span key={i} className="word inline-block opacity-0">
      {word}&nbsp;
    </span>
  ));

  return (
    <Section ref={sectionRef} className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[rgb(var(--raw-wine-black))] text-foreground pt-28 sm:pt-32 md:pt-36 pb-16 md:pb-24">
      
      {/* Three.js Background Scene — ambient, not dominant */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        {isMounted && (
          <WebGLCanvas fullscreen fov={45} cameraPosition={[0, 1.5, 6]}>
            <SceneCamera enableParallax={!prefersReducedMotion && !isMobile} parallaxStrength={0.15} position={[0, 1, 6]} />
            <SceneLights ambientIntensity={0.15} pointLightIntensity={0.5} />
            <Particles count={isMobile ? 80 : 200} speed={0.0002} size={0.015} opacity={0.2} color="#9FB2AC" />
            <SceneGrid fadeDistance={isMobile ? 15 : 25} cellColor="#2A060C" sectionColor="#3B0812" position={[0, -1, 0]} />
          </WebGLCanvas>
        )}
      </div>

      <Container className="relative z-10 flex flex-col items-start md:items-start text-left md:text-left mt-0 md:-mt-12">
        {/* Brand Tag */}
        <span 
          className="text-accent text-caption tracking-widest uppercase mb-4 sm:mb-6 opacity-0"
          style={{ animation: !isLoading ? "fadeIn 1s ease forwards 0.2s" : "none" }}
        >
          WebCore Studios
        </span>

        {/* Headline */}
        <Heading 
          ref={headlineRef}
          level="display" 
          tone="default"
          className="max-w-[18ch] leading-[1.05] mb-6 sm:mb-8 text-[2.25rem] sm:text-[3.5rem] md:text-display"
        >
          {prefersReducedMotion ? (
            <span className="opacity-0">{headlineText}</span>
          ) : (
            headlineWords
          )}
        </Heading>

        {/* Sub-headline */}
        <p 
          ref={subheadRef}
          className="text-body-md sm:text-body-lg text-foreground-secondary max-w-xl mb-10 sm:mb-14 opacity-0"
        >
          Bridging the gap between high-end aesthetic design and enterprise-grade software architecture.
        </p>

        {/* Actions */}
        <div ref={actionsRef} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 opacity-0 w-full sm:w-auto">
          <Button 
            variant="primary" 
            size="lg" 
            showArrow
            className="w-full sm:w-auto justify-center"
            onMouseEnter={() => setCursorVariant("pointer")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            View Our Work
          </Button>
          <Button 
            variant="ghost" 
            size="lg" 
            showArrow
            className="w-full sm:w-auto justify-center text-foreground-secondary hover:text-foreground"
            onMouseEnter={() => setCursorVariant("pointer")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            Start a Project
          </Button>
        </div>
      </Container>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Section>
  );
}
