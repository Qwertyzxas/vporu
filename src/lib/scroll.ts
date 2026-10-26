import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function scrollToTarget(target: string | number) {
  const element = typeof target === "string" ? document.querySelector<HTMLElement>(target) : null;
  const offset = element && element.id !== "top" ? 24 : 0;
  const destination = element ? element.getBoundingClientRect().top + window.scrollY - offset : Number(target) || 0;

  if (!instance) {
    window.scrollTo({ top: destination, behavior: "smooth" });
    return;
  }

  const screens = Math.abs(destination - window.scrollY) / window.innerHeight;
  instance.scrollTo(destination, {
    duration: Math.min(3.2, Math.max(1, 0.8 + screens * 0.2)),
    easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  });
}

export function sectionProgress(element: HTMLElement) {
  const box = element.getBoundingClientRect();
  const travel = box.height - window.innerHeight;
  if (travel <= 0) return box.top <= 0 ? 1 : 0;
  return Math.min(1, Math.max(0, -box.top / travel));
}

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export const range = (value: number, from: number, to: number) => clamp01((value - from) / (to - from));

export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
