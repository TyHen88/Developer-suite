import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ComponentGallery from '@/components/gallery/component-gallery'

export const metadata = {
    title: 'Component Gallery | DevSuite',
    description: 'Browse our interactive collection of professional UI components.',
}

import { db } from '@/lib/db'
import { components } from '@/db/schema'
import { desc, eq } from 'drizzle-orm'

export default async function ComponentsPage() {
    const data = await db.query.components.findMany({
        where: eq(components.isPublished, true),
        orderBy: [desc(components.createdAt)]
    })

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
