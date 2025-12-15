import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Product Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'feature',
              title: 'Feature',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'comfortLevel',
      title: 'Comfort Level',
      type: 'string',
      options: {
        list: [
          { title: 'Soft', value: 'soft' },
          { title: 'Medium', value: 'medium' },
          { title: 'Firm', value: 'firm' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sizes',
      title: 'Available Sizes',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        list: [
          { title: 'Twin', value: 'twin' },
          { title: 'Full', value: 'full' },
          { title: 'Queen', value: 'queen' },
          { title: 'King', value: 'king' },
          { title: 'Cal King', value: 'cal-king' },
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: 'Is Featured Product?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      group: 'seo',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Title for search results (recommended length: 50-60 characters)',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Description for search results (recommended length: 150-160 characters)',
        },
        {
          name: 'metaKeywords',
          title: 'Meta Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Keywords for SEO',
        },
      ],
    }),
  ],
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      comfortLevel: 'comfortLevel',
    },
    prepare(selection) {
      const { title, media, comfortLevel } = selection
      return {
        title,
        subtitle: comfortLevel ? `${comfortLevel} comfort` : '',
        media,
      }
    },
  },
})
