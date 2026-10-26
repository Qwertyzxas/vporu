import { easeInOut, range } from "@/lib/scroll";

export type SceneFrame = {
  x: number;
  y: number;
  rotation: number;
  explode: number;
  scale: number;
};

export const workshop = {
  heroProgress: 0,
  insideProgress: 0,
  pointerX: 0,
  pointerY: 0,
  wide: true,
  reduced: false,
  anchors: {} as Record<string, { x: number; y: number; visible: boolean }>,
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const stages = {
  settle: [0, 0.16],
  apart: [0.16, 0.5],
  together: [0.7, 0.9],
} as const;

export function sceneAt(hero: number, inside: number, wide: boolean): SceneFrame {
  const home = wide ? { x: 1.2, y: 0, scale: 1 } : { x: 0, y: -1.55, scale: 0.88 };
  const stage = wide ? { x: 1.3, y: 0, scale: 0.84 } : { x: 0, y: -0.75, scale: 0.78 };

  const settle = easeInOut(range(inside, ...stages.settle));
  const apart = easeInOut(range(inside, ...stages.apart));
  const together = easeInOut(range(inside, ...stages.together));
  const leave = easeInOut(range(hero, 0, 1)) * (1 - settle);

  return {
    x: lerp(lerp(home.x, home.x + (wide ? 0.25 : 0), leave), stage.x, settle),
    y: lerp(home.y, stage.y, settle),
    rotation: lerp(lerp(-0.58, -0.72, leave), -0.8, settle) + together * 0.42,
    explode: apart * (1 - together),
    scale: lerp(home.scale, stage.scale, settle),
  };
}
