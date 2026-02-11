import { TemplateForm } from "@/components/admin/template-form"
import { getMockAdminTemplateById } from "@/lib/mock-data"
import { notFound } from "next/navigation"

interface EditTemplatePageProps {
    params: Promise<{ id: string }>
}

export default async function EditTemplatePage({ params }: EditTemplatePageProps) {
    const { id } = await params
    const template = getMockAdminTemplateById(id)

    if (!template) {
        notFound()
    }

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gradient">Edit Template</h1>
                <p className="text-muted-foreground">Updating: <span className="text-foreground font-semibold">{template.title}</span></p>
            </div>

            <TemplateForm initialData={template} />
        </div>
    )
}
