import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TemplateGallery from '@/components/gallery/template-gallery'

export const metadata = {
    title: 'Page Templates | DevSuite',
    description: 'Ready-to-use full page sections and multi-block templates for your next project.',
}

import { db } from '@/lib/db'
import { templates } from '@/db/schema'
import { desc } from 'drizzle-orm'

export default async function TemplatesPage() {
    const data = await db.query.templates.findMany({
        orderBy: [desc(templates.createdAt)]
    })

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
