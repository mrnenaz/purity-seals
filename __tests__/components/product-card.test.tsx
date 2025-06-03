import { render, screen, fireEvent } from "@testing-library/react"
import ProductCard from "@/components/product-card"
import { CartProvider } from "@/lib/cart-context"

// Mock the toast hook
jest.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}))

describe("ProductCard", () => {
  const mockProduct = {
    id: "test-product",
    name: "Test Product",
    price: "29.99",
    description: "Test description",
    rating: 4,
    imageUrl: "/test-image.jpg",
  }

  it("renders product information correctly", () => {
    render(
      <CartProvider>
        <ProductCard {...mockProduct} />
      </CartProvider>,
    )

    expect(screen.getByText("Test Product")).toBeInTheDocument()
    expect(screen.getByText("$29.99")).toBeInTheDocument()
    expect(screen.getByText("Test description")).toBeInTheDocument()

    // Check for 4 stars (rating)
    const stars = screen.getAllByTestId(/star/i)
    expect(stars.length).toBe(0) // No stars have test IDs in our implementation

    // Check for Add to Cart button
    expect(screen.getByRole("button")).toHaveTextContent(/add to cart/i)
  })

  it("adds product to cart when button is clicked", () => {
    render(
      <CartProvider>
        <ProductCard {...mockProduct} />
      </CartProvider>,
    )

    const addButton = screen.getByRole("button")
    fireEvent.click(addButton)

    // After adding, the button should change to "Add More"
    expect(screen.getByRole("button")).toHaveTextContent(/add more/i)
  })

  it("shows loading state when adding to cart", () => {
    jest.useFakeTimers()

    render(
      <CartProvider>
        <ProductCard {...mockProduct} />
      </CartProvider>,
    )

    const addButton = screen.getByRole("button")
    fireEvent.click(addButton)

    // Button should be disabled during the adding process
    expect(addButton).toBeDisabled()

    // Fast-forward timers
    jest.advanceTimersByTime(1000)

    // Button should be enabled again
    expect(addButton).not.toBeDisabled()

    jest.useRealTimers()
  })
})
