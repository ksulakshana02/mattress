'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { TeamMember } from '@/lib/types'
import { urlFor } from '@/lib/sanity'

interface AboutClientProps {
    teamMembers: TeamMember[]
}

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const slideInLeft = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
}

const slideInRight = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
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

export default function AboutClient({ teamMembers }: AboutClientProps) {
    return (
        <div className="min-h-screen pt-24 pb-20">
            {/* Hero Section */}
            <section className="relative h-96 flex items-center justify-center overflow-hidden mb-20">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/80 to-[var(--color-primary)]/60 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071')",
                    }}
                />
                <div className="relative z-20 text-center px-4">
                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        className="text-5xl font-bold text-white mb-4"
                    >
                        About Dimuthu Mattress
                    </motion.h1>
                    <motion.p
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-white/90 max-w-2xl mx-auto"
                    >
                        Transforming sleep experiences one mattress at a time
                    </motion.p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Brand Story */}
                <section className="mb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={slideInLeft}
                        >
                            <h2 className="text-4xl font-bold text-[var(--color-primary)] mb-6">
                                Our Story
                            </h2>
                            <div className="space-y-4 text-[var(--color-text)] text-lg">
                                <p>
                                    Dimuthu Mattress was founded with a simple mission: to revolutionize the way people sleep. We believe that quality sleep is the foundation of a healthy, productive life, and everyone deserves a mattress that supports their unique needs.
                                </p>
                                <p>
                                    Our team of sleep experts, engineers, and designers work tirelessly to create mattresses that combine cutting-edge technology with premium, eco-friendly materials. Every Dimuthu Mattress is a testament to our commitment to quality, comfort, and sustainability.
                                </p>
                                <p>
                                    From our humble beginnings in a small workshop to becoming a trusted name in premium sleep solutions, we've never lost sight of what matters most: helping people wake up refreshed and ready to take on the day.
                                </p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={slideInRight}
                            className="relative h-96 rounded-xl overflow-hidden shadow-xl"
                        >
                            <Image
                                src="/workshop.jpg"
                                alt="CloudRest Workshop"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    </div>
                </section>

                {/* Mission & Values */}
                <section className="mb-20">
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="text-4xl font-bold text-[var(--color-primary)] text-center mb-12"
                    >
                        Our Commitments
                    </motion.h2>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        <motion.div variants={fadeIn} className="bg-white rounded-xl p-8 shadow-md text-center">
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
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-3">
                                Quality First
                            </h3>
                            <p className="text-[var(--color-text-light)]">
                                We never compromise on quality. Every mattress undergoes rigorous testing to ensure it meets our high standards.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeIn} className="bg-white rounded-xl p-8 shadow-md text-center">
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
                                Sustainability
                            </h3>
                            <p className="text-[var(--color-text-light)]">
                                We're committed to protecting our planet through eco-friendly materials and sustainable manufacturing practices.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeIn} className="bg-white rounded-xl p-8 shadow-md text-center">
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
                                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-3">
                                Customer Care
                            </h3>
                            <p className="text-[var(--color-text-light)]">
                                Your satisfaction is our priority. We offer exceptional support and a 100-night trial on all mattresses.
                            </p>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Team Section */}
                {teamMembers.length > 0 && (
                    <section className="mb-20">
                        <motion.h2
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeIn}
                            className="text-4xl font-bold text-[var(--color-primary)] text-center mb-12"
                        >
                            Meet Our Team
                        </motion.h2>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {teamMembers.map((member) => (
                                <motion.div
                                    key={member._id}
                                    variants={fadeIn}
                                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                                >
                                    {member.image && (
                                        <div className="relative h-64">
                                            <Image
                                                src={urlFor(member.image).width(400).height(400).url()}
                                                alt={member.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-1">
                                            {member.name}
                                        </h3>
                                        <p className="text-[var(--color-accent-dark)] font-medium mb-3">
                                            {member.role}
                                        </p>
                                        {member.bio && (
                                            <p className="text-[var(--color-text-light)] text-sm">
                                                {member.bio}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </section>
                )}
            </div>
        </div>
    )
}
