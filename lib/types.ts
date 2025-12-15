// TypeScript types for Sanity data

export interface SeoSettings {
    metaTitle?: string
    metaDescription?: string
    metaKeywords?: string[]
}

export interface Product {
    _id: string
    title: string
    slug: {
        current: string
    }
    mainImage: any
    gallery?: any[]
    price: number
    description: any[] // Portable Text
    features?: string[] // Assuming simple array of strings based on usage
    comfortLevel: 'soft' | 'medium' | 'firm'
    sizes: string[]
    featured?: boolean
    seo?: SeoSettings
}

export interface Testimonial {
    _id: string
    customerName: string
    rating: number
    reviewText: string
    customerPhoto?: any
    verifiedPurchase?: boolean
}

export interface InquiryFormData {
    name: string
    email: string
    phone: string
    message: string
    productId?: string
    productName?: string
}

export interface SiteSettings {
    title: string
    description: string
    keywords: string[]
    contactEmail: string
    contactPhone: string
    address: string
    openingHours: string
    socialLinks: {
        facebook?: string
        instagram?: string
        twitter?: string
    }
    smtpSettings?: {
        host: string
        port: number
        user: string
        password?: string
        fromEmail: string
    }
    shopSeo?: SeoSettings
    aboutSeo?: SeoSettings
    contactSeo?: SeoSettings
}

export interface TeamMember {
    _id: string
    name: string
    role: string
    bio?: string
    image?: any
}
