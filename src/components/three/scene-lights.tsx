"use client";

interface SceneLightsProps {
  ambientIntensity?: number;
  directionalIntensity?: number;
  directionalPosition?: [number, number, number];
  pointLightIntensity?: number;
  pointLightPosition?: [number, number, number];
}

/**
 * Reusable lighting rig for 3D scenes.
 */
export function SceneLights({
  ambientIntensity = 0.4,
  directionalIntensity = 1,
  directionalPosition = [5, 5, 5],
  pointLightIntensity = 0.5,
  pointLightPosition = [-3, 3, 2],
}: SceneLightsProps) {
  return (
    <>
      <ambientLight intensity={ambientIntensity} />
      <directionalLight
        intensity={directionalIntensity}
        position={directionalPosition}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight
        intensity={pointLightIntensity}
        position={pointLightPosition}
        color="#C1502F"
      />
    </>
  );
}
