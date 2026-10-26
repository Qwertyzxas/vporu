"use client";

import { useEffect, useRef, type Ref } from "react";
import { inside } from "@/content/site";
import { range } from "@/lib/scroll";
import { stages, workshop } from "@/components/workshop/state";
import styles from "./Inside.module.css";

export function Inside({ ref, webgl }: { ref: Ref<HTMLElement>; webgl: boolean }) {
  const stage = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const lines = useRef<(SVGGElement | null)[]>([]);
  const fit = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!webgl) return;
    let frame = 0;

    const tick = () => {
      frame = requestAnimationFrame(tick);
      const root = stage.current;
      if (!root) return;

      const progress = workshop.insideProgress;
      const apart = range(progress, stages.apart[0] + 0.04, stages.apart[1] + 0.02);
      const together = range(progress, stages.together[0] - 0.04, stages.together[0] + 0.04);
      const total = inside.parts.length;
      const current = workshop.wide
        ? Math.min(total - 1, Math.floor(apart * (total + 1) - 0.4))
        : Math.min(total - 1, Math.floor(apart * total));

      root.dataset.phase = progress > stages.together[1] - 0.06 ? "fit" : apart > 0 && together < 0.5 ? "parts" : "intro";
      fit.current?.toggleAttribute("data-on", progress > stages.together[1] - 0.06);

      cards.current.forEach((card, i) => {
        const line = lines.current[i];
        if (!card || !line) return;
        const on = workshop.wide ? apart > (i + 0.4) / (total + 1) && together < 0.5 : apart > 0 && together < 0.5 && i === current;
        card.toggleAttribute("data-on", on);
        card.toggleAttribute("data-current", on && i === current);
        line.toggleAttribute("data-on", on);

        const anchor = workshop.anchors[inside.parts[i].id];
        if (!anchor?.visible) return;
        const box = card.getBoundingClientRect();
        const start = workshop.wide
          ? { x: box.right, y: box.top + box.height / 2 }
          : { x: box.left + box.width / 2, y: box.bottom };
        const path = line.firstElementChild as SVGPathElement | null;
        const dot = line.lastElementChild as SVGCircleElement | null;
        path?.setAttribute("d", `M${start.x} ${start.y} L${anchor.x} ${anchor.y}`);
        dot?.setAttribute("cx", String(anchor.x));
        dot?.setAttribute("cy", String(anchor.y));
      });
    };

    tick();
    return () => cancelAnimationFrame(frame);
  }, [webgl]);

  return (
    <section ref={ref} id="inside" className={styles.inside} data-static={!webgl || undefined} aria-labelledby="inside-title">
      <div ref={stage} className={styles.stage} data-phase="intro">
        <div className={styles.head}>
          <h2 id="inside-title" className={styles.title} data-reveal>
            {inside.title}
          </h2>
          <p className={styles.lead} data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            {inside.lead}
          </p>
        </div>

        <ul className={styles.parts}>
          {inside.parts.map((part, i) => (
            <li
              key={part.id}
              ref={(node) => {
                cards.current[i] = node;
              }}
              className={styles.part}
            >
              <h3 className={styles.partTitle}>{part.title}</h3>
              <p>{part.text}</p>
            </li>
          ))}
        </ul>

        <div ref={fit} className={styles.fit}>
          <h3 className={styles.fitTitle}>{inside.fit.title}</h3>
          <p>{inside.fit.text}</p>
        </div>

        <svg className={styles.lines} aria-hidden="true">
          {inside.parts.map((part, i) => (
            <g
              key={part.id}
              ref={(node) => {
                lines.current[i] = node;
              }}
            >
              <path />
              <circle r="5" />
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}
