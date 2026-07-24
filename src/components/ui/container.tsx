import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full", {
  variants: {
    size: {
      sm: "max-w-[40rem]",
      md: "max-w-[48rem]",
      lg: "max-w-[64rem]",
      xl: "max-w-[80rem]",
      "2xl": "max-w-[96rem]",
      full: "max-w-full",
    },
    padding: {
      default: "px-[clamp(1rem,5vw,2rem)]",
      none: "px-0",
      tight: "px-4",
      wide: "px-[clamp(1.5rem,6vw,3rem)]",
    },
  },
  defaultVariants: {
    size: "xl",
    padding: "default",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(containerVariants({ size, padding, className }))}
        {...props}
      />
    );
  }
);
Container.displayName = "Container";

export { Container, containerVariants };
