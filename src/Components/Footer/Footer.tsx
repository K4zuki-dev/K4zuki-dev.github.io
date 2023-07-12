import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        <a href="/privacy-policy" className={styles.footer_link}>
          Privacy Policy
        </a>
        {" "}
        /
        {" "}
        <a href="/imprint" className={styles.footer_link}>
          Imprint
        </a>
      </p>
      <p className={styles.footer_text}>
        &copy; 2023 Maximilian Gummibärchen. All rights reserved.
      </p>
    </footer>
  );
}
