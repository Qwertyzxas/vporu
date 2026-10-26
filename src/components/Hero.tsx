import type { Ref } from "react";
import { hero } from "@/content/site";
import styles from "./Hero.module.css";

export function Hero({ ref }: { ref: Ref<HTMLElement> }) {
  return (
    <section ref={ref} id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.copy}>
        <h1 id="hero-title" className={styles.title}>
          {hero.title.map((line, i) => (
            <span key={line} className={styles.line}>
              <span className={styles.word} style={{ "--i": i } as React.CSSProperties}>
                {line}
              </span>
            </span>
          ))}
        </h1>
        <p className={styles.lead} data-rise style={{ "--i": 3 } as React.CSSProperties}>
          {hero.lead}
        </p>
        <div className={styles.actions} data-rise style={{ "--i": 4 } as React.CSSProperties}>
          <a className="button" href="#order" data-goal="hero_order">
            {hero.action}
          </a>
        </div>
      </div>
      <ul className={styles.facts} data-rise style={{ "--i": 5 } as React.CSSProperties}>
        {hero.facts.map((fact) => (
          <li key={fact}>{fact}</li>
        ))}
      </ul>
    </section>
  );
}
