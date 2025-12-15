import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'testimonial',
    title: 'Testimonial',
    type: 'document',
    fields: [
        defineField({
            name: 'customerName',
            title: 'Customer Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'rating',
            title: 'Rating',
            type: 'number',
            validation: (Rule) => Rule.required().min(1).max(5).integer(),
            description: 'Rating from 1 to 5 stars',
        }),
        defineField({
            name: 'reviewText',
            title: 'Review',
            type: 'text',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'customerPhoto',
            title: 'Customer Photo',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'verifiedPurchase',
            title: 'Verified Purchase',
            type: 'boolean',
            initialValue: true,
        }),
    ],
    preview: {
        select: {
            title: 'customerName',
            subtitle: 'rating',
            media: 'customerPhoto',
        },
        prepare(selection) {
            const { title, subtitle } = selection
            return {
                title,
                subtitle: subtitle ? `${subtitle} stars` : '',
                media: selection.media,
            }
        },
    },
})
