'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Testimonial } from '@/lib/types'
import { urlFor } from '@/lib/sanity'

interface TestimonialCardProps {
    testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
    const imageUrl = testimonial.customerPhoto
        ? urlFor(testimonial.customerPhoto).width(80).height(80).url()
        : '/placeholder-avatar.jpg'

    // Generate star rating
    const renderStars = () => {
        return Array.from({ length: 5 }, (_, index) => (
            <svg
                key={index}
                className={`w-5 h-5 ${index < testimonial.rating
                        ? 'text-[var(--color-accent)]'
                        : 'text-gray-300'
                    }`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 min-w-[320px] max-w-[400px] flex-shrink-0"
        >
            {/* Star Rating */}
            <div className="flex mb-4">{renderStars()}</div>

            {/* Review Text */}
            <p className="text-[var(--color-text)] mb-6 leading-relaxed">
                "{testimonial.reviewText}"
            </p>

            {/* Customer Info */}
            <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                        src={imageUrl}
                        alt={testimonial.customerName}
                        fill
                        className="object-cover"
                    />
                </div>
                <div>
                    <p className="font-semibold text-[var(--color-primary)]">
                        {testimonial.customerName}
                    </p>
                    {testimonial.verifiedPurchase && (
                        <p className="text-xs text-[var(--color-text-light)] flex items-center">
                            <svg
                                className="w-4 h-4 mr-1 text-green-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Verified Purchase
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
    )
}
