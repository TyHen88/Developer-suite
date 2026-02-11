import { DocForm } from "@/components/admin/doc-form"

export default function NewDocPage() {
    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gradient">Create Document</h1>
                <p className="text-muted-foreground">Draft a new piece of documentation for DevSuite.</p>
            </div>

            <DocForm />
        </div>
    )
}
