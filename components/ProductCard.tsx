'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Product } from '@/lib/types'
import { urlFor } from '@/lib/sanity'

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const imageUrl = product.mainImage
        ? urlFor(product.mainImage).width(600).height(400).url()
        : '/placeholder-product.jpg'

    const comfortBadgeColors = {
        soft: 'bg-blue-100 text-blue-800',
        medium: 'bg-green-100 text-green-800',
        firm: 'bg-orange-100 text-orange-800',
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group"
        >
            <Link href={`/product/${product.slug.current}`}>
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                    {/* Image Container with Zoom Effect */}
                    <div className="relative h-64 overflow-hidden bg-[var(--color-background)]">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            className="w-full h-full"
                        >
                            <Image
                                src={imageUrl}
                                alt={product.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </motion.div>

                        {/* Comfort Level Badge */}
                        <div className="absolute top-4 right-4">
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${comfortBadgeColors[product.comfortLevel]
                                    }`}
                            >
                                {product.comfortLevel.charAt(0).toUpperCase() +
                                    product.comfortLevel.slice(1)}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-2 group-hover:text-[var(--color-accent-dark)] transition-colors">
                            {product.title}
                        </h3>
                        <p className="text-2xl font-bold text-[var(--color-accent-dark)] mb-4">
                            LKR {product.price.toLocaleString()}
                        </p>
                        <div className="flex items-center justify-between">
                            <span className="text-[var(--color-text-light)] text-sm">
                                View Details
                            </span>
                            <svg
                                className="w-5 h-5 text-[var(--color-accent)] group-hover:translate-x-2 transition-transform"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}
