import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ComponentGallery from '@/components/gallery/component-gallery'

export const metadata = {
    title: 'Component Gallery | DevSuite',
    description: 'Browse our interactive collection of professional UI components.',
}

export default function ComponentsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Header />
            <main className="flex-1">
                <ComponentGallery />
            </main>
            <Footer />
        </div>
    )
}
