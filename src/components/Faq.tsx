"use client";

import { useState } from "react";
import { contacts, faq } from "@/content/site";
import { phoneLink } from "@/lib/message";
import { SectionTitle } from "./SectionTitle";
import styles from "./Faq.module.css";

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className={styles.section} aria-labelledby="faq-title">
      <div className={styles.aside}>
        <SectionTitle id="faq-title">{faq.title}</SectionTitle>
        <p className={styles.note} data-reveal style={{ "--i": 1 } as React.CSSProperties}>
          {faq.aside}
        </p>
        <a className={`link ${styles.phone}`} href={phoneLink} data-goal="phone" data-reveal style={{ "--i": 2 } as React.CSSProperties}>
          {contacts.phoneLabel}
        </a>
      </div>
      <ul className={styles.list}>
        {faq.items.map((item, i) => {
          const expanded = open === i;
          return (
            <li key={item.question} className={styles.item} data-open={expanded || undefined} data-reveal style={{ "--i": i } as React.CSSProperties}>
              <div className={styles.panel}>
                <h3>
                  <button
                    type="button"
                    className={styles.question}
                    aria-expanded={expanded}
                    aria-controls={`faq-answer-${i}`}
                    onClick={() => setOpen(expanded ? -1 : i)}
                  >
                    <span>{item.question}</span>
                    <span className={styles.icon} aria-hidden="true" />
                  </button>
                </h3>
                <div id={`faq-answer-${i}`} className={styles.answer} role="region" aria-label={item.question}>
                  <div>
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
