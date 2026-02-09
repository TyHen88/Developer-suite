import { StarterTable } from "@/components/admin/starter-table"
import { Button } from "@/components/ui/button"
import { Plus, Rocket, Download } from "lucide-react"
import Link from "next/link"

export default function AdminStartersPage() {
    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Starters</h1>
                    <p className="text-muted-foreground">Manage project boilerplates and CLI foundations.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="rounded-lg h-9 gap-2">
                        <Download size={14} />
                        Export
                    </Button>
                    <Button size="sm" className="rounded-lg h-9 gap-2" asChild>
                        <Link href="/admin/starters/new">
                            <Plus size={14} />
                            New Starter
                        </Link>
                    </Button>
                </div>
            </div>

            <StarterTable />
        </div>
    )
}
