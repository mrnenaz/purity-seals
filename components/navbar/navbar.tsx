"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import CartIcon from "../cart-icon";
import styles from "./navbar.module.css";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Имперские печати чистоты
        </Link>

        <div className={styles.mobileMenuButton} onClick={toggleMenu}>
          {isMenuOpen ? <X /> : <Menu />}
        </div>

        <div className={`${styles.navLinks} ${isMenuOpen ? styles.open : ""}`}>
          <Link
            href="/"
            className={styles.navLink}
            onClick={() => setIsMenuOpen(false)}
          >
            Домой
          </Link>
          <Link
            href="/collection"
            className={styles.navLink}
            onClick={() => setIsMenuOpen(false)}
          >
            Коллекция
          </Link>
          <Link
            href="#"
            className={styles.navLink}
            onClick={() => setIsMenuOpen(false)}
          >
            О нас
          </Link>
          <Link
            href="#"
            className={styles.navLink}
            onClick={() => setIsMenuOpen(false)}
          >
            Контакты
          </Link>
        </div>

        <div className={styles.cartIconWrapper}>
          <CartIcon />
        </div>
      </div>
    </nav>
  );
};
