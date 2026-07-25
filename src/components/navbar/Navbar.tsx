"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Container, Button, Logo } from "@/components/ui";
import { navigation, siteConfig } from "@/config/site";
import { useUIStore } from "@/store";
import { useNavbarScroll } from "@/hooks/navbar/useNavbarScroll";
import { NavItem } from "./NavItem";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { gsap } from "@/lib/gsap";

export function Navbar() {
  const { isMenuOpen, toggleMenu, closeMenu, setCursorVariant } = useUIStore();
  const pathname = usePathname();
  const { scrolled, activeSection, navbarRef, innerRef } = useNavbarScroll();
  
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleLogoHover = (isHovering: boolean) => {
    if (isHovering) {
      setCursorVariant("pointer");
      gsap.to(".navbar-logo", { rotation: 5, duration: 0.3, ease: "power2.out" });
    } else {
      setCursorVariant("default");
      gsap.to(".navbar-logo", { rotation: 0, duration: 0.3, ease: "power2.out" });
    }
  };

  return (
    <>
      <header
        ref={navbarRef}
        className="fixed top-0 left-0 right-0 pt-3 sm:pt-6 px-3 sm:px-4 md:px-8 transition-all duration-500 ease-out"
        style={{ zIndex: "var(--z-navbar)" as unknown as number }}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <div 
          ref={innerRef}
          className="max-w-7xl mx-auto rounded-[1.5rem] sm:rounded-[2rem] bg-[#170406]/75 backdrop-blur-md border border-white/10 shadow-2xl relative"
          style={{ backgroundImage: 'url("/noise.png")', backgroundSize: '100px 100px', backgroundBlendMode: 'overlay' }}
        >
          <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 sm:gap-3 text-foreground transition-colors hover:text-accent group"
              onClick={closeMenu}
              onMouseEnter={() => handleLogoHover(true)}
              onMouseLeave={() => handleLogoHover(false)}
            >
              <div className="navbar-logo w-7 h-7 sm:w-8 sm:h-8 text-foreground group-hover:text-accent transition-colors duration-300 shrink-0">
                <Logo strokeWidth={2} />
              </div>
              <span className="text-body-sm font-bold tracking-tight text-foreground">{siteConfig.name}</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2 relative">
              {navigation.main.filter(item => item.href !== "/").map((item) => {
                const isActive = activeSection === item.href;
                
                // If it's Work, we treat it as a dropdown trigger for Products.
                if (item.label === "Work") {
                  return (
                    <div key={item.href} onMouseEnter={() => setActiveDropdown(item.label)}>
                      <NavItem 
                        label={item.label}
                        href={item.href}
                        isActive={isActive || activeDropdown === item.label}
                        hasDropdown
                      />
                    </div>
                  );
                }

                return (
                  <div key={item.href} onMouseEnter={() => setActiveDropdown(null)}>
                    <NavItem 
                      label={item.label}
                      href={item.href}
                      isActive={isActive}
                    />
                  </div>
                );
              })}

              {/* Mega Menu Portal relative to nav */}
              <MegaMenu 
                isOpen={activeDropdown === "Work"} 
                onClose={() => setActiveDropdown(null)} 
              />
            </nav>

            {/* CTA */}
            <div className="hidden md:block">
              <Button 
                variant="primary" 
                size="sm"
                className="rounded-full shadow-[0_0_15px_rgba(93,13,24,0.4)]"
                onMouseEnter={() => setCursorVariant("pointer")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                Start a Project
              </Button>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 z-50 focus:outline-none"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <span className={cn("block w-5 h-0.5 bg-foreground transition-transform duration-300", isMenuOpen && "translate-y-2 rotate-45")} />
              <span className={cn("block w-5 h-0.5 bg-foreground transition-opacity duration-300", isMenuOpen && "opacity-0")} />
              <span className={cn("block w-5 h-0.5 bg-foreground transition-transform duration-300", isMenuOpen && "-translate-y-2 -rotate-45")} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenu activeSection={activeSection} />
    </>
  );
}
