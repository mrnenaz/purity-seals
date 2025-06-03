"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import styles from "./cart.module.css"

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart()
  const { toast } = useToast()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = () => {
    setIsCheckingOut(true)

    // Simulate checkout process
    setTimeout(() => {
      toast({
        title: "Order Placed",
        description: "Your order has been successfully placed. The Emperor protects!",
        duration: 5000,
      })
      clearCart()
      setIsCheckingOut(false)
    }, 2000)
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Button variant="link" asChild className={styles.backButton}>
            <Link href="/collection">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Continue Shopping
            </Link>
          </Button>
          <h1 className={styles.title}>YOUR CART</h1>
        </div>

        {items.length === 0 ? (
          <div className={styles.emptyCart}>
            <ShoppingBag className={styles.emptyIcon} />
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any purity seals to your cart yet.</p>
            <Button asChild className={styles.shopButton}>
              <Link href="/collection">Browse Collection</Link>
            </Button>
          </div>
        ) : (
          <div className={styles.cartContent}>
            <div className={styles.cartItems}>
              <div className={styles.cartHeader}>
                <span className={styles.productHeader}>Product</span>
                <span className={styles.priceHeader}>Price</span>
                <span className={styles.quantityHeader}>Quantity</span>
                <span className={styles.totalHeader}>Total</span>
                <span className={styles.actionHeader}></span>
              </div>

              {items.map((item) => (
                <div key={item.product.id} className={styles.cartItem}>
                  <div className={styles.productInfo}>
                    <div className={styles.productImage}>
                      <Image
                        src={item.product.imageUrl || "/placeholder.svg?height=80&width=80"}
                        alt={item.product.name}
                        width={80}
                        height={80}
                        className={styles.image}
                      />
                    </div>
                    <div className={styles.productDetails}>
                      <h3 className={styles.productName}>{item.product.name}</h3>
                      <p className={styles.productDescription}>{item.product.description}</p>
                    </div>
                  </div>

                  <div className={styles.productPrice}>${item.product.price}</div>

                  <div className={styles.quantityControls}>
                    <button
                      className={styles.quantityButton}
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      <Minus className={styles.quantityIcon} />
                    </button>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <button
                      className={styles.quantityButton}
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus className={styles.quantityIcon} />
                    </button>
                  </div>

                  <div className={styles.itemTotal}>${(Number(item.product.price) * item.quantity).toFixed(2)}</div>

                  <button
                    className={styles.removeButton}
                    onClick={() => removeItem(item.product.id)}
                    aria-label="Remove item"
                  >
                    <Trash2 className={styles.removeIcon} />
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.cartSummary}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>

              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>$9.99</span>
              </div>

              <div className={styles.summaryRow}>
                <span>Tax</span>
                <span>${(subtotal * 0.08).toFixed(2)}</span>
              </div>

              <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                <span>Total</span>
                <span>${(subtotal + 9.99 + subtotal * 0.08).toFixed(2)}</span>
              </div>

              <Button className={styles.checkoutButton} onClick={handleCheckout} disabled={isCheckingOut}>
                {isCheckingOut ? "Processing..." : "Checkout"}
              </Button>

              <button className={styles.clearButton} onClick={clearCart} disabled={isCheckingOut}>
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
