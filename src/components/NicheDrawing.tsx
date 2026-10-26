import type { CSSProperties } from "react";
import styles from "./NicheDrawing.module.css";

type Kind = "kitchen" | "wardrobe" | "hallway" | "living" | "generic";

const kindByType: Record<string, Kind> = {
  Кухня: "kitchen",
  "Шкаф-купе": "wardrobe",
  Гардеробная: "wardrobe",
  Спальня: "wardrobe",
  Детская: "wardrobe",
  Прихожая: "hallway",
  "Гостиная или ТВ-зона": "living",
};

const defaults: Record<Kind, [number, number]> = {
  kitchen: [3000, 2300],
  wardrobe: [2400, 2600],
  hallway: [1600, 2400],
  living: [2800, 2200],
  generic: [1600, 2000],
};

const BOX = { x: 34, y: 34, width: 252, height: 168 };
const FLOOR = BOX.y + BOX.height;

const plural = (n: number, one: string, few: string, many: string) => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
};

const mm = (value: number) => value.toLocaleString("ru-RU");

const parse = (value: string) => {
  const number = Number.parseInt(value.replace(/\D/g, ""), 10);
  return Number.isFinite(number) && number > 0 ? number : null;
};

type Layout = {
  columns: number[];
  rows: number[];
  blocks: { x: number; y: number; w: number; h: number }[];
  caption: string;
};

function layoutFor(kind: Kind, type: string, width: number, height: number): Layout {
  const full = [{ x: 0, y: 0, w: 1, h: 1 }];

  if (kind === "kitchen") {
    const modules = Math.max(1, Math.round(width / 600));
    const lower = Math.min(0.9, 850 / height);
    const upper = height > 1700 ? Math.min(0.42, 800 / height) : 0;
    const columns = Array.from({ length: modules - 1 }, (_, i) => (i + 1) / modules);
    return {
      columns,
      rows: [],
      blocks: [{ x: 0, y: 1 - lower, w: 1, h: lower }, ...(upper ? [{ x: 0, y: 0, w: 1, h: upper }] : [])],
      caption: `Кухня ${mm(width)} мм: ${modules} ${plural(modules, "модуль", "модуля", "модулей")} примерно по ${mm(Math.round(width / modules))} мм`,
    };
  }

  if (kind === "wardrobe") {
    const doors = Math.max(2, Math.ceil(width / 900));
    return {
      columns: Array.from({ length: doors - 1 }, (_, i) => (i + 1) / doors),
      rows: [],
      blocks: full,
      caption: `${type} ${mm(width)} × ${mm(height)} мм: ${doors} ${plural(doors, "дверь", "двери", "дверей")} по ${mm(Math.round(width / doors))} мм`,
    };
  }

  if (kind === "hallway") {
    return {
      columns: [0.45],
      rows: [0.12],
      blocks: [
        { x: 0, y: 0, w: 0.45, h: 1 },
        { x: 0.45, y: 0, w: 0.55, h: 0.12 },
        { x: 0.45, y: 1 - Math.min(0.3, 450 / height), w: 0.55, h: Math.min(0.3, 450 / height) },
      ],
      caption: `Прихожая ${mm(width)} мм: шкаф, вешалка и обувница`,
    };
  }

  if (kind === "living") {
    const low = Math.min(0.35, 500 / height);
    return {
      columns: [0.2, 0.8],
      rows: [0.25, 0.5],
      blocks: [
        { x: 0, y: 0, w: 0.2, h: 1 },
        { x: 0.8, y: 0, w: 0.2, h: 1 },
        { x: 0.2, y: 1 - low, w: 0.6, h: low },
      ],
      caption: `ТВ-зона ${mm(width)} мм: тумба и стеллажи по бокам`,
    };
  }

  const sections = Math.max(1, Math.ceil(width / 800));
  const shelves = Math.max(1, Math.round(height / 400));
  return {
    columns: Array.from({ length: sections - 1 }, (_, i) => (i + 1) / sections),
    rows: Array.from({ length: shelves - 1 }, (_, i) => (i + 1) / shelves),
    blocks: full,
    caption: `${mm(width)} × ${mm(height)} мм: ${sections} ${plural(sections, "секция", "секции", "секций")}, ${shelves} ${plural(shelves, "уровень", "уровня", "уровней")} полок`,
  };
}

export function NicheDrawing({ type, width, height }: { type: string; width: string; height: string }) {
  const kind = kindByType[type] ?? "generic";
  const [fallbackW, fallbackH] = defaults[kind];
  const typedW = parse(width);
  const typedH = parse(height);
  const W = Math.min(9000, Math.max(300, typedW ?? fallbackW));
  const H = Math.min(3600, Math.max(300, typedH ?? fallbackH));
  const scale = Math.min(BOX.width / W, BOX.height / H);
  const w = W * scale;
  const h = H * scale;
  const ox = BOX.x + (BOX.width - w) / 2;
  const oy = FLOOR - h;
  const layout = layoutFor(kind, type || "Мебель", W, H);

  const box: CSSProperties = { transform: `translate(${ox}px, ${oy}px) scale(${w}, ${h})` };

  return (
    <figure className={styles.figure}>
      <svg viewBox="0 0 330 236" className={styles.svg} role="img" aria-label={layout.caption}>
        <rect x="0" y={FLOOR} width="330" height="4" className={styles.floor} />
        <g className={styles.box} style={box}>
          <rect width="1" height="1" className={styles.niche} />
          {layout.blocks.map((block, i) => (
            <rect key={`${kind}-${i}`} x={block.x} y={block.y} width={block.w} height={block.h} className={styles.block} />
          ))}
          {layout.columns.map((x, i) => (
            <line key={`c${i}`} x1={x} x2={x} y1="0" y2="1" className={styles.division} vectorEffect="non-scaling-stroke" />
          ))}
          {layout.rows.map((y, i) => (
            <line key={`r${i}`} x1="0" x2="1" y1={y} y2={y} className={styles.division} vectorEffect="non-scaling-stroke" />
          ))}
          <rect width="1" height="1" className={styles.outline} vectorEffect="non-scaling-stroke" />
        </g>

        <g className={styles.measure} style={{ transform: `translate(${ox}px, ${oy - 14}px)` }}>
          <line x1="0" x2={w} y1="0" y2="0" />
          <line x1="0" x2="0" y1="-5" y2="5" />
          <line x1={w} x2={w} y1="-5" y2="5" />
          <text x={w / 2} y="-8" textAnchor="middle">
            {typedW === null ? "≈ " : ""}
            {mm(W)}
          </text>
        </g>
        <g className={styles.measure} style={{ transform: `translate(${ox + w + 12}px, ${oy}px)` }}>
          <line x1="0" x2="0" y1="0" y2={h} />
          <line x1="-5" x2="5" y1="0" y2="0" />
          <line x1="-5" x2="5" y1={h} y2={h} />
          <text x="8" y={h / 2 + 5}>
            {typedH === null ? "≈ " : ""}
            {mm(H)}
          </text>
        </g>
      </svg>
      <figcaption className={styles.caption} aria-live="polite">
        {layout.caption}
      </figcaption>
    </figure>
  );
}
