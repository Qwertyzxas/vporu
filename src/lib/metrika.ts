import { metrikaId } from "@/content/site";

type Ym = (id: number, method: string, ...args: unknown[]) => void;

export function reachGoal(goal: string) {
  if (!metrikaId || typeof window === "undefined") return;
  const ym = (window as unknown as { ym?: Ym }).ym;
  ym?.(Number(metrikaId), "reachGoal", goal);
}
