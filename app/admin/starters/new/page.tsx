import { StarterForm } from "@/components/admin/starter-form"

export default function NewStarterPage() {
    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gradient">Create Starter</h1>
                <p className="text-muted-foreground">Define a new project foundation for the platform.</p>
            </div>

            <StarterForm />
        </div>
    )
}
