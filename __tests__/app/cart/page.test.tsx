import { render, screen, fireEvent } from "@testing-library/react"
import CartPage from "@/app/cart/page"
import { CartProvider, useCart } from "@/lib/cart-context"
import { products } from "@/lib/products"

// Mock the useCart hook
jest.mock("@/lib/cart-context", () => {
  const originalModule = jest.requireActual("@/lib/cart-context")

  return {
    ...originalModule,
    useCart: jest.fn(),
  }
})

// Mock the toast hook
jest.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}))

describe("CartPage", () => {
  it("renders empty cart message when cart is empty", () => {
    // Mock empty cart
    useCart.mockReturnValue({
      items: [],
      removeItem: jest.fn(),
      updateQuantity: jest.fn(),
      clearCart: jest.fn(),
      subtotal: 0,
    })

    render(
      <CartProvider>
        <CartPage />
      </CartProvider>,
    )

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument()
    expect(screen.getByText("Browse Collection")).toBeInTheDocument()
  })

  it("renders cart items when cart has items", () => {
    // Mock cart with items
    const mockItems = [
      {
        product: products[0],
        quantity: 2,
      },
      {
        product: products[1],
        quantity: 1,
      },
    ]

    useCart.mockReturnValue({
      items: mockItems,
      removeItem: jest.fn(),
      updateQuantity: jest.fn(),
      clearCart: jest.fn(),
      subtotal: 139.97, // (39.99 * 2) + 59.99
    })

    render(
      <CartProvider>
        <CartPage />
      </CartProvider>,
    )

    // Check for product names
    expect(screen.getByText(products[0].name)).toBeInTheDocument()
    expect(screen.getByText(products[1].name)).toBeInTheDocument()

    // Check for quantities
    expect(screen.getAllByText("2")).toBeTruthy()
    expect(screen.getAllByText("1")).toBeTruthy()

    // Check for subtotal
    expect(screen.getByText("$139.97")).toBeInTheDocument()
  })

  it("calls updateQuantity when quantity controls are clicked", () => {
    const mockUpdateQuantity = jest.fn()

    // Mock cart with one item
    useCart.mockReturnValue({
      items: [
        {
          product: products[0],
          quantity: 2,
        },
      ],
      removeItem: jest.fn(),
      updateQuantity: mockUpdateQuantity,
      clearCart: jest.fn(),
      subtotal: 79.98, // 39.99 * 2
    })

    render(
      <CartProvider>
        <CartPage />
      </CartProvider>,
    )

    // Find quantity controls
    const increaseButton = screen.getByLabelText("Increase quantity")
    const decreaseButton = screen.getByLabelText("Decrease quantity")

    // Click increase button
    fireEvent.click(increaseButton)
    expect(mockUpdateQuantity).toHaveBeenCalledWith(products[0].id, 3)

    // Click decrease button
    fireEvent.click(decreaseButton)
    expect(mockUpdateQuantity).toHaveBeenCalledWith(products[0].id, 1)
  })

  it("calls removeItem when remove button is clicked", () => {
    const mockRemoveItem = jest.fn()

    // Mock cart with one item
    useCart.mockReturnValue({
      items: [
        {
          product: products[0],
          quantity: 1,
        },
      ],
      removeItem: mockRemoveItem,
      updateQuantity: jest.fn(),
      clearCart: jest.fn(),
      subtotal: 39.99,
    })

    render(
      <CartProvider>
        <CartPage />
      </CartProvider>,
    )

    // Find remove button
    const removeButton = screen.getByLabelText("Remove item")

    // Click remove button
    fireEvent.click(removeButton)
    expect(mockRemoveItem).toHaveBeenCalledWith(products[0].id)
  })

  it("calls clearCart when clear cart button is clicked", () => {
    const mockClearCart = jest.fn()

    // Mock cart with items
    useCart.mockReturnValue({
      items: [
        {
          product: products[0],
          quantity: 1,
        },
      ],
      removeItem: jest.fn(),
      updateQuantity: jest.fn(),
      clearCart: mockClearCart,
      subtotal: 39.99,
    })

    render(
      <CartProvider>
        <CartPage />
      </CartProvider>,
    )

    // Find clear cart button
    const clearButton = screen.getByText("Clear Cart")

    // Click clear cart button
    fireEvent.click(clearButton)
    expect(mockClearCart).toHaveBeenCalled()
  })

  it("simulates checkout process when checkout button is clicked", () => {
    jest.useFakeTimers()

    const mockClearCart = jest.fn()

    // Mock cart with items
    useCart.mockReturnValue({
      items: [
        {
          product: products[0],
          quantity: 1,
        },
      ],
      removeItem: jest.fn(),
      updateQuantity: jest.fn(),
      clearCart: mockClearCart,
      subtotal: 39.99,
    })

    render(
      <CartProvider>
        <CartPage />
      </CartProvider>,
    )

    // Find checkout button
    const checkoutButton = screen.getByText("Checkout")

    // Click checkout button
    fireEvent.click(checkoutButton)

    // Button should change to "Processing..."
    expect(screen.getByText("Processing...")).toBeInTheDocument()

    // Fast-forward timers
    jest.advanceTimersByTime(2000)

    // clearCart should be called after checkout completes
    expect(mockClearCart).toHaveBeenCalled()

    jest.useRealTimers()
  })
})
