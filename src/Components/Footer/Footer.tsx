import styles from "./Footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        <Link href="/privacy-policy" className={styles.footer_link}>
          Privacy Policy
        </Link>
        {" "}
        /
        {" "}
        <Link href="/imprint" className={styles.footer_link}>
          Imprint
        </Link>
      </p>
      <p className={styles.footer_text}>
        &copy; 2023 Kazuki. All rights reserved.
      </p>
    </footer>
  );
}