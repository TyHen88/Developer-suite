import { ExampleTable } from "@/components/admin/example-table"
import { Button } from "@/components/ui/button"
import { Plus, Library, Sparkles } from "lucide-react"
import Link from "next/link"

export default function AdminExamplesPage() {
    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Examples</h1>
                    <p className="text-muted-foreground">Manage interactive showcase patterns and UI demos.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="rounded-lg h-9 gap-2">
                        <Sparkles size={14} className="text-amber-500" />
                        Featured List
                    </Button>
                    <Button size="sm" className="rounded-lg h-9 gap-2" asChild>
                        <Link href="/admin/examples/new">
                            <Plus size={14} />
                            New Example
                        </Link>
                    </Button>
                </div>
            </div>

            <ExampleTable />
        </div>
    )
}
