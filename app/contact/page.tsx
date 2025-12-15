import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import { client } from "@/lib/sanity";
import { siteSettingsQuery } from "@/lib/queries";
import { SiteSettings } from "@/lib/types";
import * as motion from "framer-motion/client";

async function getContactSettings(): Promise<SiteSettings | null> {
    try {
        return await client.fetch(siteSettingsQuery);
    } catch (error) {
        console.error("Error fetching site settings:", error);
        return null;
    }
}

export async function generateMetadata(): Promise<Metadata> {
    const settings: SiteSettings = await client.fetch(siteSettingsQuery);

    return {
        title: settings?.contactSeo?.metaTitle || "Contact Us | Dimuthu Mattress",
        description: settings?.contactSeo?.metaDescription || "Get in touch with Dimuthu Mattress experts. Visit our showroom or call us.",
        keywords: settings?.contactSeo?.metaKeywords || ["contact mattress store", "showroom location", "customer support"],
    };
}

export default async function ContactPage() {
    const settings = await getContactSettings();

    return (
        <div className="min-h-screen bg-[var(--color-background)]">
            <Navbar />

            <main className="pt-24 pb-16">
                {/* Hero Section */}
                <section className="relative bg-[var(--color-primary)] text-white py-20 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/pattern-bg.png')] opacity-10 mix-blend-overlay"></div>
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-6xl font-bold font-serif mb-6"
                        >
                            Get in Touch
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
                        >
                            Have questions about finding your perfect sleep? Our dedicated team is here to help you every step of the way.
                        </motion.p>
                    </div>
                </section>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-[-3rem] relative z-20">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-5 min-h-[600px]">

                        {/* Contact Info Sidebar */}
                        <div className="lg:col-span-2 bg-[var(--color-primary-dark)] text-white p-10 flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)] rounded-full mix-blend-multiply filter blur-3xl opacity-10 -mr-32 -mt-32"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-accent)] rounded-full mix-blend-multiply filter blur-3xl opacity-10 -ml-32 -mb-32"></div>

                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold font-serif mb-8 text-[var(--color-accent)]">Contact Information</h3>
                                <div className="space-y-8">
                                    <div className="flex items-start space-x-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--color-accent)] mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <div>
                                            <h4 className="font-semibold text-lg">Visit Us</h4>
                                            <p className="text-gray-400 whitespace-pre-line leading-relaxed mt-1">
                                                {settings?.address || "123 Sleep Street\nDream City, SL 12345"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--color-accent)] mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <div>
                                            <h4 className="font-semibold text-lg">Call Us</h4>
                                            <p className="text-gray-400 mt-1">
                                                {settings?.contactPhone || "(555) 123-4567"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--color-accent)] mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <div>
                                            <h4 className="font-semibold text-lg">Email Us</h4>
                                            <p className="text-gray-400 mt-1">
                                                {settings?.contactEmail || "info@dimuthumattress.com"}
                                            </p>
                                        </div>
                                    </div>

                                    {settings?.openingHours && (
                                        <div className="flex items-start space-x-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--color-accent)] mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <div>
                                                <h4 className="font-semibold text-lg">Opening Hours</h4>
                                                <p className="text-gray-400 whitespace-pre-line mt-1">
                                                    {settings.openingHours}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="relative z-10 mt-12">
                                <p className="text-sm text-gray-400 italic">
                                    "Sleep is the golden chain that ties health and our bodies together."
                                </p>
                            </div>
                        </div>

                        {/* Contact Form Section */}
                        <div className="lg:col-span-3 bg-white p-8 md:p-12">
                            <div className="max-w-lg mx-auto lg:mx-0 lg:max-w-none">
                                <h2 className="text-3xl font-bold font-serif text-[var(--color-primary)] mb-2">Send us a Message</h2>
                                <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you shortly.</p>
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
}
