"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap";

interface DropdownCardProps {
  title: string;
  description: string;
  href: string;
  onClick?: () => void;
}

export function DropdownCard({ title, description, href, onClick }: DropdownCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      y: -3,
      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)",
      backgroundColor: "rgba(255,255,255,0.05)",
      borderColor: "rgba(255,255,255,0.2)",
      duration: 0.3,
      ease: "power2.out",
    });
    
    const arrow = cardRef.current.querySelector(".card-arrow");
    if (arrow) {
      gsap.to(arrow, { x: 4, opacity: 1, duration: 0.3, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: "none",
      backgroundColor: "transparent",
      borderColor: "rgba(255,255,255,0.05)",
      duration: 0.3,
      ease: "power2.out",
    });
    
    const arrow = cardRef.current.querySelector(".card-arrow");
    if (arrow) {
      gsap.to(arrow, { x: 0, opacity: 0.5, duration: 0.3, ease: "power2.out" });
    }
  };

  return (
    <Link 
      href={href}
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="dropdown-card flex flex-col p-4 rounded-xl border border-white/5 transition-colors"
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-body-sm font-semibold text-foreground">{title}</h4>
        <ArrowRight size={14} className="card-arrow text-accent opacity-50" />
      </div>
      <p className="text-caption text-foreground-secondary">{description}</p>
    </Link>
  );
}
