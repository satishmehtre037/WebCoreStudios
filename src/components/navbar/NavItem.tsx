"use client";

import { useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store";
import { gsap } from "@/lib/gsap";

interface NavItemProps {
  label: string;
  href: string;
  isActive: boolean;
  hasDropdown?: boolean;
  onMouseEnter?: () => void;
  onClick?: () => void;
}

export function NavItem({ label, href, isActive, hasDropdown, onMouseEnter, onClick }: NavItemProps) {
  const itemRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const { setCursorVariant } = useUIStore();

  const handleHover = (isHovering: boolean) => {
    if (!itemRef.current) return;
    
    // Tiny upward movement, no scale, no bounce
    gsap.to(itemRef.current, {
      y: isHovering ? -2 : 0,
      color: isHovering || isActive ? "rgb(255, 255, 255)" : "rgba(255, 255, 255, 0.6)",
      duration: 0.3,
      ease: "power2.out"
    });
    
    if (isHovering) {
      setCursorVariant("pointer");
      onMouseEnter?.();
    } else {
      setCursorVariant("default");
    }
  };

  const className = cn(
    "relative px-4 py-2 text-body-sm font-medium transition-colors duration-300 rounded-full",
    isActive ? "text-white" : "text-white/60"
  );

  const activePill = isActive && (
    <div 
      className="absolute inset-0 bg-[#5D0D18]/40 border border-[#5D0D18]/60 rounded-full -z-10"
      style={{ boxShadow: "0 0 10px rgba(93, 13, 24, 0.2)" }}
    />
  );

  if (hasDropdown) {
    return (
      <button 
        ref={itemRef as React.RefObject<HTMLButtonElement>}
        className={className}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        onClick={onClick}
      >
        {activePill}
        {label}
      </button>
    );
  }

  return (
    <Link 
      href={href}
      ref={itemRef as React.RefObject<HTMLAnchorElement>}
      className={className}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      onClick={onClick}
    >
      {activePill}
      {label}
    </Link>
  );
}
