"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, Filter, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProductCard from "@/components/product-card"
import { products, categories } from "@/lib/products"
import styles from "./collection.module.css"

export default function CollectionPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortOption, setSortOption] = useState("featured")
  const [filteredProducts, setFilteredProducts] = useState(products)

  useEffect(() => {
    let result = [...products]

    // Apply category filter
    if (selectedCategory !== "All") {
      result = result.filter((product) => product.category === selectedCategory)
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => Number.parseFloat(a.price) - Number.parseFloat(b.price))
        break
      case "price-high":
        result.sort((a, b) => Number.parseFloat(b.price) - Number.parseFloat(a.price))
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      // Default is "featured" which is the original order
    }

    setFilteredProducts(result)
  }, [selectedCategory, sortOption])

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Button variant="link" asChild className={styles.backButton}>
            <Link href="/">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
          </Button>
          <h1 className={styles.title}>IMPERIAL PURITY SEALS COLLECTION</h1>
          <p className={styles.subtitle}>Browse our complete collection of authentic purity seals</p>
        </div>

        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <div className={styles.filterLabel}>
              <Filter className="h-4 w-4 mr-2" />
              Filter by:
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className={styles.selectTrigger}>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className={styles.filterGroup}>
            <div className={styles.filterLabel}>
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Sort by:
            </div>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className={styles.selectTrigger}>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className={styles.resultsCount}>
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"}
        </div>

        <div className={styles.productGrid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                description={product.description}
                rating={product.rating}
                imageUrl={product.imageUrl}
              />
            ))
          ) : (
            <div className={styles.noResults}>
              <p>No products found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory("All")
                  setSortOption("featured")
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
