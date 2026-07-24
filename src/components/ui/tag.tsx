import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tagVariants = cva(
  "inline-flex items-center gap-1 font-medium transition-colors duration-200",
  {
    variants: {
      variant: {
        default:
          "bg-surface border border-border text-foreground-secondary",
        primary:
          "bg-primary/10 border border-primary/20 text-primary",
        accent:
          "bg-accent/10 border border-accent/20 text-accent",
        outline:
          "bg-transparent border border-border text-foreground-secondary",
      },
      size: {
        sm: "px-2 py-0.5 text-[11px] rounded-md tracking-wider uppercase",
        md: "px-3 py-1 text-xs rounded-lg tracking-wide uppercase",
        lg: "px-4 py-1.5 text-sm rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {}

const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(tagVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Tag.displayName = "Tag";

/* ── Pill (rounded-full variant) ─────────────────────────────── */
const pillVariants = cva(
  "inline-flex items-center gap-1 font-medium rounded-full transition-colors duration-200",
  {
    variants: {
      variant: {
        default:
          "bg-surface border border-border text-foreground-secondary",
        primary:
          "bg-primary/10 border border-primary/20 text-primary",
        accent:
          "bg-accent/10 border border-accent/20 text-accent",
        outline:
          "bg-transparent border border-border text-foreground-secondary",
      },
      size: {
        sm: "px-2.5 py-0.5 text-[11px] tracking-wider uppercase",
        md: "px-3.5 py-1 text-xs tracking-wide uppercase",
        lg: "px-5 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface PillProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof pillVariants> {}

const Pill = forwardRef<HTMLSpanElement, PillProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(pillVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Pill.displayName = "Pill";

export { Tag, tagVariants, Pill, pillVariants };
