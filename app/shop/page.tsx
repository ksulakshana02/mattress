import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShopClient from "@/components/ShopClient";
import { client } from "@/lib/sanity";
import { siteSettingsQuery, allProductsQuery } from "@/lib/queries";
import { SiteSettings, Product } from "@/lib/types";

async function getData() {
    try {
        const [settings, products] = await Promise.all([
            client.fetch(siteSettingsQuery),
            client.fetch(allProductsQuery)
        ]);
        return { settings, products };
    } catch (error) {
        console.error("Error fetching shop data:", error);
        return { settings: null, products: [] };
    }
}

export async function generateMetadata(): Promise<Metadata> {
    const settings: SiteSettings = await client.fetch(siteSettingsQuery);

    return {
        title: settings?.shopSeo?.metaTitle || "Shop Premium Mattresses | Dimuthu Mattress",
        description: settings?.shopSeo?.metaDescription || "Browse our collection of premium mattresses designed for perfect sleep.",
        keywords: settings?.shopSeo?.metaKeywords || ["mattress shop", "buy mattress", "premium bedding"],
    };
}

export default async function ShopPage() {
    const { products } = await getData();

    return (
        <div className="min-h-screen bg-[var(--color-background)]">
            <Navbar />
            <ShopClient initialProducts={products} />
        </div>
    );
}
