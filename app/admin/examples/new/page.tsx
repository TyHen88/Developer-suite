import { ExampleForm } from "@/components/admin/example-form"

export default function NewExamplePage() {
    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gradient">Create Example</h1>
                <p className="text-muted-foreground">Define a new interactive pattern for the DevSuite gallery.</p>
            </div>

            <ExampleForm />
        </div>
    )
}
