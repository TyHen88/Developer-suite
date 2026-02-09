"use client"

import * as React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
    Edit,
    Trash2,
    Eye,
    Search,
    FileText,
    Clock
} from "lucide-react"
import {
    AdminDoc,
    MOCK_ADMIN_DOCS
} from "@/lib/mock-data"
import { format } from "date-fns"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export function DocTable() {
    const [docs, setDocs] = React.useState<AdminDoc[]>(MOCK_ADMIN_DOCS)
    const [searchQuery, setSearchQuery] = React.useState("")

    const filteredDocs = docs.filter(d =>
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.category.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const togglePublish = (id: string) => {
        setDocs(prev => prev.map(d =>
            d.id === id ? { ...d, isPublished: !d.isPublished } : d
        ))
        const doc = docs.find(d => d.id === id)
        toast.success(`${doc?.title} ${!doc?.isPublished ? 'published' : 'unpublished'}`)
    }

    const deleteDoc = (id: string) => {
        if (confirm("Are you sure you want to delete this document?")) {
            setDocs(prev => prev.filter(d => d.id !== id))
            toast.success("Document deleted")
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-card/40 backdrop-blur-md p-4 rounded-2xl border border-border">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search documentation..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 h-10 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    />
                </div>
            </div>

            <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden shadow-xl">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/30 hover:bg-muted/30">
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Last Updated</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredDocs.length > 0 ? (
                            filteredDocs.map((doc) => (
                                <TableRow key={doc.id} className="hover:bg-primary/5 transition-colors group">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                                <FileText className="h-4 w-4 text-primary" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold">{doc.title}</span>
                                                <span className="text-[10px] text-muted-foreground">/{doc.slug}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="text-[10px] font-bold uppercase py-0 px-2 border-primary/20 bg-primary/5 text-primary">
                                            {doc.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                checked={doc.isPublished}
                                                onCheckedChange={() => togglePublish(doc.id)}
                                                className="scale-75"
                                            />
                                            <span className={cn(
                                                "text-[10px] font-bold uppercase tracking-wider",
                                                doc.isPublished ? "text-emerald-500" : "text-zinc-500"
                                            )}>
                                                {doc.isPublished ? 'Published' : 'Draft'}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                            <Clock className="h-3 w-3" />
                                            {format(new Date(doc.updatedAt), "MMM d, yyyy")}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" asChild>
                                                <Link href={`/admin/docs/${doc.id}`}>
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-muted-foreground hover:text-red-500"
                                                onClick={() => deleteDoc(doc.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-64 text-center">
                                    <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
                                        <FileText className="h-10 w-10 opacity-20" />
                                        <p>No documentation found.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
