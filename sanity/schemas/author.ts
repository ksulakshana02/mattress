import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'author',
    title: 'Team Member',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'role',
            title: 'Role/Position',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'bio',
            title: 'Bio',
            type: 'text',
            description: 'Brief biography or description',
        }),
        defineField({
            name: 'image',
            title: 'Profile Photo',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'role',
            media: 'image',
        },
    },
})
