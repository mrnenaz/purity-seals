import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import styles from "./hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.imageContainer}>
        <Image
          src="/placeholder3.png?height=1080&width=1920"
          alt="Space Marine with Purity Seals"
          fill
          className={styles.image}
          priority
        />
        <div className={styles.gradient}></div>
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>Имперские печати чистоты</h1>
        <p className={styles.subtitle}>
          Освятите свою броню подлинными копиями из Империума Человечества
        </p>
        <div className={styles.buttonGroup}>
          <Button size="lg" className={styles.primaryButton} asChild>
            <Link href="#featured-products">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Купить
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className={styles.secondaryButton}
            asChild
          >
            <Link href="/collection">
              Посмотреть все
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
