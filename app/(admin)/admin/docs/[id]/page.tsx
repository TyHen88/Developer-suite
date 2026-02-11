import { DocForm } from "@/components/admin/doc-form"
import { db } from "@/lib/db"
import { docs as docsTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"

interface EditDocPageProps {
    params: Promise<{ id: string }>
}

export default async function EditDocPage({ params }: EditDocPageProps) {
    const { id } = await params

    const doc = await db.query.docs.findFirst({
        where: eq(docsTable.id, id)
    })

    if (!doc) {
        notFound()
    }

    const formattedDoc = {
        ...doc,
        createdAt: doc.createdAt.toISOString(),
        updatedAt: doc.updatedAt.toISOString(),
    }

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gradient">Edit Document</h1>
                <p className="text-muted-foreground">Updating: <span className="text-foreground font-semibold">{doc.title}</span></p>
            </div>

            <DocForm initialData={formattedDoc as any} />
        </div>
    )
}
