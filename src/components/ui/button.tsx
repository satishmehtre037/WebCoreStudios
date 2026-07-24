import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  /* Base styles shared by all variants */
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 motion-safe:active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-foreground hover:bg-primary/90 shadow-md hover:shadow-lg",
        secondary:
          "bg-surface text-foreground border border-border hover:bg-surface-elevated hover:border-foreground/20",
        ghost:
          "text-foreground hover:bg-foreground/5",
        outline:
          "border border-border text-foreground hover:bg-foreground/5 hover:border-foreground/30",
        accent:
          "bg-accent text-background hover:bg-accent/90",
        link:
          "text-foreground underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-lg",
        md: "h-11 px-6 text-sm rounded-xl",
        lg: "h-13 px-8 text-base rounded-xl",
        xl: "h-15 px-10 text-lg rounded-2xl",
        icon: "h-10 w-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as a child component (slot pattern) */
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
