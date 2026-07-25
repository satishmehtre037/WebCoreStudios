"use client";

import { useRef, useState, useEffect } from "react";
import { CONTACT_DATA } from "@/config/site";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useWindowSize } from "@/hooks/use-window-size";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import { useUIStore } from "@/store";
import { gsap, EASE } from "@/lib/gsap";
import { WebGLCanvas, SceneCamera, Particles, SceneGrid } from "@/components/three";
import { Section, Container, Heading, Button } from "@/components/ui";

export function Contact() {
  const { setCursorVariant } = useUIStore();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { width } = useWindowSize();
  const isMobile = width ? width < 768 : false;

  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%", // Trigger animation when section scrolls into view
        },
      });

      if (prefersReducedMotion) {
        tl.to([headlineRef.current, actionsRef.current], {
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

        // Actions fade in
        tl.fromTo(
          actionsRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const headlineWords = CONTACT_DATA.headline.split(" ").map((word, i) => (
    <span key={i} className="word inline-block opacity-0">
      {word}&nbsp;
    </span>
  ));

  return (
    <Section 
      id="contact" 
      ref={sectionRef} 
      className="relative min-h-[80svh] flex items-center justify-center overflow-hidden bg-[rgb(var(--raw-wine-black))] text-foreground"
    >
      {/* Three.js Background Scene - Quiet echo of the loading/hero sequence */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        {isMounted && (
          <WebGLCanvas fullscreen fov={45} cameraPosition={[0, 1.5, 6]}>
            <SceneCamera enableParallax={!prefersReducedMotion && !isMobile} parallaxStrength={0.1} position={[0, 1, 6]} />
            {/* Slower, subtler particles for the closing chapter */}
            <Particles count={isMobile ? 60 : 150} speed={0.00015} size={0.012} opacity={0.15} color="#9FB2AC" />
            <SceneGrid fadeDistance={isMobile ? 15 : 25} cellColor="#2A060C" sectionColor="#3B0812" position={[0, -1, 0]} />
          </WebGLCanvas>
        )}
      </div>

      <Container className="relative z-10 flex flex-col items-center text-center py-20">
        
        {/* Headline */}
        <Heading 
          ref={headlineRef}
          level="display" 
          tone="default"
          className="max-w-[15ch] leading-[1.05] mb-10 sm:mb-12 lg:mb-16 text-[2.25rem] sm:text-[3.5rem] md:text-display"
        >
          {prefersReducedMotion ? (
            <span className="opacity-0">{CONTACT_DATA.headline}</span>
          ) : (
            headlineWords
          )}
        </Heading>

        {/* Direct Contact Options */}
        <div ref={actionsRef} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-6 opacity-0 w-full sm:w-auto">
          <Button 
            variant="primary" 
            size="lg" 
            showArrow
            className="w-full sm:w-auto justify-center"
            onClick={() => window.location.href = `mailto:${CONTACT_DATA.email}`}
            onMouseEnter={() => setCursorVariant("pointer")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            Email Us
          </Button>

          <Button 
            variant="secondary" 
            size="lg" 
            showArrow
            className="w-full sm:w-auto justify-center"
            onClick={() => window.open(`https://wa.me/${CONTACT_DATA.whatsapp.replace(/\D/g, '')}`, "_blank", "noopener,noreferrer")}
            onMouseEnter={() => setCursorVariant("pointer")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            WhatsApp
          </Button>

          <Button 
            variant="ghost" 
            size="lg" 
            className="w-full sm:w-auto justify-center"
            onClick={() => window.location.href = `tel:${CONTACT_DATA.phone.replace(/\D/g, '')}`}
            onMouseEnter={() => setCursorVariant("pointer")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            Call Us
          </Button>
        </div>
      </Container>
    </Section>
  );
}
