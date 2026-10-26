"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { sectionProgress } from "@/lib/scroll";
import { WardrobeDrawing } from "@/components/drawings";
import { Hero } from "@/components/Hero";
import { Inside } from "@/components/Inside";
import { workshop } from "./state";
import styles from "./Workshop.module.css";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

const WIDE = "(min-width: 900px)";

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function Workshop() {
  const wrap = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement>(null);
  const inside = useRef<HTMLElement>(null);
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    setWebgl(supportsWebGL());

    const wide = window.matchMedia(WIDE);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      workshop.wide = wide.matches;
      workshop.reduced = reduced.matches;
    };
    sync();
    wide.addEventListener("change", sync);
    reduced.addEventListener("change", sync);

    const measure = () => {
      if (hero.current) {
        const box = hero.current.getBoundingClientRect();
        workshop.heroProgress = Math.min(1, Math.max(0, -box.top / box.height));
      }
      if (inside.current) workshop.insideProgress = sectionProgress(inside.current);
    };
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);

    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      workshop.pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      workshop.pointerY = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const visibility = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      rootMargin: "20% 0px",
    });
    if (wrap.current) visibility.observe(wrap.current);

    return () => {
      wide.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      window.removeEventListener("pointermove", onPointer);
      visibility.disconnect();
    };
  }, []);

  return (
    <div ref={wrap} className={styles.wrap}>
      <div className={styles.track} aria-hidden="true">
        <div className={styles.stage}>
          {webgl && <Scene active={active} />}
          {webgl === false && (
            <div className={styles.fallback}>
              <WardrobeDrawing />
            </div>
          )}
        </div>
      </div>
      <Hero ref={hero} />
      <Inside ref={inside} webgl={webgl !== false} />
    </div>
  );
}
