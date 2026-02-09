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
    Layout,
    Box
} from "lucide-react"
import {
    AdminTemplate,
    MOCK_ADMIN_TEMPLATES
} from "@/lib/mock-data"
import { format } from "date-fns"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export function TemplateTable() {
    const [templates, setTemplates] = React.useState<AdminTemplate[]>(MOCK_ADMIN_TEMPLATES)
    const [searchQuery, setSearchQuery] = React.useState("")

    const filteredTemplates = templates.filter(t =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const togglePublish = (id: string) => {
        setTemplates(prev => prev.map(t =>
            t.id === id ? { ...t, isPublished: !t.isPublished } : t
        ))
        const temp = templates.find(t => t.id === id)
        toast.success(`${temp?.title} ${!temp?.isPublished ? 'published' : 'unpublished'}`)
    }

    const deleteTemplate = (id: string) => {
        if (confirm("Are you sure you want to delete this template?")) {
            setTemplates(prev => prev.filter(t => t.id !== id))
            toast.success("Template deleted")
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-card/40 backdrop-blur-md p-4 rounded-2xl border border-border">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search templates..."
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
                            <TableHead className="w-[100px]">Preview</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Blocks</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredTemplates.length > 0 ? (
                            filteredTemplates.map((template) => (
                                <TableRow key={template.id} className="hover:bg-primary/5 transition-colors group">
                                    <TableCell>
                                        <div className="h-10 w-16 bg-muted rounded-md flex items-center justify-center border border-border overflow-hidden">
                                            {template.previewImage ? (
                                                <img src={template.previewImage} alt="" className="object-cover h-full w-full" />
                                            ) : (
                                                <Layout className="h-4 w-4 text-muted-foreground/50" />
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-bold">{template.title}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="text-[10px] font-bold uppercase">
                                            {template.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1.5 text-xs font-medium">
                                            <Box className="h-3 w-3 text-muted-foreground" />
                                            {template.blocksCount} blocks
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className={cn(
                                                "h-1.5 w-1.5 rounded-full",
                                                template.isPublished ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-zinc-500"
                                            )} />
                                            <span className="text-xs font-medium">{template.isPublished ? 'Published' : 'Draft'}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" asChild>
                                                <Link href={`/admin/templates/${template.id}`}>
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-muted-foreground hover:text-emerald-500"
                                                onClick={() => togglePublish(template.id)}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-muted-foreground hover:text-red-500"
                                                onClick={() => deleteTemplate(template.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-64 text-center">
                                    <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
                                        <Layout className="h-10 w-10 opacity-20" />
                                        <p>No templates found.</p>
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
