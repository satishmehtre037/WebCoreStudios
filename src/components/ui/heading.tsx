import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("font-bold tracking-tight text-foreground", {
  variants: {
    level: {
      display: "text-display",
      h1: "text-h1",
      h2: "text-h2",
      h3: "text-h3",
      h4: "text-h4",
      h5: "text-h5",
    },
    tone: {
      default: "text-foreground",
      primary: "text-primary",
      accent: "text-accent",
      muted: "text-muted",
    },
  },
  defaultVariants: {
    level: "h2",
    tone: "default",
  },
});

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  /** The HTML tag to render. Defaults based on level. */
  as?: HeadingTag;
}

const tagMap: Record<string, HeadingTag> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
};

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level, tone, as, children, ...props }, ref) => {
    const Tag = as || tagMap[level || "h2"] || "h2";

    return (
      <Tag
        ref={ref}
        className={cn(headingVariants({ level, tone, className }))}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);
Heading.displayName = "Heading";

export { Heading, headingVariants };
