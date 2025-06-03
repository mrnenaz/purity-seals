import { Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import styles from "./testimonial-card.module.css"

interface TestimonialCardProps {
  name: string
  quote: string
  rating: number
}

export default function TestimonialCard({ name, quote, rating }: TestimonialCardProps) {
  return (
    <Card className={styles.card}>
      <div className={styles.rating}>
        {Array(rating)
          .fill(0)
          .map((_, i) => (
            <Star key={i} className={styles.star} />
          ))}
      </div>
      <p className={styles.quote}>"{quote}"</p>
      <p className={styles.name}>{name}</p>
    </Card>
  )
}
