import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ComponentGallery from '@/components/gallery/component-gallery'

export const metadata = {
    title: 'Component Gallery | Bayon Developer',
    description: 'Browse our interactive collection of professional UI components.',
}

import { db } from '@/lib/db'
import { components } from '@/db/schema'
import { desc, eq } from 'drizzle-orm'
import { MOCK_COMPONENTS } from '@/lib/constants'

export default async function ComponentsPage() {
    let data: any[] = []
    try {
        data = await db.query.components.findMany({
            where: eq(components.isPublished, true),
            orderBy: [desc(components.createdAt)]
        })
        if (!data || data.length === 0) {
            data = MOCK_COMPONENTS
        }
    } catch (error) {
        console.warn('Database query failed for components, falling back to mock data:', error)
        data = MOCK_COMPONENTS
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Header />
            <main className="flex-1">
                <ComponentGallery initialComponents={data as any} />
            </main>
            <Footer />
        </div>
    )
}
