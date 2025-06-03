import { render, screen } from "@testing-library/react"
import CartIcon from "@/components/cart-icon"
import { CartProvider, useCart } from "@/lib/cart-context"

// Mock the useCart hook to control the item count
jest.mock("@/lib/cart-context", () => {
  const originalModule = jest.requireActual("@/lib/cart-context")

  return {
    ...originalModule,
    useCart: jest.fn(),
  }
})

describe("CartIcon", () => {
  it("renders without a badge when cart is empty", () => {
    // Mock the useCart hook to return empty cart
    useCart.mockReturnValue({
      itemCount: 0,
    })

    render(
      <CartProvider>
        <CartIcon />
      </CartProvider>,
    )

    // Should not find a badge
    const badge = screen.queryByText("0")
    expect(badge).not.toBeInTheDocument()
  })

  it("renders with a badge showing item count when cart has items", () => {
    // Mock the useCart hook to return cart with items
    useCart.mockReturnValue({
      itemCount: 5,
    })

    render(
      <CartProvider>
        <CartIcon />
      </CartProvider>,
    )

    // Should find a badge with count
    const badge = screen.getByText("5")
    expect(badge).toBeInTheDocument()
  })

  it("links to the cart page", () => {
    useCart.mockReturnValue({
      itemCount: 0,
    })

    render(
      <CartProvider>
        <CartIcon />
      </CartProvider>,
    )

    // Should be a link to /cart
    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "/cart")
  })
})
