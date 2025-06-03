import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <h3 className={styles.title}>Имперские печати чистоты</h3>
            <p className={styles.text}>
              Providing the finest purity seals for the Emperor's faithful since
              M41.999
            </p>
          </div>
          <div className={styles.column}>
            <h3 className={styles.title}>LINKS</h3>
            <ul className={styles.links}>
              <li>
                <Link href="#" className={styles.link}>
                  Shop
                </Link>
              </li>
              <li>
                <Link href="#" className={styles.link}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className={styles.link}>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className={styles.link}>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h3 className={styles.title}>CONTACT</h3>
            <p className={styles.text}>
              Holy Terra, Sol System
              <br />
              Segmentum Solar
              <br />
              Imperium of Man
            </p>
          </div>
        </div>
        <div className={styles.copyright}>
          <p>© M41.999 Imperial Purity Seals. The Emperor Protects.</p>
          <p className={styles.disclaimer}>
            This is a fan creation. Warhammer 40,000 and all associated marks,
            names, and characters are property of Games Workshop Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
}
