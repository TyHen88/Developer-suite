import { ComponentForm } from "@/components/admin/component-form"
import { getMockAdminComponentById } from "@/lib/mock-data"
import { notFound } from "next/navigation"

interface EditComponentPageProps {
    params: Promise<{ id: string }>
}

export default async function EditComponentPage({ params }: EditComponentPageProps) {
    const { id } = await params
    const component = getMockAdminComponentById(id)

    if (!component) {
        notFound()
    }

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gradient">Edit Component</h1>
                <p className="text-muted-foreground">Updating: <span className="text-foreground font-semibold">{component.name}</span></p>
            </div>

            <ComponentForm initialData={component} />
        </div>
    )
}
