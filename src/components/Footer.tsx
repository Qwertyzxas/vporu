import { footer, nav } from "@/content/site";
import { credits } from "@/content/media";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <a className={styles.wordmark} href="#top">
        Впору
      </a>
      <nav className={styles.nav} aria-label="Разделы">
        {nav.map((link) => (
          <a key={link.href} className={styles.navLink} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <p className={styles.legal}>{footer.legal}</p>
      <p className={styles.credits}>
        {footer.credits}:{" "}
        {credits.map((item, i) => (
          <span key={item.src}>
            <a href={item.page} target="_blank" rel="noopener noreferrer">
              {item.credit}
            </a>
            , {item.license}
            {i < credits.length - 1 ? "; " : "."}
          </span>
        ))}
      </p>
    </footer>
  );
}
