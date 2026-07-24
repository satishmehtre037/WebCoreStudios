"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import type { WithOptionalChildren, WithClassName } from "@/types";
import { cn } from "@/lib/utils";

interface WebGLCanvasProps extends WithOptionalChildren, WithClassName {
  /** Whether the canvas should be full-screen behind DOM content */
  fullscreen?: boolean;
  /** Camera field of view */
  fov?: number;
  /** Camera position */
  cameraPosition?: [number, number, number];
  /** Device pixel ratio clamp */
  dpr?: [number, number];
}

/**
 * Reusable WebGL Canvas container.
 * Renders a React Three Fiber canvas with sensible defaults.
 */
export function WebGLCanvas({
  children,
  className,
  fullscreen = false,
  fov = 45,
  cameraPosition = [0, 0, 5],
  dpr = [1, 2],
}: WebGLCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn(
        fullscreen && "pointer-events-none fixed inset-0",
        className
      )}
      style={fullscreen ? { zIndex: "var(--z-below)" as unknown as number } : undefined}
    >
      <Canvas
        camera={{ fov, position: cameraPosition, near: 0.1, far: 1000 }}
        dpr={dpr}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        {children}
        <Preload all />
      </Canvas>
    </div>
  );
}
