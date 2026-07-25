"use client";

import * as THREE from "three";

/**
 * Premade materials using the design system palette.
 * Import and reuse across any Three.js scene.
 */
export const materials = {
  /** Burnt Terracotta accent glass-like material */
  terracotta: new THREE.MeshPhysicalMaterial({
    color: "#C1502F",
    metalness: 0.2,
    roughness: 0.1,
    transmission: 0.9,
    thickness: 0.5,
    transparent: true,
    opacity: 0.8,
  }),

  /** Burgundy wine opaque material */
  burgundy: new THREE.MeshStandardMaterial({
    color: "#4A1D1D",
    metalness: 0.4,
    roughness: 0.6,
  }),

  /** Burnt terracotta accent material */
  accent: new THREE.MeshStandardMaterial({
    color: "#C1502F",
    metalness: 0.1,
    roughness: 0.3,
  }),

  /** Graphite dark material */
  graphite: new THREE.MeshStandardMaterial({
    color: "#1D1D1D",
    metalness: 0.5,
    roughness: 0.8,
  }),

  /** Old Lace bright material */
  oldLace: new THREE.MeshStandardMaterial({
    color: "#FDF5E6",
    metalness: 0.0,
    roughness: 0.4,
    emissive: "#FDF5E6",
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
    color: "#C1502F",
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  }),
} as const;
