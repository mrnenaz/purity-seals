import { render, screen, fireEvent } from "@testing-library/react";
import { Navbar } from "@/components/navbar";
import { CartProvider } from "@/lib/cart-context";

// Mock the cart icon component
jest.mock("@/components/cart-icon", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="cart-icon">Cart Icon</div>,
  };
});

describe("Navbar", () => {
  it("renders the navbar with logo and links", () => {
    render(
      <CartProvider>
        <Navbar />
      </CartProvider>
    );

    // Check for logo
    expect(screen.getByText("IMPERIAL PURITY SEALS")).toBeInTheDocument();

    // Check for navigation links
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Collection")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();

    // Check for cart icon
    expect(screen.getByTestId("cart-icon")).toBeInTheDocument();
  });

  it("toggles mobile menu when button is clicked", () => {
    render(
      <CartProvider>
        <Navbar />
      </CartProvider>
    );

    // Mobile menu should be closed initially
    const navLinks = screen
      .getByRole("navigation")
      .querySelector('[class*="navLinks"]');
    expect(navLinks).not.toHaveClass("open");

    // Click the mobile menu button
    const menuButton = screen
      .getByRole("navigation")
      .querySelector('[class*="mobileMenuButton"]');
    fireEvent.click(menuButton);

    // Mobile menu should be open
    expect(navLinks).toHaveClass("open");

    // Click again to close
    fireEvent.click(menuButton);

    // Mobile menu should be closed
    expect(navLinks).not.toHaveClass("open");
  });

  it("closes mobile menu when a link is clicked", () => {
    render(
      <CartProvider>
        <Navbar />
      </CartProvider>
    );

    // Open the mobile menu
    const menuButton = screen
      .getByRole("navigation")
      .querySelector('[class*="mobileMenuButton"]');
    fireEvent.click(menuButton);

    // Click a link
    fireEvent.click(screen.getByText("Collection"));

    // Mobile menu should be closed
    const navLinks = screen
      .getByRole("navigation")
      .querySelector('[class*="navLinks"]');
    expect(navLinks).not.toHaveClass("open");
  });
});
