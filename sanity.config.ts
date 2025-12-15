import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
    name: 'dimuthumattress',
    title: 'Dimuthu Mattress CMS',

    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'omluu8qd',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

    plugins: [structureTool(), visionTool()],

    schema: {
        types: schemaTypes,
    },

    basePath: '/studio',
})
