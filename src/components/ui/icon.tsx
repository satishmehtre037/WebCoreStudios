import { forwardRef } from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  size?: number;
  strokeWidth?: number;
}

/**
 * Wrapper for Lucide icons with consistent sizing.
 */
const Icon = forwardRef<HTMLDivElement, IconProps>(
  ({ icon: LucideIconComponent, size = 20, strokeWidth = 1.5, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("inline-flex shrink-0", className)} {...props}>
        <LucideIconComponent size={size} strokeWidth={strokeWidth} />
      </div>
    );
  }
);
Icon.displayName = "Icon";

export { Icon };
