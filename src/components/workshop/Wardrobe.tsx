"use client";

import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { asset } from "@/lib/asset";
import { sceneAt, workshop } from "./state";

const T = 0.016;
const W = 1.8;
const H = 2.2;
const D = 0.56;
const PLINTH = 0.08;
const SECTION = W / 3;
const INNER_H = H - PLINTH - 2 * T;

type MaterialKey = "carcass" | "edge" | "back" | "metal";

type PanelSpec = {
  size: [number, number, number];
  position: [number, number, number];
  offset: [number, number, number];
  material: MaterialKey | "panel";
  anchor?: { id: string; at: [number, number, number] };
};

const shelves = (x: number, heights: number[], offset: [number, number, number]): PanelSpec[] =>
  heights.map((y, i) => ({
    size: [SECTION - 1.5 * T, T, D - 0.03],
    position: [x, y, -0.01],
    offset: [offset[0], offset[1], offset[2] + i * 0.04],
    material: "panel",
  }));

const panels: PanelSpec[] = [
  {
    size: [T, H - PLINTH, D],
    position: [-W / 2 + T / 2, PLINTH + (H - PLINTH) / 2, 0],
    offset: [-0.62, 0.04, 0],
    material: "panel",
  },
  {
    size: [T, H - PLINTH, D],
    position: [W / 2 - T / 2, PLINTH + (H - PLINTH) / 2, 0],
    offset: [0.62, 0.04, 0],
    material: "panel",
    anchor: { id: "board", at: [T / 2, 0.2, 0.08] },
  },
  { size: [W - 2 * T, T, D], position: [0, H - T / 2, 0], offset: [0, 0.5, 0.05], material: "panel" },
  { size: [W - 2 * T, T, D], position: [0, PLINTH + T / 2, 0], offset: [0, -0.18, 0.05], material: "panel" },
  {
    size: [T, INNER_H, D - 0.01],
    position: [-SECTION / 2, PLINTH + T + INNER_H / 2, -0.005],
    offset: [-0.24, 0, 0.22],
    material: "panel",
  },
  {
    size: [T, INNER_H, D - 0.01],
    position: [SECTION / 2, PLINTH + T + INNER_H / 2, -0.005],
    offset: [0.24, 0, 0.22],
    material: "panel",
  },
  ...shelves(-SECTION, [0.5, 0.92, 1.34, 1.76], [-0.36, 0, 0.5]).map((spec, i) =>
    i === 2 ? { ...spec, anchor: { id: "edge", at: [0.12, 0, (D - 0.03) / 2] as [number, number, number] } } : spec,
  ),
  ...shelves(0, [0.62, 1.86], [0, 0, 0.62]),
  ...shelves(SECTION, [1.86], [0.36, 0, 0.5]),
  {
    size: [W - 0.004, H - PLINTH, 0.004],
    position: [0, PLINTH + (H - PLINTH) / 2, -D / 2 - 0.002],
    offset: [0, 0.02, -0.7],
    material: "back",
    anchor: { id: "back", at: [0.35, 0.35, -0.002] },
  },
  {
    size: [W - 2 * T, PLINTH - 0.006, T],
    position: [0, PLINTH / 2, D / 2 - 0.05],
    offset: [0, -0.2, 0.4],
    material: "panel",
  },
];

const drawers = [0.16, 0.4].map((y) => ({ y }));

const doorSpecs = [
  { pivot: -W / 2, side: 1, offset: [-0.2, 0, 1.0] as [number, number, number] },
  { pivot: SECTION / 2, side: -1, offset: [0, 0, 1.12] as [number, number, number] },
  { pivot: W / 2, side: -1, offset: [0.2, 0, 1.0] as [number, number, number] },
];

const feet: [number, number, number][] = [
  [-W / 2 + 0.08, 0, D / 2 - 0.08],
  [W / 2 - 0.08, 0, D / 2 - 0.08],
  [-W / 2 + 0.08, 0, -D / 2 + 0.08],
  [W / 2 - 0.08, 0, -D / 2 + 0.08],
];

function useWoodTextures() {
  const [walnut, oak] = useLoader(THREE.TextureLoader, [asset("/images/walnut.jpg"), asset("/images/oak-veneer.webp")]);
  const gl = useThree((state) => state.gl);

  return useMemo(() => {
    const anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
    for (const texture of [walnut, oak]) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = anisotropy;
      texture.center.set(0.5, 0.5);
    }
    walnut.rotation = Math.PI / 2;
    oak.rotation = Math.PI / 2;
    oak.wrapS = oak.wrapT = THREE.RepeatWrapping;
    oak.repeat.set(1, 0.6);
    return { walnut, oak };
  }, [walnut, oak, gl]);
}

function useMaterials() {
  const { walnut, oak } = useWoodTextures();

  return useMemo(() => {
    const carcass = new THREE.MeshStandardMaterial({ map: oak, color: "#f3e7d6", roughness: 0.78 });
    const edge = new THREE.MeshStandardMaterial({ color: "#c9ab84", roughness: 0.55 });
    const back = new THREE.MeshStandardMaterial({ color: "#ddd2c1", roughness: 0.9 });
    const metal = new THREE.MeshStandardMaterial({ color: "#7d7064", metalness: 0.85, roughness: 0.32 });
    const front = new THREE.MeshStandardMaterial({ map: walnut, color: "#c4ab93", roughness: 0.62 });
    const frontEdge = new THREE.MeshStandardMaterial({ color: "#5b3e26", roughness: 0.55 });

    const panel = [carcass, carcass, carcass, carcass, edge, carcass];
    const door = [frontEdge, frontEdge, frontEdge, frontEdge, front, carcass];

    return { carcass, edge, back, metal, panel, door };
  }, [walnut, oak]);
}

function useAnchor(id: string) {
  const ref = useRef<THREE.Object3D>(null);
  useLayoutEffect(() => {
    if (ref.current) ref.current.userData.anchor = id;
  }, [id]);
  return ref;
}

function Anchor({ id, position }: { id: string; position: [number, number, number] }) {
  const ref = useAnchor(id);
  return <object3D ref={ref} position={position} />;
}

export function Wardrobe() {
  const materials = useMaterials();
  const root = useRef<THREE.Group>(null);
  const parts = useRef<(THREE.Object3D | null)[]>([]);
  const doorPivots = useRef<(THREE.Group | null)[]>([]);
  const drawerRefs = useRef<(THREE.Group | null)[]>([]);
  const extras = useRef<(THREE.Object3D | null)[]>([]);
  const current = useRef(sceneAt(0, 0, true));
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const anchorPoint = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const group = root.current;
    if (!group) return;

    const target = sceneAt(workshop.heroProgress, workshop.insideProgress, workshop.wide);
    const smoothing = 1 - Math.exp(-(workshop.reduced ? 14 : 5.5) * Math.min(delta, 0.1));
    const frame = current.current;
    for (const key of Object.keys(target) as (keyof typeof target)[]) {
      frame[key] += (target[key] - frame[key]) * smoothing;
    }

    const time = state.clock.elapsedTime;
    const calm = workshop.reduced ? 0 : 1;
    const inHero = 1 - Math.min(1, workshop.insideProgress * 8);
    const sway = Math.sin(time * 0.3) * 0.05 * calm * inHero;
    const lean = workshop.pointerX * 0.12 * calm * inHero;

    group.position.set(frame.x, frame.y - H / 2, 0);
    group.rotation.y = frame.rotation + sway + lean;
    group.rotation.x = workshop.pointerY * 0.03 * calm * inHero;
    group.scale.setScalar(frame.scale);

    const e = frame.explode;
    parts.current.forEach((part, i) => {
      if (!part) return;
      const spec = panels[i];
      part.position.set(
        spec.position[0] + spec.offset[0] * e,
        spec.position[1] + spec.offset[1] * e,
        spec.position[2] + spec.offset[2] * e,
      );
    });

    extras.current.forEach((part) => {
      if (!part) return;
      const base = part.userData.base as THREE.Vector3;
      const offset = part.userData.offset as THREE.Vector3;
      part.position.set(base.x + offset.x * e, base.y + offset.y * e, base.z + offset.z * e);
    });

    const breathe = (0.5 + Math.sin(time * 0.9) * 0.5) * 0.18 * calm * inHero;
    const reach = Math.max(0, workshop.pointerX) * 0.55 * calm * inHero;

    doorSpecs.forEach((spec, i) => {
      const pivot = doorPivots.current[i];
      if (!pivot) return;
      const ajar = i === 1 ? Math.max(breathe, reach) : reach * 0.7;
      const open = Math.max(ajar, e * 0.9);
      pivot.position.set(spec.pivot + spec.offset[0] * e, PLINTH + 0.002 + spec.offset[1] * e, D / 2 + 0.011 + spec.offset[2] * e);
      pivot.rotation.y = -spec.side * open * 1.35;
    });

    drawerRefs.current.forEach((drawer, i) => {
      if (!drawer) return;
      drawer.position.z = D / 2 - 0.02 + e * (0.5 + i * 0.12);
    });

    const width = size.width;
    const height = size.height;
    group.updateMatrixWorld();
    group.traverse((object) => {
      const id = object.userData.anchor as string | undefined;
      if (!id) return;
      object.getWorldPosition(anchorPoint);
      anchorPoint.project(camera);
      workshop.anchors[id] = {
        x: (anchorPoint.x * 0.5 + 0.5) * width,
        y: (-anchorPoint.y * 0.5 + 0.5) * height,
        visible: anchorPoint.z < 1,
      };
    });
  });

  return (
    <group ref={root}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
        <planeGeometry args={[14, 14]} />
        <shadowMaterial opacity={0.34} />
      </mesh>

      {panels.map((spec, i) => (
        <mesh
          key={i}
          ref={(node) => {
            parts.current[i] = node;
          }}
          position={spec.position}
          material={spec.material === "panel" ? materials.panel : materials[spec.material]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={spec.size} />
          {spec.anchor && <Anchor id={spec.anchor.id} position={spec.anchor.at} />}
        </mesh>
      ))}

      <mesh
        ref={(node) => {
          extras.current[0] = node;
          if (node) {
            node.userData.base = new THREE.Vector3(SECTION, 1.62, 0);
            node.userData.offset = new THREE.Vector3(0.36, 0, 0.62);
          }
        }}
        rotation={[0, 0, Math.PI / 2]}
        material={materials.metal}
        castShadow
      >
        <cylinderGeometry args={[0.012, 0.012, SECTION - 2 * T, 20]} />
        <Anchor id="inner" position={[0, 0.12, 0]} />
      </mesh>

      {feet.map((position, i) => (
        <mesh
          key={i}
          ref={(node) => {
            extras.current[1 + i] = node;
            if (node) {
              node.userData.base = new THREE.Vector3(position[0], 0.03, position[2]);
              node.userData.offset = new THREE.Vector3(0, -0.32, i < 2 ? 0.3 : 0);
            }
          }}
          material={materials.metal}
          castShadow
        >
          <cylinderGeometry args={[0.02, 0.026, 0.06, 20]} />
          {i === 0 && <Anchor id="feet" position={[0, -0.02, 0.02]} />}
        </mesh>
      ))}

      {drawers.map(({ y }, i) => (
        <group
          key={i}
          ref={(node) => {
            drawerRefs.current[i] = node;
          }}
          position={[0, PLINTH + T + y, D / 2 - 0.02]}
        >
          <mesh position={[0, 0, -0.22]} material={materials.panel} castShadow>
            <boxGeometry args={[SECTION - 2 * T - 0.03, 0.16, 0.42]} />
          </mesh>
          <mesh position={[0, 0, 0]} material={materials.door} castShadow>
            <boxGeometry args={[SECTION - 2 * T - 0.006, 0.21, T]} />
          </mesh>
          <mesh position={[0, 0.05, 0.016]} material={materials.metal}>
            <boxGeometry args={[0.16, 0.012, 0.012]} />
          </mesh>
        </group>
      ))}

      {doorSpecs.map((spec, i) => {
        const width = SECTION - 0.004;
        const height = H - PLINTH - 0.004;
        const center = (spec.side * width) / 2;
        return (
          <group
            key={i}
            ref={(node) => {
              doorPivots.current[i] = node;
            }}
            position={[spec.pivot, PLINTH + 0.002, D / 2 + 0.011]}
          >
            <group>
              <mesh position={[center, height / 2, 0]} material={materials.door} castShadow receiveShadow>
                <boxGeometry args={[width, height, 0.018]} />
              </mesh>
              <mesh position={[center + spec.side * (width / 2 - 0.06), height * 0.52, 0.022]} material={materials.metal} castShadow>
                <boxGeometry args={[0.014, 0.34, 0.022]} />
              </mesh>
              {[0.18, height - 0.18].map((y, j) => (
                <mesh
                  key={j}
                  position={[spec.side * 0.05, y, -0.016]}
                  rotation={[Math.PI / 2, 0, 0]}
                  material={materials.metal}
                >
                  <cylinderGeometry args={[0.019, 0.019, 0.014, 24]} />
                  {i === 0 && j === 1 && <Anchor id="hinge" position={[0, 0, 0]} />}
                </mesh>
              ))}
            </group>
          </group>
        );
      })}
    </group>
  );
}
