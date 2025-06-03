"use client";

import Image from "next/image";
import { Star, ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/products";
import styles from "./product-card.module.css";
import { useState } from "react";

interface ProductCardProps {
  name: string;
  price: string;
  description: string;
  rating: number;
  imageUrl?: string;
  id: string;
}

export default function ProductCard({
  name,
  price,
  description,
  rating,
  // imageUrl = "/placeholder.svg?height=400&width=600",
  imageUrl = "/placeholder2.png",
  id,
}: ProductCardProps) {
  const { addItem, items } = useCart();
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);

  // Check if product is already in cart
  const isInCart = items.some((item) => item.product.id === id);

  const handleAddToCart = () => {
    // Create a product object from props
    const product: Product = {
      id,
      name,
      price,
      description,
      rating,
      category: "", // We don't have this info in the props
      imageUrl,
    };

    setIsAdding(true);

    // Add to cart
    addItem(product, 1);

    // Show toast notification
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
      duration: 3000,
    });

    // Reset button state after a short delay
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  return (
    <Card className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={imageUrl || "/placeholder2.png"}
          alt={name}
          fill
          className={styles.image}
        />
      </div>
      <CardContent className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{name}</h3>
          <span className={styles.price}>${price}</span>
        </div>
        <p className={styles.description}>{description}</p>
        <div className={styles.footer}>
          <div className={styles.rating}>
            {Array(rating)
              .fill(0)
              .map((_, i) => (
                <Star key={i} className={styles.star} />
              ))}
          </div>
          <Button
            size="sm"
            className={`${styles.button} ${isAdding ? styles.adding : ""} ${
              isInCart ? styles.inCart : ""
            }`}
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? (
              <Check className="h-4 w-4 mr-1" />
            ) : isInCart ? (
              <>
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add More
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
