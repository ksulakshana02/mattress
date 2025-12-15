'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import Button from './Button'
import * as motion from 'framer-motion/client'

const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    interestedProduct: z.string().optional(),
    message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    })

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true)
        setSubmitStatus('idle')

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, subject: 'General Inquiry' }),
            })

            if (response.ok) {
                setSubmitStatus('success')
                reset()
                // Clear success message after 5 seconds
                setTimeout(() => setSubmitStatus('idle'), 5000)
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                        Name *
                    </label>
                    <input
                        {...register('name')}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-200"
                        placeholder="Your full name"
                    />
                    {errors.name && (
                        <motion.p
                            initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-1"
                        >
                            {errors.name.message}
                        </motion.p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                        Email *
                    </label>
                    <input
                        {...register('email')}
                        type="email"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-200"
                        placeholder="your.email@example.com"
                    />
                    {errors.email && (
                        <motion.p
                            initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-1"
                        >
                            {errors.email.message}
                        </motion.p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                        Phone *
                    </label>
                    <input
                        {...register('phone')}
                        type="tel"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-200"
                        placeholder="(123) 456-7890"
                    />
                    {errors.phone && (
                        <motion.p
                            initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-1"
                        >
                            {errors.phone.message}
                        </motion.p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                        Interested Product
                    </label>
                    <div className="relative">
                        <select
                            {...register('interestedProduct')}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-200 appearance-none"
                        >
                            <option value="">Select a product...</option>
                            <option value="Cloud Comfort Soft">Cloud Comfort Soft</option>
                            <option value="Dream Balance Medium">Dream Balance Medium</option>
                            <option value="Firm Support Pro">Firm Support Pro</option>
                            <option value="General Inquiry">General Inquiry</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Message *
                </label>
                <textarea
                    {...register('message')}
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="How can we help you?"
                />
                {errors.message && (
                    <motion.p
                        initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1"
                    >
                        {errors.message.message}
                    </motion.p>
                )}
            </div>

            <motion.div animate={{ height: 'auto' }} className="overflow-hidden">
                {submitStatus === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg flex items-center space-x-3 mb-4"
                    >
                        <svg className="w-5 h-5 flex-shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <p className="font-semibold">Message Sent Successfully!</p>
                            <p className="text-sm">We'll get back to you within 24 hours.</p>
                        </div>
                    </motion.div>
                )}

                {submitStatus === 'error' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg flex items-center space-x-3 mb-4"
                    >
                        <svg className="w-5 h-5 flex-shrink-0 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <p className="font-semibold">Submission Failed</p>
                            <p className="text-sm">Please try again or email us directly.</p>
                        </div>
                    </motion.div>
                )}
            </motion.div>

            <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto h-12 text-lg">
                {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
        </form>
    )
}
