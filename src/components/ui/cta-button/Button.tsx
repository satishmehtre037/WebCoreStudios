"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { ButtonBackground } from "./ButtonBackground";
import { ButtonText } from "./ButtonText";
import { ButtonArrow } from "./ButtonArrow";
import { useButtonHover } from "@/hooks/useButtonHover";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
  showArrow?: boolean;
  arrowSize?: number;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "lg",
      showArrow = false,
      arrowSize = 18,
      disabled = false,
      className,
      ...props
    },
    forwardedRef
  ) => {
    const { buttonRef, hoverLayerRef, textRef, arrowRef } = useButtonHover<HTMLButtonElement>({
      disabled,
    });

    const setRefs = (node: HTMLButtonElement | null) => {
      buttonRef.current = node;
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      }
    };

    return (
      <button
        ref={setRefs}
        disabled={disabled}
        className={cn(
          "relative inline-flex items-center justify-center gap-3 font-medium cursor-pointer select-none overflow-hidden",
          "h-[56px] px-8 rounded-full border border-white/[0.08] text-[#FFF9EB]",
          "shadow-[0_4px_14px_rgba(93,13,24,0.35)]",
          "will-change-transform transform-gpu",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          className
        )}
        {...props}
      >
        {/* Layer 1 Base & Layer 2 Lighter Bloodstone Glossy Sweep */}
        <ButtonBackground ref={hoverLayerRef} />

        {/* Text Label */}
        <ButtonText ref={textRef}>{children}</ButtonText>

        {/* Arrow Icon */}
        {showArrow && <ButtonArrow ref={arrowRef} size={arrowSize} />}
      </button>
    );
  }
);

Button.displayName = "Button";
