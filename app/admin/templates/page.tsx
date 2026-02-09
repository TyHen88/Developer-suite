import { TemplateTable } from "@/components/admin/template-table"
import { Button } from "@/components/ui/button"
import { Plus, LayoutTemplate } from "lucide-react"
import Link from "next/link"

export default function AdminTemplatesPage() {
    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
                    <p className="text-muted-foreground">Manage full-page layouts and multi-block templates.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button size="sm" className="rounded-lg h-9 gap-2" asChild>
                        <Link href="/admin/templates/new">
                            <Plus size={14} />
                            New Template
                        </Link>
                    </Button>
                </div>
            </div>

            <TemplateTable />
        </div>
    )
}
