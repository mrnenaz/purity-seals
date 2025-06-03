import { Shield, Award, Package } from "lucide-react"
import FeatureCard from "./feature-card"
import styles from "./features-section.module.css"

export default function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Authentic Materials",
      description: "Crafted with genuine wax and parchment for an authentic Imperial look",
    },
    {
      icon: Award,
      title: "Blessed by Ecclesiarchy",
      description: "Each seal contains authentic prayers to the God-Emperor",
    },
    {
      icon: Package,
      title: "Ready for Battle",
      description: "Durable construction suitable for cosplay or display",
    },
  ]

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          <span className={styles.highlight}>WHY CHOOSE</span> OUR PURITY SEALS
        </h2>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
