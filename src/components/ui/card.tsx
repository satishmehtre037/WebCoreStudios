import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "relative overflow-hidden transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        default:
          "bg-surface border border-border rounded-2xl",
        elevated:
          "bg-surface-elevated border border-border rounded-2xl shadow-lg hover:shadow-xl",
        glass:
          "bg-surface/30 backdrop-blur-md border border-foreground/10 rounded-2xl",
        outline:
          "bg-transparent border border-border rounded-2xl hover:border-foreground/20",
        ghost:
          "bg-transparent rounded-2xl",
      },
      padding: {
        default: "p-6",
        lg: "p-8",
        xl: "p-10",
        sm: "p-4",
        none: "p-0",
      },
      hover: {
        none: "",
        lift: "hover:-translate-y-1",
        glow: "hover:shadow-glow",
        scale: "hover:scale-[1.02]",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
      hover: "none",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, hover, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, hover, className }))}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

/* ── Card Sub-components ─────────────────────────────────────── */
const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1.5", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mt-4", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mt-6 flex items-center gap-3", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardContent, CardFooter, cardVariants };
