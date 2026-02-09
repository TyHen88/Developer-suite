import { DocsSidebar } from "@/components/docs/docs-sidebar"
import { DocsHeader } from "@/components/docs/docs-header"

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <DocsHeader />
            <div className="mx-auto max-w-7xl px-4 md:px-8 flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)] md:gap-6 lg:gap-10">
                <DocsSidebar />
                <main className="relative py-6 lg:py-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
