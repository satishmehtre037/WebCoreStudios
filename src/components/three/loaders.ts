"use client";

import { useGLTF, useTexture, useProgress } from "@react-three/drei";

/**
 * Reusable GLTF model loader hook.
 */
export function useModel(path: string) {
  const gltf = useGLTF(path);
  return gltf;
}

/**
 * Reusable texture loader hook with map support.
 */
export function useTextureMap(path: string) {
  const texture = useTexture(path);
  return texture;
}

/**
 * Scene loading progress hook (R3F Suspense-compatible).
 */
export function useSceneProgress() {
  const { progress, active, loaded, total } = useProgress();
  return { progress, active, loaded, total };
}

/* Preload directive for GLTF models */
export const preloadModel = useGLTF.preload;
