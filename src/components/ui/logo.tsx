import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  strokeWidth?: number;
}

/**
 * Geometric WebCore Studios Logo Mark
 */
export function Logo({ className, strokeWidth = 2 }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("w-full h-full", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <path
        className="logo-mark"
        d="M 20 30 L 35 70 L 50 40 L 65 70 L 80 30"
        strokeDasharray="200"
        strokeDashoffset="0"
      />
      <rect
        className="logo-tile"
        x="10"
        y="10"
        width="80"
        height="80"
        rx="20"
        strokeDasharray="320"
        strokeDashoffset="0"
      />
    </svg>
  );
}
