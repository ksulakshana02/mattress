// GROQ Queries for CloudRest

// Get site settings
export const siteSettingsQuery = `*[_type == "siteSettings"][0]`

// Get all products
export const allProductsQuery = `*[_type == "product"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  price,
  mainImage,
  comfortLevel,
  featured
}`

// Get single product by slug
export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  mainImage,
  gallery,
  price,
  description,
  features,
  comfortLevel,
  sizes,
  seo
}`

// Get featured products (for homepage)
export const featuredProductsQuery = `*[_type == "product" && featured == true] | order(_createdAt desc)[0...3] {
  _id,
  title,
  slug,
  mainImage,
  price,
  comfortLevel
}`

// Get testimonials
export const testimonialsQuery = `*[_type == "testimonial"] | order(_createdAt desc) {
  _id,
  customerName,
  rating,
  reviewText,
  customerPhoto,
  verifiedPurchase
}`

// Get team members
export const teamMembersQuery = `*[_type == "author"] | order(_createdAt asc) {
  _id,
  name,
  role,
  bio,
  image
}`

// Get related products by comfort level
export const relatedProductsQuery = `*[_type == "product" && comfortLevel == $comfortLevel && slug.current != $slug][0...3] {
  _id,
  title,
  slug,
  mainImage,
  price,
  comfortLevel
}`

// Filter products by comfort level and/or size
export const filterProductsQuery = (comfortLevel?: string, size?: string) => {
  let query = `*[_type == "product"`
  const conditions = []

  if (comfortLevel && comfortLevel !== 'all') {
    conditions.push(`comfortLevel == "${comfortLevel}"`)
  }

  if (size && size !== 'all') {
    conditions.push(`"${size}" in sizes`)
  }

  if (conditions.length > 0) {
    query += ` && (${conditions.join(' && ')})`
  }

  query += `] | order(_createdAt desc) {
    _id,
    title,
    slug,
    mainImage,
    price,
    comfortLevel,
    sizes
  }`

  return query
}
