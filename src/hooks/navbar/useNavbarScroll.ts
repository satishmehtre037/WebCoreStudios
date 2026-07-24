import { useEffect, useState, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { navigation } from "@/config/site";

export function useNavbarScroll() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const navbarRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null); // The glass container

  useEffect(() => {
    // Initial Load Animation
    if (navbarRef.current) {
      gsap.fromTo(navbarRef.current, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.5 }
      );
    }

    let lastScrollY = window.scrollY;

    function handleScroll() {
      const currentScrollY = window.scrollY;
      const isScrolled = currentScrollY > 50;
      const isScrollingDown = currentScrollY > lastScrollY && isScrolled;
      
      setScrolled(isScrolled);

      // Scroll Behavior:
      // While scrolling down: navbar slightly shrinks (scale), padding decreases, blur increases.
      // When scrolling up: expands smoothly (but no snapping, just scale transition).
      if (innerRef.current) {
        if (isScrollingDown) {
          gsap.to(innerRef.current, {
            scale: 0.98,
            y: -5,
            boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)",
            duration: 0.4,
            ease: "power2.out",
          });
        } else {
          gsap.to(innerRef.current, {
            scale: 1,
            y: 0,
            boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
            duration: 0.4,
            ease: "power2.out",
          });
        }
      }

      // Scroll Spy Logic
      const sections = navigation.main
        .map((nav) => nav.href.replace("/#", ""))
        .filter(Boolean);

      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = `/#${section}`;
            break;
          }
        }
      }
      
      if (currentScrollY < window.innerHeight / 2 && current === "") {
        current = "/";
      }

      if (current && current !== activeSection) {
        setActiveSection(current);
      }

      lastScrollY = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrolled, activeSection, navbarRef, innerRef };
}
