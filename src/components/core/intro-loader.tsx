"use client";

import { useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import { useLoading } from "@/providers/loading-provider";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { gsap, EASE } from "@/lib/gsap";
import { WebGLCanvas, SceneCamera, Particles, SceneGrid, WireframeTorus } from "@/components/three";
import { Logo } from "@/components/ui";

export function IntroLoader() {
  const { isLoading, finishLoading } = useLoading();
  const prefersReducedMotion = usePrefersReducedMotion();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const noiseRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const blueprintRef = useRef<SVGSVGElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const textRef1 = useRef<HTMLDivElement>(null); // WEBCORE
  const textRef2 = useRef<HTMLDivElement>(null); // STUDIOS
  const wordsRef = useRef<HTMLDivElement>(null);
  const threeRef = useRef<HTMLDivElement>(null);
  
  const [shouldRender, setShouldRender] = useState(true);

  useIsomorphicLayoutEffect(() => {
    const hasRun = sessionStorage.getItem("webcore_intro_played");
    if (hasRun || !isLoading) {
      setShouldRender(false);
      finishLoading();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("webcore_intro_played", "true");
        finishLoading();
        setShouldRender(false);
      },
    });

    if (prefersReducedMotion) {
      tl.to(logoWrapperRef.current, { opacity: 1, duration: 0.8, ease: EASE.smooth })
        .to([textRef1.current, textRef2.current], { opacity: 1, duration: 0.8, ease: EASE.smooth }, "-=0.4")
        .to({}, { duration: 1.0 })
        .to(containerRef.current, { opacity: 0, duration: 0.5, ease: EASE.smooth });
    } else {
      // SCENE 01: Pure black, silence, subtle film grain
      // CSS bg-background (Dark Oxblood) starts opacity 1
      tl.to(noiseRef.current, { opacity: 0.05, duration: 0.5, ease: "none" }, 0);
      tl.to(threeRef.current, { opacity: 0.2, duration: 1.0, ease: "power1.inOut" }, 0.2); // Tiny floating particles

      // SCENE 02: Deep wine gradient fades in
      tl.to(gradientRef.current, { opacity: 0.4, scale: 1.1, duration: 1.5, ease: "power2.out" }, 0.5);

      // SCENE 03 & 04: Architectural lines draw & network nodes connect
      if (blueprintRef.current) {
        tl.to(".blueprint-line", { strokeDashoffset: 0, duration: 1.5, stagger: 0.1, ease: "power2.inOut" }, 0.5);
        tl.to(".blueprint-node", { opacity: 1, scale: 1, duration: 1.0, stagger: 0.05, ease: "back.out(1.5)" }, 1.0);
      }

      // SCENE 05: WebCore logo outline drawn
      tl.to([".logo-tile", ".logo-mark"], { strokeDashoffset: 0, duration: 1.0, stagger: 0.1, ease: "power2.inOut" }, 1.2);

      // SCENE 06: Logo settles, small glow and glossy tile fill
      tl.to(".logo-tile", { fill: "#C1502F", duration: 0.5, ease: EASE.smooth }, 2.0);
      tl.to(".logo-mark", { stroke: "#FDF5E6", duration: 0.5, ease: EASE.smooth }, 2.0);
      tl.to(logoWrapperRef.current, { 
        boxShadow: "inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.5), 0 4px 15px rgba(193,80,47,0.4)",
        duration: 0.8 
      }, 2.0);

      // SCENE 07: Large typography reveals (WEBCORE then STUDIOS)
      const revealText = (ref: React.RefObject<HTMLDivElement | null>, startTime: number) => {
        if (ref.current) {
          const chars = ref.current.querySelectorAll(".char");
          tl.fromTo(chars, 
            { opacity: 0, y: 10, filter: "blur(6px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out", stagger: 0.03 },
            startTime
          );
        }
      };
      revealText(textRef1, 2.2);
      revealText(textRef2, 2.4);

      // SCENE 08: Tagline morphing
      if (wordsRef.current) {
        const words = wordsRef.current.querySelectorAll(".word");
        const durationPerWord = 0.35; // Slower, confident pacing for 4 words
        words.forEach((word, index) => {
          const start = 2.8 + index * durationPerWord;
          tl.fromTo(word, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "none" }, start);
          if (index < words.length - 1) {
            tl.to(word, { opacity: 0, duration: 0.2, ease: "none" }, start + durationPerWord - 0.05);
          }
        });
      }

      // SCENE 09: Background more alive
      tl.to(threeRef.current, { opacity: 0.8, duration: 1.0, ease: "power2.inOut" }, 3.0);

      // SCENE 10: Thin light passes across the logo
      tl.fromTo(sweepRef.current, 
        { left: "-100%" }, 
        { left: "200%", duration: 1.0, ease: "power2.inOut" }, 
        3.5
      );

      // SCENE 11: Entire composition fades out together
      tl.to(containerRef.current, { 
        opacity: 0, 
        duration: 1.0, 
        ease: "power2.inOut" 
      }, 4.2); // Triggers right after taglines finish
    }

    return () => {
      tl.kill();
    };
  }, [isLoading, finishLoading, prefersReducedMotion]);

  if (!shouldRender) return null;

  const taglines = [
    "Engineering.",
    "Software.",
    "AI.",
    "Automation."
  ];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex flex-col items-center justify-center bg-background text-foreground overflow-hidden"
      style={{ zIndex: 9999 }}
    >
      {/* Film Grain Noise Overlay */}
      <div 
        ref={noiseRef} 
        className="absolute inset-0 opacity-0 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("/noise.png")', backgroundSize: '100px 100px' }} 
      />

      {/* Background Bloom */}
      <div
        ref={gradientRef}
        className="absolute inset-0 opacity-0 scale-90 pointer-events-none"
        style={{ background: "radial-gradient(circle at center, rgba(193,80,47,0.3) 0%, transparent 60%)" }}
      />

      {/* SVG Blueprint & Nodes */}
      <svg 
        ref={blueprintRef}
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <path className="blueprint-line" d="M 20 0 L 20 100" stroke="#C1502F" strokeWidth="0.1" fill="none" strokeDasharray="100" strokeDashoffset="100" />
        <path className="blueprint-line" d="M 80 0 L 80 100" stroke="#C1502F" strokeWidth="0.1" fill="none" strokeDasharray="100" strokeDashoffset="100" />
        <path className="blueprint-line" d="M 0 30 L 100 30" stroke="#C1502F" strokeWidth="0.1" fill="none" strokeDasharray="100" strokeDashoffset="100" />
        <path className="blueprint-line" d="M 0 70 L 100 70" stroke="#C1502F" strokeWidth="0.1" fill="none" strokeDasharray="100" strokeDashoffset="100" />
        
        <circle className="blueprint-node opacity-0" cx="20" cy="30" r="0.4" fill="#C1502F" />
        <circle className="blueprint-node opacity-0" cx="80" cy="30" r="0.4" fill="#C1502F" />
        <circle className="blueprint-node opacity-0" cx="20" cy="70" r="0.4" fill="#C1502F" />
        <circle className="blueprint-node opacity-0" cx="80" cy="70" r="0.4" fill="#C1502F" />
      </svg>

      {/* Three.js Layer (Particles & Grid) */}
      <div ref={threeRef} className="absolute inset-0 opacity-0 pointer-events-none">
        <WebGLCanvas fullscreen fov={50} cameraPosition={[0, 2, 6]}>
          <SceneCamera enableParallax={false} position={[0, 1, 5]} />
          <Particles count={150} speed={0.0001} size={0.012} opacity={0.2} color="#FDF5E6" />
          <SceneGrid fadeDistance={20} cellColor="#351414" sectionColor="#4A1D1D" position={[0, -1, 0]} />
          <WireframeTorus radius={3} tube={0.1} segments={64} color="#4A1D1D" rotationSpeed={0.001} position={[0, 0, -2]} />
        </WebGLCanvas>
      </div>

      {/* Main Foreground Content */}
      <div className="relative flex flex-col items-center text-center z-10">
        
        {/* Logo with Light Sweep */}
        <div 
          ref={logoWrapperRef} 
          className="relative w-16 h-16 md:w-20 md:h-20 mb-8 overflow-hidden rounded-[1rem] text-foreground" 
          style={{ opacity: prefersReducedMotion ? 0 : 1 }}
        >
          <Logo strokeWidth={2.5} />
          <div 
            ref={sweepRef}
            className="absolute inset-0 w-full h-full -skew-x-12"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
              left: "-100%",
              mixBlendMode: "overlay"
            }}
          />
        </div>

        {/* Typography */}
        <div className="flex flex-col items-center leading-none" style={{ opacity: prefersReducedMotion ? 0 : 1 }}>
          <h1 ref={textRef1} className="text-h2 md:text-h1 font-bold tracking-[0.15em] uppercase">
            {"WEBCORE".split("").map((char, i) => (
              <span key={i} className="char inline-block">{char}</span>
            ))}
          </h1>
          <h2 ref={textRef2} className="text-h3 md:text-h2 tracking-[0.2em] uppercase text-foreground-secondary mt-2">
            {"STUDIOS".split("").map((char, i) => (
              <span key={i} className="char inline-block">{char}</span>
            ))}
          </h2>
        </div>

        {/* Taglines */}
        <div ref={wordsRef} className="relative h-6 mt-8 text-body-lg text-accent overflow-hidden w-full flex justify-center">
          {taglines.map((word, i) => (
            <span key={i} className="word absolute opacity-0 font-medium whitespace-nowrap">
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
