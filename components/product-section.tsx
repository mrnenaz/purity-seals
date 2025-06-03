import ProductCard from "./product-card";
import styles from "./product-section.module.css";
import { products } from "@/lib/products";

export default function ProductSection() {
  // Only show featured products on the homepage
  const featuredProducts = products.filter((product) => product.featured);

  return (
    <section className={styles.section} id="featured-products">
      <div className={styles.container}>
        <h2 className={styles.title}>
          <span className={styles.highlight}>Избранные</span> печати
        </h2>

        <div className={styles.grid}>
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              description={product.description}
              rating={product.rating}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
