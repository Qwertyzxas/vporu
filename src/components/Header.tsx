"use client";

import { useEffect, useState } from "react";
import { nav, promise } from "@/content/site";
import styles from "./Header.module.css";

export function Header() {
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      if (Math.abs(y - lastY) < 6) return;
      setHidden(y > lastY && y > window.innerHeight * 0.5);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = nav
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((section): section is HTMLElement => Boolean(section));
    const watcher = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = `#${entry.target.id}`;
          if (entry.isIntersecting) setActive(id);
          else setActive((current) => (current === id ? "" : current));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => watcher.observe(section));

    return () => {
      window.removeEventListener("scroll", onScroll);
      watcher.disconnect();
    };
  }, []);

  return (
    <header className={styles.header} data-hidden={hidden} data-solid={solid}>
      <a className={styles.wordmark} href="#top" aria-label="Впору, в начало страницы">
        Впору
      </a>
      <nav className={styles.nav} aria-label="Разделы">
        {nav.map((link) => (
          <a
            key={link.href}
            className={styles.navLink}
            href={link.href}
            aria-current={active === link.href ? "true" : undefined}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <p className={styles.promise}>{promise}</p>
    </header>
  );
}
