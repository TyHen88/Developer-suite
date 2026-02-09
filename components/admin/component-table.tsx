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
    MoreHorizontal,
    Edit,
    Trash2,
    Eye,
    ExternalLink,
    Search,
    Filter,
    Layers
} from "lucide-react"
import {
    AdminComponent,
    MOCK_ADMIN_COMPONENTS
} from "@/lib/mock-data"
import { format } from "date-fns"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export function ComponentTable() {
    const [components, setComponents] = React.useState<AdminComponent[]>(MOCK_ADMIN_COMPONENTS)
    const [searchQuery, setSearchQuery] = React.useState("")
    const [showPublishedOnly, setShowPublishedOnly] = React.useState(false)

    const filteredComponents = components.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.category.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = !showPublishedOnly || c.isPublished
        return matchesSearch && matchesStatus
    })

    // Optimistic UI for toggle publish
    const togglePublish = (id: string) => {
        setComponents(prev => prev.map(c =>
            c.id === id ? { ...c, isPublished: !c.isPublished } : c
        ))
        const comp = components.find(c => c.id === id)
        toast.success(`${comp?.name} ${!comp?.isPublished ? 'published' : 'unpublished'}`)
    }

    const deleteComponent = (id: string) => {
        if (confirm("Are you sure you want to delete this component?")) {
            setComponents(prev => prev.filter(c => c.id !== id))
            toast.success("Component deleted")
        }
    }

    return (
        <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-card/40 backdrop-blur-md p-4 rounded-2xl border border-border">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search components..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 h-10 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-muted-foreground">Published Only</span>
                        <Switch
                            checked={showPublishedOnly}
                            onCheckedChange={setShowPublishedOnly}
                        />
                    </div>
                    <Button size="sm" variant="outline" className="h-10 rounded-xl gap-2">
                        <Filter className="h-4 w-4" />
                        Category
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden shadow-xl">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/30 hover:bg-muted/30">
                            <TableHead className="w-[200px]">Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Tags</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredComponents.length > 0 ? (
                            filteredComponents.map((component) => (
                                <TableRow key={component.id} className="hover:bg-primary/5 transition-colors group">
                                    <TableCell className="font-bold">{component.name}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="bg-primary/10 text-primary border-none font-bold text-[10px] uppercase">
                                            {component.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className={cn(
                                                "h-1.5 w-1.5 rounded-full",
                                                component.isPublished ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-zinc-500"
                                            )} />
                                            <span className="text-xs font-medium">{component.isPublished ? 'Published' : 'Draft'}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {component.tags.slice(0, 2).map(tag => (
                                                <span key={tag} className="text-[10px] text-muted-foreground">#{tag}</span>
                                            ))}
                                            {component.tags.length > 2 && <span className="text-[10px] text-muted-foreground">+{component.tags.length - 2}</span>}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-xs text-muted-foreground">
                                        {format(new Date(component.createdAt), "MMM d, yyyy")}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" asChild>
                                                <Link href={`/admin/components/${component.id}`}>
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-muted-foreground hover:text-emerald-500"
                                                onClick={() => togglePublish(component.id)}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-muted-foreground hover:text-red-500"
                                                onClick={() => deleteComponent(component.id)}
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
                                        <Layers className="h-10 w-10 opacity-20" />
                                        <p>No components found matching your criteria.</p>
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
