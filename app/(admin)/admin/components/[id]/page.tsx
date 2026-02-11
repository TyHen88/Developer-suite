import { ComponentForm } from "@/components/admin/component-form"
import { db } from "@/lib/db"
import { components } from "@/db/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"

interface EditComponentPageProps {
    params: Promise<{ id: string }>
}

export default async function EditComponentPage({ params }: EditComponentPageProps) {
    const { id } = await params

    // Fetch from real database
    const component = await db.query.components.findFirst({
        where: eq(components.id, id)
    })

    if (!component) {
        notFound()
    }

    // Cast or map if needed to match AdminComponent interface if it's different
    // but the schema matches the form needs.

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gradient">Edit Component</h1>
                <p className="text-muted-foreground">Updating: <span className="text-foreground font-semibold">{component.name}</span></p>
            </div>

            <ComponentForm initialData={{
                ...component,
                codeSnippet: component.codeSnippet ?? undefined,
                createdAt: component.createdAt.toISOString(),
                updatedAt: component.updatedAt.toISOString(),
            } as any} />
        </div>
    )
}
