import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import ProductDetailClient from "@/components/ProductDetailClient";
import { client } from "@/lib/sanity";
import { productBySlugQuery, relatedProductsQuery } from "@/lib/queries";
import { Product } from "@/lib/types";

async function getProduct(slug: string): Promise<Product | null> {
    try {
        return await client.fetch(productBySlugQuery, { slug });
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}

async function getRelatedProducts(product: Product): Promise<Product[]> {
    try {
        return await client.fetch(relatedProductsQuery, {
            comfortLevel: product.comfortLevel,
            slug: product.slug.current,
        });
    } catch (error) {
        console.error("Error fetching related products:", error);
        return [];
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const product = await getProduct(slug);

    if (!product) {
        return {
            title: "Product Not Found | Dimuthu Mattress",
            description: "The requested product could not be found."
        };
    }

    return {
        title: product.seo?.metaTitle || `${product.title} - Dimuthu Mattress`,
        description: product.seo?.metaDescription || product.title + " by Dimuthu Mattress. Experience premium comfort.",
        keywords: product.seo?.metaKeywords || ["mattress", product.comfortLevel, "Dimuthu Mattress"],
        openGraph: {
            title: product.seo?.metaTitle || product.title,
            description: product.seo?.metaDescription || product.title,
            images: product.mainImage ? [{ url: product.mainImage.asset?.url || '' }] : [],
        }
    };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = await getProduct(slug);

    if (!product) {
        notFound();
    }

    const relatedProducts = await getRelatedProducts(product);

    return (
        <div className="min-h-screen bg-[var(--color-background)]">
            <Navbar />
            <ProductDetailClient product={product} relatedProducts={relatedProducts} />
        </div>
    );
}
