import { furniture } from "@/content/site";
import { SectionTitle } from "./SectionTitle";
import styles from "./Furniture.module.css";

export function Furniture() {
  return (
    <section id="furniture" className={styles.section} aria-labelledby="furniture-title">
      <div className={styles.head}>
        <SectionTitle id="furniture-title">{furniture.title}</SectionTitle>
        <p className={styles.note} data-reveal style={{ "--i": 2 } as React.CSSProperties}>
          {furniture.note}
        </p>
      </div>
      <ul className={styles.grid}>
        {furniture.items.map((item, i) => (
          <li key={item.title} className={styles.card} data-reveal style={{ "--i": i % 3 } as React.CSSProperties}>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.text}>{item.text}</p>
            <span className={styles.detail}>{item.detail}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
