'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/lib/types'
import ProductCard from '@/components/ProductCard'

interface ShopClientProps {
    initialProducts: Product[]
}

export default function ShopClient({ initialProducts }: ShopClientProps) {
    const [products] = useState<Product[]>(initialProducts)
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts)
    const [comfortFilter, setComfortFilter] = useState<string>('all')
    const [sizeFilter, setSizeFilter] = useState<string>('all')

    useEffect(() => {
        let filtered = products

        if (comfortFilter !== 'all') {
            filtered = filtered.filter(
                (product) => product.comfortLevel === comfortFilter
            )
        }

        if (sizeFilter !== 'all') {
            filtered = filtered.filter((product) =>
                product.sizes?.includes(sizeFilter)
            )
        }

        setFilteredProducts(filtered)
    }, [comfortFilter, sizeFilter, products])

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-[var(--color-primary)] mb-4">
                        Shop Mattresses
                    </h1>
                    <p className="text-lg text-[var(--color-text-light)] max-w-2xl mx-auto">
                        Browse our collection of premium mattresses. Each one is carefully crafted for the perfect sleep experience.
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Comfort Level Filter */}
                        <div>
                            <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                                Comfort Level
                            </label>
                            <select
                                value={comfortFilter}
                                onChange={(e) => setComfortFilter(e.target.value)}
                                className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
                            >
                                <option value="all">All Comfort Levels</option>
                                <option value="soft">Soft</option>
                                <option value="medium">Medium</option>
                                <option value="firm">Firm</option>
                            </select>
                        </div>

                        {/* Size Filter */}
                        <div>
                            <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                                Size
                            </label>
                            <select
                                value={sizeFilter}
                                onChange={(e) => setSizeFilter(e.target.value)}
                                className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
                            >
                                <option value="all">All Sizes</option>
                                <option value="twin">Twin</option>
                                <option value="full">Full</option>
                                <option value="queen">Queen</option>
                                <option value="king">King</option>
                                <option value="cal-king">Cal King</option>
                            </select>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mt-4 text-sm text-[var(--color-text-light)]">
                        Showing {filteredProducts.length} of {products.length} mattresses
                    </div>
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <svg
                            className="mx-auto h-12 w-12 text-[var(--color-text-light)]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <h3 className="mt-4 text-lg font-medium text-[var(--color-text)]">
                            No products found
                        </h3>
                        <p className="mt-2 text-[var(--color-text-light)]">
                            Try adjusting your filters to see more results.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
