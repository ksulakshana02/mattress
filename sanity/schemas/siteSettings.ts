export default {
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Site Title',
            type: 'string',
            description: 'The main title of the website (e.g. DiMuthu Mattress)',
        },
        {
            name: 'description',
            title: 'Meta Description',
            type: 'text',
            description: 'Global description for SEO',
        },
        {
            name: 'keywords',
            title: 'SEO Keywords',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Keywords for SEO',
        },
        {
            name: 'contactEmail',
            title: 'Contact Email',
            type: 'string',
        },
        {
            name: 'contactPhone',
            title: 'Contact Phone',
            type: 'string',
        },
        {
            name: 'address',
            title: 'Address',
            type: 'text',
        },
        {
            name: 'openingHours',
            title: 'Opening Hours',
            type: 'string',
        },
        {
            name: 'socialLinks',
            title: 'Social Media Links',
            type: 'object',
            fields: [
                { name: 'facebook', title: 'Facebook URL', type: 'url' },
                { name: 'instagram', title: 'Instagram URL', type: 'url' },
                { name: 'twitter', title: 'Twitter URL', type: 'url' },
            ],
        },
        {
            name: 'smtpSettings',
            title: 'SMTP Email Settings',
            type: 'object',
            description: 'Configuration for sending emails. *SECURITY WARNING: Be careful storing sensitive passwords here.*',
            fields: [
                { name: 'host', title: 'SMTP Host', type: 'string' },
                { name: 'port', title: 'SMTP Port', type: 'number' },
                { name: 'user', title: 'SMTP User', type: 'string' },
                { name: 'password', title: 'SMTP Password', type: 'string' }, // String for now, could be encrypted but Sanity stores content
                { name: 'fromEmail', title: 'From Email Address', type: 'string' },
            ],
        },
        {
            name: 'shopSeo',
            title: 'Shop Page SEO',
            type: 'object',
            group: 'seo',
            fields: [
                { name: 'title', title: 'Meta Title', type: 'string' },
                { name: 'description', title: 'Meta Description', type: 'text' },
                { name: 'keywords', title: 'Keywords', type: 'array', of: [{ type: 'string' }] },
            ]
        },
        {
            name: 'aboutSeo',
            title: 'About Page SEO',
            type: 'object',
            group: 'seo',
            fields: [
                { name: 'title', title: 'Meta Title', type: 'string' },
                { name: 'description', title: 'Meta Description', type: 'text' },
                { name: 'keywords', title: 'Keywords', type: 'array', of: [{ type: 'string' }] },
            ]
        },
        {
            name: 'contactSeo',
            title: 'Contact Page SEO',
            type: 'object',
            group: 'seo',
            fields: [
                { name: 'title', title: 'Meta Title', type: 'string' },
                { name: 'description', title: 'Meta Description', type: 'text' },
                { name: 'keywords', title: 'Keywords', type: 'array', of: [{ type: 'string' }] },
            ]
        },
    ],
    groups: [
        {
            name: 'seo',
            title: 'Pages SEO',
        }
    ]
}
