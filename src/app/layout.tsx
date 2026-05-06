import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Memphis Indian Restaurant | Authentic Indian Cuisine",
  description:
    "Experience the finest Hyderabadi Biryani, rich curries, sizzling appetizers, and traditional tiffins at Memphis Indian Restaurant. Authentic flavors, unforgettable taste.",
  openGraph: {
    title: "Memphis Indian Restaurant",
    description: "Authentic Indian Cuisine in Memphis — Biryani, Curries, Tiffins & More",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
