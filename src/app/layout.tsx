import type { Metadata } from "next";
import "./globals.css";
import { CarProvider } from "@/context/CarContext";

export const metadata: Metadata = {
  title: "CarKino.com | Find Your Dream Car - Premium Used-Car Marketplace",
  description:
    "Explore thousands of verified cars, compare, and drive with confidence on CarKino.com. Fast valuation, verified sellers, and trusted automotive deals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col font-sans antialiased text-slate-800 bg-white">
        <CarProvider>{children}</CarProvider>
      </body>
    </html>
  );
}
