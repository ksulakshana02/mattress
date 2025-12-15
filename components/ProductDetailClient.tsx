'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/lib/sanity'
import { Product } from '@/lib/types'
import ProductCard from '@/components/ProductCard'
import OrderInquiryModal from '@/components/OrderInquiryModal'
import Button from '@/components/Button'

interface ProductDetailClientProps {
    product: Product
    relatedProducts: Product[]
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
    const [selectedImage, setSelectedImage] = useState<any>(product.mainImage)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const comfortBadgeColors = {
        soft: 'bg-blue-100 text-blue-800',
        medium: 'bg-green-100 text-green-800',
        firm: 'bg-orange-100 text-orange-800',
    }

    return (
        <>
            <div className="min-h-screen pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Product Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                        {/* Image Gallery */}
                        <div>
                            {/* Main Image */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="relative h-96 lg:h-[500px] bg-[var(--color-background)] rounded-xl overflow-hidden mb-4"
                            >
                                <Image
                                    src={
                                        selectedImage
                                            ? urlFor(selectedImage).width(800).height(600).url()
                                            : '/placeholder-product.jpg'
                                    }
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>

                            {/* Thumbnail Gallery */}
                            {product.gallery && product.gallery.length > 0 && (
                                <div className="grid grid-cols-4 gap-4">
                                    <button
                                        onClick={() => setSelectedImage(product.mainImage)}
                                        className={`relative h-20 bg-[var(--color-background)] rounded-lg overflow-hidden border-2 transition-all ${selectedImage === product.mainImage
                                            ? 'border-[var(--color-accent)]'
                                            : 'border-transparent hover:border-[var(--color-accent)]'
                                            }`}
                                    >
                                        <Image
                                            src={urlFor(product.mainImage).width(200).height(150).url()}
                                            alt="Main"
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                    {product.gallery.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(image)}
                                            className={`relative h-20 bg-[var(--color-background)] rounded-lg overflow-hidden border-2 transition-all ${selectedImage === image
                                                ? 'border-[var(--color-accent)]'
                                                : 'border-transparent hover:border-[var(--color-accent)]'
                                                }`}
                                        >
                                            <Image
                                                src={urlFor(image).width(200).height(150).url()}
                                                alt={`Gallery ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${comfortBadgeColors[product.comfortLevel]
                                        }`}
                                >
                                    {product.comfortLevel.charAt(0).toUpperCase() +
                                        product.comfortLevel.slice(1)}
                                </span>
                            </div>

                            <h1 className="text-4xl font-bold text-[var(--color-primary)] mb-4">
                                {product.title}
                            </h1>

                            <p className="text-3xl font-bold text-[var(--color-accent-dark)] mb-6">
                                LKR {product.price.toLocaleString()}
                            </p>

                            {/* Description */}
                            {product.description && (
                                <div className="prose prose-lg mb-8 text-[var(--color-text)]">
                                    <PortableText value={product.description} />
                                </div>
                            )}

                            {/* Features */}
                            {product.features && product.features.length > 0 && (
                                <div className="mb-8 w-full">
                                    <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-4">
                                        Key Features
                                    </h3>
                                    <ul className="space-y-2">
                                        {product.features.map((feature: any, index: number) => {
                                            const featureText = typeof feature === 'string' ? feature : feature.feature;
                                            return (
                                                <li key={feature._key || index} className="flex items-start">
                                                    <svg
                                                        className="w-6 h-6 text-[var(--color-accent)] mr-3 flex-shrink-0"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    <span className="text-[var(--color-text)]">
                                                        {featureText}
                                                    </span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}

                            {/* Available Sizes */}
                            {product.sizes && product.sizes.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-3">
                                        Available Sizes
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {product.sizes.map((size) => (
                                            <span
                                                key={size}
                                                className="px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-sm font-medium"
                                            >
                                                {size.charAt(0).toUpperCase() + size.slice(1).replace('-', ' ')}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CTA Button */}
                            <Button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full lg:w-auto"
                            >
                                Inquire to Buy
                            </Button>

                            {/* Trust Badges */}
                            <div className="mt-8 pt-8 border-t border-[var(--color-border)]">
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="flex flex-col items-center">
                                        <div className="mb-2 text-[var(--color-primary)]">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <p className="text-xs text-[var(--color-text-light)] font-medium">
                                            Quality Guarantee
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="mb-2 text-[var(--color-primary)]">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                                            </svg>
                                        </div>
                                        <p className="text-xs text-[var(--color-text-light)] font-medium">
                                            Free Shipping
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="mb-2 text-[var(--color-primary)]">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <p className="text-xs text-[var(--color-text-light)] font-medium">
                                            Eco-Friendly
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <div>
                            <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-8">
                                You Might Also Like
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {relatedProducts.map((relatedProduct) => (
                                    <ProductCard key={relatedProduct._id} product={relatedProduct} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Order Inquiry Modal */}
            <OrderInquiryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                productTitle={product.title}
            />
        </>
    )
}
