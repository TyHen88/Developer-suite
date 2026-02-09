import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TemplateGallery from '@/components/gallery/template-gallery'

export const metadata = {
    title: 'Page Templates | DevSuite',
    description: 'Ready-to-use full page sections and multi-block templates for your next project.',
}

export default function TemplatesPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Header />
            <main className="flex-1">
                <TemplateGallery />
            </main>
            <Footer />
        </div>
    )
}
