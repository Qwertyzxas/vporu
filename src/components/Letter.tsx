import { contacts, letter } from "@/content/site";
import { asset } from "@/lib/asset";
import { SectionTitle } from "./SectionTitle";
import styles from "./Letter.module.css";

const initials = contacts.name
  .split(" ")
  .map((part) => part[0])
  .join("");

export function Letter() {
  return (
    <section id="about" className={styles.section} aria-labelledby="letter-title">
      <div className={styles.lead}>
        <SectionTitle id="letter-title">{letter.title}</SectionTitle>
        <blockquote className={styles.quote} data-reveal style={{ "--i": 1 } as React.CSSProperties}>
          {letter.quote}
        </blockquote>
        <div className={styles.byline} data-reveal style={{ "--i": 2 } as React.CSSProperties}>
          {letter.portrait ? (
            <img className={styles.portrait} src={asset(letter.portrait)} width={64} height={64} alt={contacts.name} />
          ) : (
            <span className={styles.portrait} aria-hidden="true">
              {initials}
            </span>
          )}
          <p className={styles.signature}>
            <span>{letter.signature}</span>
            {letter.role}
          </p>
        </div>
      </div>

      <div className={styles.story}>
        <div className={styles.body}>
          {letter.paragraphs.map((paragraph, i) => (
            <p key={paragraph} data-reveal style={{ "--i": i } as React.CSSProperties}>
              {paragraph}
            </p>
          ))}
        </div>
        <ul className={styles.facts}>
          {letter.facts.map((fact, i) => (
            <li key={fact.label} data-reveal style={{ "--i": i } as React.CSSProperties}>
              <span className={styles.value}>{fact.value}</span>
              <span className={styles.label}>{fact.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
