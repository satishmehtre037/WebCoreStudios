"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface WireframeSphereProps {
  radius?: number;
  segments?: number;
  color?: string;
  rotationSpeed?: number;
  position?: [number, number, number];
}

/**
 * Animated wireframe sphere for geometric visual accents.
 */
export function WireframeSphere({
  radius = 1,
  segments = 24,
  color = "#C1502F",
  rotationSpeed = 0.001,
  position = [0, 0, 0],
}: WireframeSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += rotationSpeed;
    meshRef.current.rotation.x += rotationSpeed * 0.5;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[radius, segments, segments]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
    </mesh>
  );
}

interface WireframeTorusProps {
  radius?: number;
  tube?: number;
  segments?: number;
  color?: string;
  rotationSpeed?: number;
  position?: [number, number, number];
}

/**
 * Animated wireframe torus for decorative backgrounds.
 */
export function WireframeTorus({
  radius = 1.5,
  tube = 0.4,
  segments = 32,
  color = "#C1502F",
  rotationSpeed = 0.002,
  position = [0, 0, 0],
}: WireframeTorusProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += rotationSpeed;
    meshRef.current.rotation.z += rotationSpeed * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[radius, tube, segments, segments]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.2} />
    </mesh>
  );
}
