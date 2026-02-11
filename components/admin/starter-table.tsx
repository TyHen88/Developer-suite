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
    Github,
    Rocket,
    MoreVertical,
    CheckCircle2,
    XCircle
} from "lucide-react"
import {
    AdminStarter,
    MOCK_ADMIN_STARTERS
} from "@/lib/mock-data"
import { format } from "date-fns"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

import { updateStarter, deleteStarter } from "@/actions/galleryActions"

export function StarterTable({ initialStarters }: { initialStarters: any[] }) {
    const [starters, setStarters] = React.useState<any[]>(initialStarters)
    const [searchQuery, setSearchQuery] = React.useState("")
    const [selectedIds, setSelectedIds] = React.useState<string[]>([])

    const filteredStarters = starters.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.stack || s.techStack || []).some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    )

    const toggleSelectAll = () => {
        if (selectedIds.length === filteredStarters.length) {
            setSelectedIds([])
        } else {
            setSelectedIds(filteredStarters.map(s => s.id))
        }
    }

    const toggleSelect = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        )
    }

    const handleTogglePublish = async (starter: any) => {
        const newStatus = !starter.isPublished
        const res = await updateStarter(starter.id, { isPublished: newStatus })
        if (res.success) {
            setStarters(prev => prev.map(s =>
                s.id === starter.id ? { ...s, isPublished: newStatus } : s
            ))
            toast.success(`${starter.name} ${newStatus ? 'published' : 'unpublished'}`)
        }
    }

    const handleDelete = async (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete "${name}"?`)) {
            const res = await deleteStarter(id)
            if (res.success) {
                setStarters(prev => prev.filter(s => s.id !== id))
                toast.success("Starter deleted")
            }
        }
    }

    return (
        <div className="space-y-6">
            {/* Bulk Actions Placeholder */}
            {selectedIds.length > 0 && (
                <div className="flex items-center justify-between bg-primary/10 border border-primary/20 p-4 rounded-2xl animate-in fade-in slide-in-from-top-4">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-primary">{selectedIds.length} items selected</span>
                        <div className="h-4 w-px bg-primary/20" />
                        <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10 h-8 font-bold text-xs uppercase tracking-wider">
                            <CheckCircle2 className="h-3.5 w-3.5 mr-2" />
                            Bulk Publish
                        </Button>
                        <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10 h-8 font-bold text-xs uppercase tracking-wider">
                            <XCircle className="h-3.5 w-3.5 mr-2" />
                            Bulk Unpublish
                        </Button>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => setSelectedIds([])} className="h-8 text-xs font-bold uppercase tracking-wider">
                        Cancel
                    </Button>
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-card/40 backdrop-blur-md p-4 rounded-2xl border border-border">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search starters (name or tech)..."
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
                            <TableHead className="w-[50px]">
                                <input
                                    type="checkbox"
                                    className="rounded border-border bg-background"
                                    checked={selectedIds.length === filteredStarters.length && filteredStarters.length > 0}
                                    onChange={toggleSelectAll}
                                />
                            </TableHead>
                            <TableHead>Starter Name</TableHead>
                            <TableHead>Tech Stack</TableHead>
                            <TableHead>Features</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredStarters.length > 0 ? (
                            filteredStarters.map((starter) => (
                                <TableRow
                                    key={starter.id}
                                    className={cn(
                                        "hover:bg-primary/5 transition-colors group",
                                        selectedIds.includes(starter.id) && "bg-primary/5"
                                    )}
                                >
                                    <TableCell>
                                        <input
                                            type="checkbox"
                                            className="rounded border-border bg-background"
                                            checked={selectedIds.includes(starter.id)}
                                            onChange={() => toggleSelect(starter.id)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-bold">{starter.name}</span>
                                            <span className="text-[10px] text-muted-foreground truncate max-w-[200px]">{starter.slug}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {(starter.stack || starter.techStack || []).map((tech: string) => (
                                                <Badge key={tech} variant="secondary" className="text-[9px] font-bold px-1.5 py-0 h-4 border-none bg-primary/5 text-primary">
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-xs font-semibold text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full border border-border/50">
                                            {starter.features?.length || 0} features
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                checked={starter.isPublished}
                                                onCheckedChange={() => handleTogglePublish(starter)}
                                                className="scale-75"
                                            />
                                            <span className={cn(
                                                "text-[10px] font-bold uppercase tracking-wider",
                                                starter.isPublished ? "text-emerald-500" : "text-zinc-500"
                                            )}>
                                                {starter.isPublished ? 'Live' : 'Draft'}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" asChild>
                                                <Link href={`/admin/starters/${starter.id}`}>
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            {starter.repoUrl && (
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" asChild>
                                                    <a href={starter.repoUrl} target="_blank" rel="noopener noreferrer">
                                                        <Github className="h-4 w-4" />
                                                    </a>
                                                </Button>
                                            )}
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-muted-foreground hover:text-red-500"
                                                onClick={() => handleDelete(starter.id, starter.name)}
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
                                        <Rocket className="h-10 w-10 opacity-20" />
                                        <p>No starters found.</p>
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
