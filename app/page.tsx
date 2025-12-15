import { client } from '@/lib/sanity'
import { featuredProductsQuery, testimonialsQuery } from '@/lib/queries'
import { Product, Testimonial } from '@/lib/types'
import HomeClient from '@/components/HomeClient'

export const revalidate = 60 // Revalidate every minute

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    return await client.fetch(featuredProductsQuery)
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
}

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    return await client.fetch(testimonialsQuery)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts()
  const testimonials = await getTestimonials()

  return (
    <HomeClient featuredProducts={featuredProducts} testimonials={testimonials} />
  )
}
