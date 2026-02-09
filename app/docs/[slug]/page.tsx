import { MOCK_DOCS } from "@/lib/constants"
import { notFound } from "next/navigation"
import { MDXContent } from "@/components/docs/mdx-content"
import { DocsTOC } from "@/components/docs/docs-toc"
import { DocsPager } from "@/components/docs/docs-pager"

interface DocPageProps {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: DocPageProps) {
    const { slug } = await params
    const doc = MOCK_DOCS[slug]

    if (!doc) return { title: 'Not Found' }

    return {
        title: `${doc.title} | Documentation | DevSuite`,
        description: `Learn more about ${doc.title.toLowerCase()} in DevSuite.`,
    }
}

export default async function DocPage({ params }: DocPageProps) {
    const { slug } = await params
    const doc = MOCK_DOCS[slug]

    if (!doc) {
        notFound()
    }

    return (
        <div className="xl:grid xl:grid-cols-[1fr_240px] xl:gap-10">
            <div className="mx-auto w-full min-w-0">
                <div className="flex flex-col gap-6">
                    <MDXContent content={doc.content} />
                    <DocsPager />
                </div>
            </div>
            <div className="hidden text-sm xl:block">
                <div className="sticky top-20">
                    <DocsTOC />
                </div>
            </div>
        </div>
    )
}
