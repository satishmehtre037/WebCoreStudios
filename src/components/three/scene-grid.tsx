"use client";

import { Grid as DreiGrid } from "@react-three/drei";

interface SceneGridProps {
  cellSize?: number;
  cellThickness?: number;
  sectionSize?: number;
  sectionThickness?: number;
  fadeDistance?: number;
  fadeStrength?: number;
  cellColor?: string;
  sectionColor?: string;
  position?: [number, number, number];
  infiniteGrid?: boolean;
}

/**
 * Reusable ground grid for 3D scenes.
 */
export function SceneGrid({
  cellSize = 0.5,
  cellThickness = 0.5,
  sectionSize = 3,
  sectionThickness = 1,
  fadeDistance = 30,
  fadeStrength = 1,
  cellColor = "#1D1D1D",
  sectionColor = "#5D0D18",
  position = [0, -1, 0],
  infiniteGrid = true,
}: SceneGridProps) {
  return (
    <DreiGrid
      args={[10, 10]}
      cellSize={cellSize}
      cellThickness={cellThickness}
      sectionSize={sectionSize}
      sectionThickness={sectionThickness}
      fadeDistance={fadeDistance}
      fadeStrength={fadeStrength}
      cellColor={cellColor}
      sectionColor={sectionColor}
      position={position}
      infiniteGrid={infiniteGrid}
    />
  );
}
