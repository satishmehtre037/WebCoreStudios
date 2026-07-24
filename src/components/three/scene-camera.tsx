"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { lerp } from "@/lib/utils";

interface SceneCameraProps {
  fov?: number;
  position?: [number, number, number];
  enableParallax?: boolean;
  parallaxStrength?: number;
}

/**
 * Reusable scene camera with optional mouse-driven parallax.
 */
export function SceneCamera({
  fov = 45,
  position = [0, 0, 5],
  enableParallax = false,
  parallaxStrength = 0.1,
}: SceneCameraProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const { mouse } = useThree();

  useFrame(() => {
    if (!cameraRef.current || !enableParallax) return;

    cameraRef.current.position.x = lerp(
      cameraRef.current.position.x,
      mouse.x * parallaxStrength,
      0.05
    );
    cameraRef.current.position.y = lerp(
      cameraRef.current.position.y,
      mouse.y * parallaxStrength,
      0.05
    );
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={fov}
      position={position}
      near={0.1}
      far={1000}
    />
  );
}
