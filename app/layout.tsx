import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { client } from "@/lib/sanity";
import { siteSettingsQuery } from "@/lib/queries";
import { SiteSettings } from "@/lib/types";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings: SiteSettings = await client.fetch(siteSettingsQuery);

  return {
    title: settings?.title || "Dimuthu Mattress - Premium Mattresses for Perfect Sleep",
    description: settings?.description || "Experience the ultimate in sleep comfort with Dimuthu Mattress. Eco-friendly materials, 100-night trial, and free shipping. Sleep on a cloud.",
    keywords: settings?.keywords || ["mattress", "premium mattress", "sleep", "comfort", "eco-friendly", "cloud mattress", "Dimuthu Mattress"],
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased font-sans`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
