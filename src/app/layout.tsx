import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/src/lib/CartContext";

export const metadata: Metadata = {
  title: "SaveABite",
  description: "Săn đồ ăn ngon, giá hời, bảo vệ môi trường",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
