import { StarterForm } from "@/components/admin/starter-form"
import { db } from "@/lib/db"
import { starters as startersTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"

interface EditStarterPageProps {
    params: Promise<{ id: string }>
}

export default async function EditStarterPage({ params }: EditStarterPageProps) {
    const { id } = await params

    const starter = await db.query.starters.findFirst({
        where: eq(startersTable.id, id)
    })

    if (!starter) {
        notFound()
    }

    const formattedStarter = {
        ...starter,
        repoUrl: starter.repoUrl ?? undefined,
        createdAt: starter.createdAt.toISOString(),
        updatedAt: starter.updatedAt.toISOString(),
    }

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gradient">Edit Starter</h1>
                <p className="text-muted-foreground">Updating: <span className="text-foreground font-semibold">{starter.name}</span></p>
            </div>

            <StarterForm initialData={formattedStarter as any} />
        </div>
    )
}
