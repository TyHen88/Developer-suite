import { DocTable } from "@/components/admin/doc-table"
import { Button } from "@/components/ui/button"
import { Plus, FileText, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function AdminDocsPage() {
    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
                    <p className="text-muted-foreground">Manage guides, tutorials, and API references.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="rounded-lg h-9 gap-2">
                        <ExternalLink size={14} />
                        View Docs
                    </Button>
                    <Button size="sm" className="rounded-lg h-9 gap-2" asChild>
                        <Link href="/admin/docs/new">
                            <Plus size={14} />
                            New Document
                        </Link>
                    </Button>
                </div>
            </div>

            <DocTable />
        </div>
    )
}
