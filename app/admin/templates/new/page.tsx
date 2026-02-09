import { TemplateForm } from "@/components/admin/template-form"

export default function NewTemplatePage() {
    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gradient">Create Template</h1>
                <p className="text-muted-foreground">Scaffold a new layout for the DevSuite gallery.</p>
            </div>

            <TemplateForm />
        </div>
    )
}
