import { DocForm } from "@/components/admin/doc-form"
import { getMockAdminDocById } from "@/lib/mock-data"
import { notFound } from "next/navigation"

interface EditDocPageProps {
    params: Promise<{ id: string }>
}

export default async function EditDocPage({ params }: EditDocPageProps) {
    const { id } = await params
    const doc = getMockAdminDocById(id)

    if (!doc) {
        notFound()
    }

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gradient">Edit Document</h1>
                <p className="text-muted-foreground">Updating: <span className="text-foreground font-semibold">{doc.title}</span></p>
            </div>

            <DocForm initialData={doc} />
        </div>
    )
}
