"use client";

import * as THREE from "three";

/**
 * Premade materials using the design system palette.
 * Import and reuse across any Three.js scene.
 */
export const materials = {
  /** Bloodstone red glass-like material */
  bloodstone: new THREE.MeshPhysicalMaterial({
    color: "#5D0D18",
    metalness: 0.2,
    roughness: 0.1,
    transmission: 0.9,
    thickness: 0.5,
    transparent: true,
    opacity: 0.8,
  }),

  /** Dark wine opaque material */
  darkWine: new THREE.MeshStandardMaterial({
    color: "#3B0812",
    metalness: 0.4,
    roughness: 0.6,
  }),

  /** Misty sage accent material */
  sage: new THREE.MeshStandardMaterial({
    color: "#9FB2AC",
    metalness: 0.1,
    roughness: 0.3,
  }),

  /** Graphite dark material */
  graphite: new THREE.MeshStandardMaterial({
    color: "#1D1D1D",
    metalness: 0.5,
    roughness: 0.8,
  }),

  /** Vanilla custard bright material */
  custard: new THREE.MeshStandardMaterial({
    color: "#FFF9EB",
    metalness: 0.0,
    roughness: 0.4,
    emissive: "#FFF9EB",
    emissiveIntensity: 0.05,
  }),

  /** Glass-like transparent material */
  glass: new THREE.MeshPhysicalMaterial({
    color: "#ffffff",
    metalness: 0.0,
    roughness: 0.0,
    transmission: 0.95,
    thickness: 0.5,
    transparent: true,
  }),

  /** Wireframe base */
  wireframe: new THREE.MeshBasicMaterial({
    color: "#5D0D18",
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  }),
} as const;
