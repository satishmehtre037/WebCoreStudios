"use client";

import { useEffect, useRef, useState } from "react";
import { createDropdownTimeline } from "@/animations/navbar/dropdownTimeline";
import { DropdownCard } from "./DropdownCard";
import { MEGA_MENU_DATA } from "@/config/site";
import { useUIStore } from "@/store";
import { cn } from "@/lib/utils";
import { gsap } from "@/lib/gsap";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline>(null);
  const { setCursorVariant } = useUIStore();

  useEffect(() => {
    if (!dropdownRef.current || !containerRef.current) return;

    // The cards are the elements with .dropdown-card class inside the container
    const cards = gsap.utils.toArray<HTMLElement>(".dropdown-card", containerRef.current);
    
    timelineRef.current = createDropdownTimeline(dropdownRef.current, cards);

    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      timelineRef.current?.play();
    } else {
      timelineRef.current?.reverse();
    }
  }, [isOpen]);

  return (
    <div 
      ref={dropdownRef}
      className="absolute top-full left-0 mt-4 w-[600px] max-w-[90vw] overflow-hidden rounded-2xl bg-surface/90 backdrop-blur-xl border border-white/10 shadow-2xl origin-top"
      onMouseLeave={onClose}
    >
      <div 
        ref={containerRef}
        className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
        onMouseEnter={() => setCursorVariant("default")}
      >
        {MEGA_MENU_DATA.map((item) => (
          <DropdownCard 
            key={item.title}
            title={item.title}
            description={item.description}
            href={item.href}
            onClick={onClose}
          />
        ))}
      </div>
    </div>
  );
}
