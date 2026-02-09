import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StarterGallery from '@/components/gallery/starter-gallery'

export const metadata = {
    title: 'Starter Kits | DevSuite',
    description: 'Pro-grade high-performance starter kits for Next.js, React, and more.',
}

export default function StartersPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Header />
            <main className="flex-1">
                <StarterGallery />
            </main>
            <Footer />
        </div>
    )
}
