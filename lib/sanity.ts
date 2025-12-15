import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-12-11',
    useCdn: true, // Set to false for ISR/SSR with fresh data
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
    return builder.image(source)
}
