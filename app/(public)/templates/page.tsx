import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TemplateGallery from '@/components/gallery/template-gallery'

export const metadata = {
    title: 'Page Templates | Bayon Developer',
    description: 'Ready-to-use full page sections and multi-block templates for your next project.',
}

import { db } from '@/lib/db'
import { templates } from '@/db/schema'
import { desc } from 'drizzle-orm'
import { MOCK_TEMPLATES } from '@/lib/constants'

export default async function TemplatesPage() {
    let data: any[] = []
    try {
        data = await db.query.templates.findMany({
            orderBy: [desc(templates.createdAt)]
        })
        if (!data || data.length === 0) {
            data = MOCK_TEMPLATES
        }
    } catch (error) {
        console.warn('Database query failed for templates, falling back to mock data:', error)
        data = MOCK_TEMPLATES
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Header />
            <main className="flex-1">
                <TemplateGallery initialTemplates={data as any} />
            </main>
            <Footer />
        </div>
    )
}
