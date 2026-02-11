import { StarterForm } from "@/components/admin/starter-form"
import { getMockAdminStarterById } from "@/lib/mock-data"
import { notFound } from "next/navigation"

interface EditStarterPageProps {
    params: Promise<{ id: string }>
}

export default async function EditStarterPage({ params }: EditStarterPageProps) {
    const { id } = await params
    const starter = getMockAdminStarterById(id)

    if (!starter) {
        notFound()
    }

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gradient">Edit Starter</h1>
                <p className="text-muted-foreground">Updating: <span className="text-foreground font-semibold">{starter.name}</span></p>
            </div>

            <StarterForm initialData={starter} />
        </div>
    )
}
