import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StarterGallery from '@/components/gallery/starter-gallery'

export const metadata = {
    title: 'Starter Kits | DevSuite',
    description: 'Pro-grade high-performance starter kits for Next.js, React, and more.',
}

import { db } from '@/lib/db'
import { starters } from '@/db/schema'
import { desc } from 'drizzle-orm'

export default async function StartersPage() {
    const data = await db.query.starters.findMany({
        orderBy: [desc(starters.createdAt)]
    })

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
