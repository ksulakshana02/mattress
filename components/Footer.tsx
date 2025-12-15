import { client } from '@/lib/sanity'
import { siteSettingsQuery } from '@/lib/queries'
import { SiteSettings } from '@/lib/types'
import FooterClient from '@/components/FooterClient'

async function getSiteSettings(): Promise<SiteSettings | null> {
    try {
        return await client.fetch(siteSettingsQuery)
    } catch (error) {
        console.error("Error fetching site settings:", error)
        return null
    }
}

export default async function Footer() {
    const settings = await getSiteSettings()

    return (
        <FooterClient settings={settings} />
    )
}
