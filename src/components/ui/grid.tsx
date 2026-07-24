import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const gridVariants = cva("grid w-full", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
      6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
    },
    gap: {
      sm: "gap-[clamp(0.5rem,1.5vw,1rem)]",
      default: "gap-[clamp(1rem,3vw,2rem)]",
      lg: "gap-[clamp(1.5rem,4vw,3rem)]",
      none: "gap-0",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
  },
  defaultVariants: {
    cols: 3,
    gap: "default",
    align: "stretch",
  },
});

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {}

const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, align, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(gridVariants({ cols, gap, align, className }))}
        {...props}
      />
    );
  }
);
Grid.displayName = "Grid";

export { Grid, gridVariants };
