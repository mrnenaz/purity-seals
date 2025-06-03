import TestimonialCard from "./testimonial-card"
import styles from "./testimonials-section.module.css"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Brother Marius, Ultramarines",
      quote:
        "These purity seals have brought me victory in countless battles against the enemies of mankind. The Emperor protects!",
      rating: 5,
    },
    {
      name: "Inquisitor Hector, Ordo Hereticus",
      quote:
        "Excellent craftsmanship. The wax seal bears a striking resemblance to those used by the Holy Inquisition.",
      rating: 4,
    },
  ]

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          <span className={styles.highlight}>IMPERIAL</span> TESTIMONIALS
        </h2>

        <div className={styles.grid}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
