import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import styles from "./cta-section.module.css"

export default function CtaSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>SERVE THE EMPEROR TODAY</h2>
        <p className={styles.subtitle}>
          Join the ranks of the faithful with our premium purity seals. The Emperor protects those who display their
          faith.
        </p>
        <Button size="lg" className={styles.button}>
          <ShoppingCart className="mr-2 h-5 w-5" />
          Shop the Collection
        </Button>
      </div>
    </section>
  )
}
