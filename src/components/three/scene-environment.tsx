"use client";

import { Environment as DreiEnvironment } from "@react-three/drei";

interface SceneEnvironmentProps {
  preset?: "sunset" | "dawn" | "night" | "warehouse" | "forest" | "apartment" | "studio" | "city" | "park" | "lobby";
  backgroundBlur?: number;
  backgroundIntensity?: number;
  environmentIntensity?: number;
}

/**
 * Reusable HDR environment for PBR materials.
 */
export function SceneEnvironment({
  preset = "city",
  backgroundBlur = 0.5,
  backgroundIntensity = 0,
  environmentIntensity = 0.5,
}: SceneEnvironmentProps) {
  return (
    <DreiEnvironment
      preset={preset}
      backgroundBlurriness={backgroundBlur}
      backgroundIntensity={backgroundIntensity}
      environmentIntensity={environmentIntensity}
    />
  );
}
