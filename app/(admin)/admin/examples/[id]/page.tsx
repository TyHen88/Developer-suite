import { ExampleForm } from "@/components/admin/example-form"
import { db } from "@/lib/db"
import { examples as examplesTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"

interface EditExamplePageProps {
    params: Promise<{ id: string }>
}

export default async function EditExamplePage({ params }: EditExamplePageProps) {
    const { id } = await params

    const example = await db.query.examples.findFirst({
        where: eq(examplesTable.id, id)
    })

    if (!example) {
        notFound()
    }

    const formattedExample = {
        ...example,
        difficulty: example.difficulty as "beginner" | "intermediate" | "advanced",
        createdAt: example.createdAt.toISOString(),
        updatedAt: example.updatedAt.toISOString(),
    }

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gradient">Edit Example</h1>
                <p className="text-muted-foreground">Updating: <span className="text-foreground font-semibold">{example.title}</span></p>
            </div>

            <ExampleForm initialData={formattedExample as any} />
        </div>
    )
}
