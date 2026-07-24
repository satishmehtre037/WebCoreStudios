"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { ButtonBackground } from "./ButtonBackground";
import { ButtonLabel } from "./ButtonLabel";
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
      size = "md",
      showArrow = false,
      arrowSize = 16,
      disabled = false,
      className,
      ...props
    },
    forwardedRef
  ) => {
    const { buttonRef, sweepRef, labelRef, arrowRef } = useButtonHover<HTMLButtonElement>({
      variant,
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

    const variantStyles = {
      primary:
        "bg-[#5D0D18] text-[#FFF9EB] border border-[#5D0D18]/40 shadow-[0_4px_14px_rgba(93,13,24,0.35)]",
      secondary:
        "bg-[#25070B] text-[#FFF9EB] border border-border/80 shadow-md",
      outline:
        "bg-transparent text-[#FFF9EB] border border-border/80 hover:border-primary/60",
      ghost:
        "bg-transparent text-[#FFF9EB]/80 hover:text-[#FFF9EB]",
    };

    const sizeStyles = {
      sm: "px-5 py-2.5 text-body-sm gap-2",
      md: "px-7 py-3.5 text-body-md gap-3",
      lg: "px-9 py-4 text-body-lg gap-3.5",
      icon: "p-3 rounded-full flex items-center justify-center",
    };

    return (
      <button
        ref={setRefs}
        disabled={disabled}
        className={cn(
          "relative inline-flex items-center justify-center font-medium rounded-full cursor-pointer select-none overflow-hidden",
          "will-change-transform transform-gpu transition-colors duration-300",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {/* Background Sweep Highlight */}
        <ButtonBackground ref={sweepRef} variant={variant} />

        {/* Text Label */}
        <ButtonLabel ref={labelRef}>{children}</ButtonLabel>

        {/* Arrow Icon */}
        {showArrow && <ButtonArrow ref={arrowRef} size={arrowSize} />}
      </button>
    );
  }
);

Button.displayName = "Button";
