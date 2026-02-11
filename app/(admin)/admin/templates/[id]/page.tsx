import { TemplateForm } from "@/components/admin/template-form"
import { db } from "@/lib/db"
import { templates as templatesTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"

interface EditTemplatePageProps {
    params: Promise<{ id: string }>
}

export default async function EditTemplatePage({ params }: EditTemplatePageProps) {
    const { id } = await params

    const template = await db.query.templates.findFirst({
        where: eq(templatesTable.id, id)
    })

    if (!template) {
        notFound()
    }

    const formattedTemplate = {
        ...template,
        previewImage: template.previewImage ?? undefined,
        createdAt: template.createdAt.toISOString(),
        updatedAt: template.updatedAt.toISOString(),
    }

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gradient">Edit Template</h1>
                <p className="text-muted-foreground">Updating: <span className="text-foreground font-semibold">{template.title}</span></p>
            </div>

            <TemplateForm initialData={formattedTemplate as any} />
        </div>
    )
}
