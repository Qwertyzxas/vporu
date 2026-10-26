import { materials } from "@/content/site";
import { pictures } from "@/content/media";
import { asset } from "@/lib/asset";
import { HardwareDrawing } from "./drawings";
import { SectionTitle } from "./SectionTitle";
import styles from "./Materials.module.css";

const photos = {
  chipboard: pictures.chipboard,
  "oak-veneer": pictures.oakVeneer,
} as const;

export function Materials() {
  return (
    <section id="materials" className={styles.section} aria-labelledby="materials-title">
      <SectionTitle id="materials-title">{materials.title}</SectionTitle>
      <div className={styles.items}>
        {materials.items.map((item, i) => {
          const photo = item.picture in photos ? photos[item.picture as keyof typeof photos] : null;
          return (
            <article key={item.label} className={styles.item}>
              <div className={styles.picture} data-reveal-media style={{ "--i": i } as React.CSSProperties}>
                {photo ? (
                  <img src={asset(photo.src)} width={photo.width} height={photo.height} alt={photo.alt} loading="lazy" />
                ) : (
                  <HardwareDrawing title="Мебельная петля с доводчиком и направляющая для ящика" />
                )}
                <span className={styles.label}>{item.label}</span>
              </div>
              <h3 className={styles.title} data-reveal style={{ "--i": i + 1 } as React.CSSProperties}>
                {item.title}
              </h3>
              <p className={styles.text} data-reveal style={{ "--i": i + 2 } as React.CSSProperties}>
                {item.text}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
