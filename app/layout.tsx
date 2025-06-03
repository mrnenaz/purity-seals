import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "@/lib/cart-context";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Imperial Purity Seals - Warhammer 40K Collectibles",
  description:
    "Authentic replicas of Warhammer 40,000 purity seals for the Emperor's faithful",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          {children}
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
