import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StarterGallery from '@/components/gallery/starter-gallery'

export const metadata = {
    title: 'Starter Kits | Bayon Developer',
    description: 'Pro-grade high-performance starter kits for Next.js, React, and more.',
}

import { db } from '@/lib/db'
import { starters } from '@/db/schema'
import { desc } from 'drizzle-orm'
import { MOCK_STARTERS } from '@/lib/constants'

export default async function StartersPage() {
    let data: any[] = []
    try {
        data = await db.query.starters.findMany({
            orderBy: [desc(starters.createdAt)]
        })
        if (!data || data.length === 0) {
            data = MOCK_STARTERS
        }
    } catch (error) {
        console.warn('Database query failed for starters, falling back to mock data:', error)
        data = MOCK_STARTERS
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Header />
            <main className="flex-1">
                <StarterGallery initialStarters={data as any} />
            </main>
            <Footer />
        </div>
    )
}
