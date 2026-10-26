"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { reachGoal } from "@/lib/metrika";
import { scrollToTarget, setLenis } from "@/lib/scroll";

export function Motion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | null = null;
    let frame = 0;

    if (!reduced) {
      lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1.15 });
      setLenis(lenis);
      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    }

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const goal = target?.closest<HTMLElement>("[data-goal]")?.dataset.goal;
      if (goal) reachGoal(goal);

      const link = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey) return;
      const hash = link.getAttribute("href");
      if (!hash || hash === "#" || !document.querySelector(hash)) return;
      event.preventDefault();
      scrollToTarget(hash);
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    const targets = document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-media]");
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          reveal.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    targets.forEach((element) => reveal.observe(element));

    const safety = window.setTimeout(() => {
      targets.forEach((element) => {
        const box = element.getBoundingClientRect();
        if (box.top < window.innerHeight && box.bottom > 0) element.classList.add("is-in");
      });
    }, 2500);

    return () => {
      cancelAnimationFrame(frame);
      lenis?.destroy();
      setLenis(null);
      document.removeEventListener("click", onClick);
      reveal.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  return null;
}
