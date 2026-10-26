"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
import { workshop } from "./state";
import { Wardrobe } from "./Wardrobe";

function CameraRig() {
  const camera = useThree((state) => state.camera) as THREE.PerspectiveCamera;
  const size = useThree((state) => state.size);

  useFrame(() => {
    const aspect = size.width / Math.max(1, size.height);
    const distance = workshop.wide ? 6.6 : 6.6 / Math.min(1, aspect / 0.74);
    camera.position.set(0, 0.25, distance);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function Scene({ active }: { active: boolean }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      shadows
      camera={{ fov: 28, position: [0, 0.25, 6.6], near: 0.1, far: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
    >
      <CameraRig />
      <hemisphereLight args={["#fff0db", "#2b2216", 1.15]} />
      <directionalLight
        position={[-3.2, 5.5, 4.5]}
        intensity={2.6}
        color="#ffe7c7"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
        shadow-bias={-0.0004}
        shadow-radius={6}
      />
      <directionalLight position={[4, 2, 3]} intensity={0.55} color="#bda38b" />
      <directionalLight position={[0, 3, -5]} intensity={0.4} color="#fff3e2" />
      <Suspense fallback={null}>
        <Wardrobe />
      </Suspense>
    </Canvas>
  );
}
