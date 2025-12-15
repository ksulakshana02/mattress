'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Product, Testimonial } from '@/lib/types'
import ProductCard from '@/components/ProductCard'
import TestimonialCard from '@/components/TestimonialCard'
import Button from '@/components/Button'

interface HomeClientProps {
    featuredProducts: Product[]
    testimonials: Testimonial[]
}

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
}

export default function HomeClient({ featuredProducts, testimonials }: HomeClientProps) {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background with gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/90 to-[var(--color-primary)]/60 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070')",
                    }}
                />

                {/* Hero Content */}
                <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 !text-white"
                    >
                        Sleep on a Cloud
                    </motion.h1>
                    <motion.p
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        transition={{ delay: 0.2 }}
                        className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto"
                    >
                        Experience luxury sleep with our premium, eco-friendly mattresses designed for ultimate comfort
                    </motion.p>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link href="/shop">
                            <Button variant="primary">Shop Mattresses</Button>
                        </Link>
                        <Link href="/about">
                            <Button variant="secondary" className="bg-white/20 border-white text-white hover:bg-white hover:text-[var(--color-primary)]">
                                Learn More
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20"
                >
                    <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </motion.div>
            </section>

            {/* Featured Products Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-[var(--color-primary)] mb-4">
                            Featured Mattresses
                        </h2>
                        <p className="text-lg text-[var(--color-text-light)] max-w-2xl mx-auto">
                            Discover our most popular mattresses, crafted with premium materials for the perfect night's sleep
                        </p>
                    </motion.div>

                    {featuredProducts.length > 0 ? (
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {featuredProducts.map((product) => (
                                <motion.div key={product._id} variants={fadeInUp}>
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-[var(--color-text-light)]">
                                No featured products available. Configure Sanity CMS to add products.
                            </p>
                        </div>
                    )}

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="text-center mt-12"
                    >
                        <Link href="/shop">
                            <Button variant="secondary">View All Mattresses</Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* USP Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-background)]">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-3 gap-12"
                    >
                        {/* USP 1 */}
                        <motion.div variants={fadeInUp} className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-accent)] mb-6">
                                <svg
                                    className="w-8 h-8 text-[var(--color-primary)]"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-3">
                                100 Night Trial
                            </h3>
                            <p className="text-[var(--color-text-light)]">
                                Try your mattress risk-free for 100 nights. Not satisfied? Full refund guaranteed.
                            </p>
                        </motion.div>

                        {/* USP 2 */}
                        <motion.div variants={fadeInUp} className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-accent)] mb-6">
                                <svg
                                    className="w-8 h-8 text-[var(--color-primary)]"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-3">
                                Free Shipping
                            </h3>
                            <p className="text-[var(--color-text-light)]">
                                Enjoy free shipping on all orders. We deliver comfort right to your door.
                            </p>
                        </motion.div>

                        {/* USP 3 */}
                        <motion.div variants={fadeInUp} className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-accent)] mb-6">
                                <svg
                                    className="w-8 h-8 text-[var(--color-primary)]"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-3">
                                Eco-Friendly Materials
                            </h3>
                            <p className="text-[var(--color-text-light)]">
                                Sustainably sourced, certified organic materials for a healthier sleep and planet.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-[var(--color-primary)] mb-4">
                            What Our Customers Say
                        </h2>
                        <p className="text-lg text-[var(--color-text-light)] max-w-2xl mx-auto">
                            Don't just take our word for it. Here's what our happy customers have to say
                        </p>
                    </motion.div>

                    {testimonials.length > 0 ? (
                        <div className="overflow-x-auto scrollbar-hide">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={staggerContainer}
                                className="flex gap-6 pb-4"
                            >
                                {testimonials.map((testimonial) => (
                                    <motion.div key={testimonial._id} variants={fadeInUp} className="min-w-[300px] md:min-w-[400px]">
                                        <TestimonialCard testimonial={testimonial} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-[var(--color-text-light)]">
                                No testimonials available yet. Configure Sanity CMS to add customer reviews.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-primary)] text-white">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-4xl font-bold mb-6">
                        Ready for Your Best Sleep Ever?
                    </h2>
                    <p className="text-xl mb-8 text-white/90">
                        Start your journey to perfect sleep today with Dimuthu Mattress
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/shop">
                            <Button variant="primary">Browse Collection</Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="secondary" className="bg-white/20 border-white text-white hover:bg-white hover:text-[var(--color-primary)]">
                                Contact Us
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    )
}
