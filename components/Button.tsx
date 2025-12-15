'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ButtonProps {
    children: ReactNode
    variant?: 'primary' | 'secondary'
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset'
    className?: string
    disabled?: boolean
}

export default function Button({
    children,
    variant = 'primary',
    onClick,
    type = 'button',
    className = '',
    disabled = false,
}: ButtonProps) {
    const baseStyles =
        'px-8 py-3 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const variantStyles = {
        primary:
            'bg-[var(--color-accent)] text-[var(--color-primary)] hover:bg-[var(--color-accent-dark)] focus:ring-[var(--color-accent)]',
        secondary:
            'border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white focus:ring-[var(--color-primary)]',
    }

    return (
        <motion.button
            whileHover={{ scale: disabled ? 1 : 1.05 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        >
            {children}
        </motion.button>
    )
}
