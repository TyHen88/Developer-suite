import { db } from "@/lib/db"
import { components } from "@/db/schema"
import { desc } from "drizzle-orm"
import { ComponentTable } from "@/components/admin/component-table"
import { Button } from "@/components/ui/button"
import { Plus, Download } from "lucide-react"
import Link from "next/link"

export default async function AdminComponentsPage() {
    let data: any[] = []
    try {
        data = await db.query.components.findMany({
            orderBy: [desc(components.createdAt)]
        })
    } catch (err) {
        console.warn("Failed fetching admin components:", err)
    }
    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Components</h1>
                    <p className="text-muted-foreground">Manage your UI building blocks and primitives.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="rounded-lg h-9 gap-2">
                        <Download size={14} />
                        Export CSV
                    </Button>
                    <Button size="sm" className="rounded-lg h-9 gap-2" asChild>
                        <Link href="/admin/components/new">
                            <Plus size={14} />
                            New Component
                        </Link>
                    </Button>
                </div>
            </div>

            <ComponentTable initialComponents={data} />
        </div>
    )
}
