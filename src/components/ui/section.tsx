import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sectionVariants = cva("relative w-full", {
  variants: {
    spacing: {
      default: "py-[clamp(4rem,10vw,8rem)]",
      lg: "py-[clamp(6rem,14vw,12rem)]",
      sm: "py-[clamp(2rem,6vw,4rem)]",
      none: "py-0",
    },
    background: {
      transparent: "bg-transparent",
      default: "bg-background",
      surface: "bg-surface",
      primary: "bg-primary",
      dark: "bg-[rgb(var(--raw-wine-black))]",
    },
  },
  defaultVariants: {
    spacing: "default",
    background: "transparent",
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  /** HTML tag — defaults to <section> */
  as?: "section" | "div" | "article" | "aside" | "header" | "footer";
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing, background, as: Component = "section", ...props }, ref) => {
    return (
      <Component
        ref={ref as any}
        className={cn(sectionVariants({ spacing, background, className }))}
        {...props}
      />
    );
  }
);
Section.displayName = "Section";

export { Section, sectionVariants };
