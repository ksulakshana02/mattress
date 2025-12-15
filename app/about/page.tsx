import { Metadata } from 'next'
import { client } from '@/lib/sanity'
import { teamMembersQuery, siteSettingsQuery } from '@/lib/queries'
import { TeamMember, SiteSettings } from '@/lib/types'
import AboutClient from '@/components/AboutClient'

export const revalidate = 60

async function getTeamMembers(): Promise<TeamMember[]> {
    try {
        return await client.fetch(teamMembersQuery)
    } catch (error) {
        console.error('Error fetching team members:', error)
        return []
    }
}

export async function generateMetadata(): Promise<Metadata> {
    const settings: SiteSettings = await client.fetch(siteSettingsQuery);

    return {
        title: settings?.aboutSeo?.metaTitle || "About Us | Dimuthu Mattress",
        description: settings?.aboutSeo?.metaDescription || "Learn about Dimuthu Mattress, our story, mission, and the team dedicated to your perfect sleep.",
        keywords: settings?.aboutSeo?.metaKeywords || ["about mattress company", "our story", "mattress team"],
    };
}

export default async function AboutPage() {
    const teamMembers = await getTeamMembers()

    return (
        <AboutClient teamMembers={teamMembers} />
    )
}
