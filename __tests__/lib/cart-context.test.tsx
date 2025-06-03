"use client"

import { render, screen, fireEvent, act } from "@testing-library/react"
import { CartProvider, useCart } from "@/lib/cart-context"
import { products } from "@/lib/products"

// Mock component to test the cart context
function CartTestComponent() {
  const { items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal } = useCart()

  return (
    <div>
      <div data-testid="item-count">{itemCount}</div>
      <div data-testid="subtotal">{subtotal}</div>
      <button data-testid="add-item" onClick={() => addItem(products[0])}>
        Add Item
      </button>
      <button data-testid="add-multiple" onClick={() => addItem(products[0], 3)}>
        Add Multiple
      </button>
      <button data-testid="remove-item" onClick={() => removeItem(products[0].id)}>
        Remove Item
      </button>
      <button data-testid="update-quantity" onClick={() => updateQuantity(products[0].id, 5)}>
        Update Quantity
      </button>
      <button data-testid="clear-cart" onClick={clearCart}>
        Clear Cart
      </button>
      <ul>
        {items.map((item) => (
          <li key={item.product.id} data-testid={`item-${item.product.id}`}>
            {item.product.name} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  )
}

describe("CartContext", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    window.localStorage.clear()
    jest.spyOn(window.localStorage.__proto__, "setItem")
    jest.spyOn(window.localStorage.__proto__, "getItem")
  })

  it("should initialize with an empty cart", () => {
    render(
      <CartProvider>
        <CartTestComponent />
      </CartProvider>,
    )

    expect(screen.getByTestId("item-count")).toHaveTextContent("0")
    expect(screen.getByTestId("subtotal")).toHaveTextContent("0")
    expect(screen.queryByTestId(`item-${products[0].id}`)).not.toBeInTheDocument()
  })

  it("should add an item to the cart", () => {
    render(
      <CartProvider>
        <CartTestComponent />
      </CartProvider>,
    )

    fireEvent.click(screen.getByTestId("add-item"))

    expect(screen.getByTestId("item-count")).toHaveTextContent("1")
    expect(screen.getByTestId(`item-${products[0].id}`)).toBeInTheDocument()
    expect(screen.getByTestId(`item-${products[0].id}`)).toHaveTextContent("Quantity: 1")

    // Check subtotal (price of first product)
    const expectedSubtotal = Number(products[0].price)
    expect(screen.getByTestId("subtotal")).toHaveTextContent(expectedSubtotal.toString())
  })

  it("should add multiple quantities of an item", () => {
    render(
      <CartProvider>
        <CartTestComponent />
      </CartProvider>,
    )

    fireEvent.click(screen.getByTestId("add-multiple"))

    expect(screen.getByTestId("item-count")).toHaveTextContent("3")
    expect(screen.getByTestId(`item-${products[0].id}`)).toHaveTextContent("Quantity: 3")

    // Check subtotal (price of first product * 3)
    const expectedSubtotal = Number(products[0].price) * 3
    expect(screen.getByTestId("subtotal")).toHaveTextContent(expectedSubtotal.toString())
  })

  it("should increase quantity when adding an existing item", () => {
    render(
      <CartProvider>
        <CartTestComponent />
      </CartProvider>,
    )

    // Add item once
    fireEvent.click(screen.getByTestId("add-item"))
    // Add same item again
    fireEvent.click(screen.getByTestId("add-item"))

    expect(screen.getByTestId("item-count")).toHaveTextContent("2")
    expect(screen.getByTestId(`item-${products[0].id}`)).toHaveTextContent("Quantity: 2")
  })

  it("should remove an item from the cart", () => {
    render(
      <CartProvider>
        <CartTestComponent />
      </CartProvider>,
    )

    // Add item first
    fireEvent.click(screen.getByTestId("add-item"))
    // Then remove it
    fireEvent.click(screen.getByTestId("remove-item"))

    expect(screen.getByTestId("item-count")).toHaveTextContent("0")
    expect(screen.queryByTestId(`item-${products[0].id}`)).not.toBeInTheDocument()
  })

  it("should update item quantity", () => {
    render(
      <CartProvider>
        <CartTestComponent />
      </CartProvider>,
    )

    // Add item first
    fireEvent.click(screen.getByTestId("add-item"))
    // Then update quantity
    fireEvent.click(screen.getByTestId("update-quantity"))

    expect(screen.getByTestId("item-count")).toHaveTextContent("5")
    expect(screen.getByTestId(`item-${products[0].id}`)).toHaveTextContent("Quantity: 5")
  })

  it("should clear the cart", () => {
    render(
      <CartProvider>
        <CartTestComponent />
      </CartProvider>,
    )

    // Add items
    fireEvent.click(screen.getByTestId("add-item"))
    fireEvent.click(screen.getByTestId("add-multiple"))

    // Clear cart
    fireEvent.click(screen.getByTestId("clear-cart"))

    expect(screen.getByTestId("item-count")).toHaveTextContent("0")
    expect(screen.queryByTestId(`item-${products[0].id}`)).not.toBeInTheDocument()
  })

  it("should remove item when quantity is set to 0", () => {
    render(
      <CartProvider>
        <CartTestComponent />
      </CartProvider>,
    )

    // Add item first
    fireEvent.click(screen.getByTestId("add-item"))

    // Update quantity to 0 (should remove item)
    act(() => {
      const { updateQuantity } = useCart()
      updateQuantity(products[0].id, 0)
    })

    expect(screen.getByTestId("item-count")).toHaveTextContent("0")
    expect(screen.queryByTestId(`item-${products[0].id}`)).not.toBeInTheDocument()
  })

  it("should persist cart data in localStorage", () => {
    const { unmount } = render(
      <CartProvider>
        <CartTestComponent />
      </CartProvider>,
    )

    // Add item to cart
    fireEvent.click(screen.getByTestId("add-item"))

    // Unmount and remount to test persistence
    unmount()

    // Check if localStorage was called with the correct data
    expect(window.localStorage.setItem).toHaveBeenCalled()

    // Render again to check if data is loaded from localStorage
    render(
      <CartProvider>
        <CartTestComponent />
      </CartProvider>,
    )

    // Check if localStorage.getItem was called
    expect(window.localStorage.getItem).toHaveBeenCalledWith("cart")
  })
})
