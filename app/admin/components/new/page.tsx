import { ComponentForm } from "@/components/admin/component-form"

export default function NewComponentPage() {
    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gradient">Create Component</h1>
                <p className="text-muted-foreground">Add a new UI primitive to the DevSuite library.</p>
            </div>

            <ComponentForm />
        </div>
    )
}
