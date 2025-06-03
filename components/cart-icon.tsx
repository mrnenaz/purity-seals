"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import styles from "./cart-icon.module.css"

export default function CartIcon() {
  const { itemCount } = useCart()

  return (
    <Link href="/cart" className={styles.cartIcon}>
      <div className={styles.iconWrapper}>
        <ShoppingCart className={styles.icon} />
        {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
      </div>
    </Link>
  )
}
