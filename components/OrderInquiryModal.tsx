'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import Button from './Button'

const inquirySchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    product: z.string(),
    message: z.string().min(10, 'Message must be at least 10 characters'),
})

type InquiryFormData = z.infer<typeof inquirySchema>

interface OrderInquiryModalProps {
    isOpen: boolean
    onClose: () => void
    productTitle?: string
}

export default function OrderInquiryModal({
    isOpen,
    onClose,
    productTitle = '',
}: OrderInquiryModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<InquiryFormData>({
        resolver: zodResolver(inquirySchema),
        defaultValues: {
            product: productTitle,
        },
    })

    const onSubmit = async (data: InquiryFormData) => {
        setIsSubmitting(true)
        setSubmitStatus('idle')

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, subject: 'Product Inquiry' }),
            })

            if (response.ok) {
                setSubmitStatus('success')
                reset()
                setTimeout(() => {
                    onClose()
                    setSubmitStatus('idle')
                }, 2000)
            } else {
                setSubmitStatus('error')
            }
        } catch (error) {
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-[var(--color-primary)]">
                                    Product Inquiry
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="text-[var(--color-text-light)] hover:text-[var(--color-primary)] transition-colors"
                                    aria-label="Close modal"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
                                        Name *
                                    </label>
                                    <input
                                        {...register('name')}
                                        className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                                        placeholder="Your full name"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
                                        Email *
                                    </label>
                                    <input
                                        {...register('email')}
                                        type="email"
                                        className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                                        placeholder="your.email@example.com"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
                                        Phone *
                                    </label>
                                    <input
                                        {...register('phone')}
                                        type="tel"
                                        className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                                        placeholder="(123) 456-7890"
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
                                        Product
                                    </label>
                                    <input
                                        {...register('product')}
                                        className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg bg-gray-50"
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
                                        Message *
                                    </label>
                                    <textarea
                                        {...register('message')}
                                        rows={4}
                                        className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                                        placeholder="Tell us about your requirements..."
                                    />
                                    {errors.message && (
                                        <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                                    )}
                                </div>

                                {submitStatus === 'success' && (
                                    <div className="bg-green-50 text-green-800 p-3 rounded-lg">
                                        Thank you! We'll contact you soon.
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className="bg-red-50 text-red-800 p-3 rounded-lg">
                                        Something went wrong. Please try again.
                                    </div>
                                )}

                                <Button type="submit" disabled={isSubmitting} className="w-full">
                                    {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
                                </Button>
                            </form>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
