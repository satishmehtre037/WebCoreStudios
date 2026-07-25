"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container, Button } from "@/components/ui";
import { navigation } from "@/config/site";
import { useUIStore } from "@/store";
import { gsap, EASE } from "@/lib/gsap";

export function MobileMenu({ activeSection }: { activeSection: string }) {
  const { isMenuOpen, closeMenu } = useUIStore();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuRef.current) return;
    
    if (isMenuOpen) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, pointerEvents: "none" },
        { opacity: 1, pointerEvents: "auto", duration: 0.5, ease: EASE.smooth }
      );
      
      gsap.fromTo(
        menuRef.current.querySelectorAll(".mobile-nav-link"),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out", delay: 0.2 }
      );
    } else {
      gsap.to(menuRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.4,
        ease: EASE.smooth,
      });
    }
  }, [isMenuOpen]);

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 bg-[#170406]/98 backdrop-blur-2xl md:hidden opacity-0 pointer-events-none flex flex-col justify-between pt-24 pb-12 overflow-y-auto"
      style={{ zIndex: 90 }}
    >
      <Container className="my-auto">
        <nav className="flex flex-col items-start gap-6 sm:gap-8">
          {navigation.main.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "mobile-nav-link text-h2 font-bold transition-colors py-1 flex items-center gap-3",
                  isActive ? "text-accent" : "text-foreground hover:text-accent"
                )}
                onClick={closeMenu}
              >
                {isActive && <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />}
                {item.label}
              </Link>
            );
          })}
          <div className="mobile-nav-link mt-6 w-full pt-4 border-t border-white/10">
            <Button variant="primary" size="lg" className="w-full justify-center shadow-lg" onClick={closeMenu}>
              Start a Project
            </Button>
          </div>
        </nav>
      </Container>
    </div>
  );
}
