import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StarterDetail from '@/components/gallery/starter-detail'
import { apiService } from '@/lib/api'
import { notFound } from 'next/navigation'

interface StarterPageProps {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: StarterPageProps) {
    const { slug } = await params
    const starter = await apiService.getStarterBySlug(slug)

    if (!starter) return { title: 'Not Found' }

    return {
        title: `${starter.name} | Starters | DevSuite`,
        description: starter.description,
    }
}

export default async function StarterPage({ params }: StarterPageProps) {
    const { slug } = await params
    const starter = await apiService.getStarterBySlug(slug)

    if (!starter) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Header />
            <main className="flex-1">
                <StarterDetail starter={starter} />
            </main>
            <Footer />
        </div>
    )
}
