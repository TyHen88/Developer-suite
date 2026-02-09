import { ExampleForm } from "@/components/admin/example-form"
import { getMockAdminExampleById } from "@/lib/mock-data"
import { notFound } from "next/navigation"

interface EditExamplePageProps {
    params: Promise<{ id: string }>
}

export default async function EditExamplePage({ params }: EditExamplePageProps) {
    const { id } = await params
    const example = getMockAdminExampleById(id)

    if (!example) {
        notFound()
    }

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gradient">Edit Example</h1>
                <p className="text-muted-foreground">Updating: <span className="text-foreground font-semibold">{example.title}</span></p>
            </div>

            <ExampleForm initialData={example} />
        </div>
    )
}
