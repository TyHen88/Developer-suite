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
    Library,
    Zap
} from "lucide-react"
import {
    AdminExample,
    MOCK_ADMIN_EXAMPLES
} from "@/lib/mock-data"
import { format } from "date-fns"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export function ExampleTable() {
    const [examples, setExamples] = React.useState<AdminExample[]>(MOCK_ADMIN_EXAMPLES)
    const [searchQuery, setSearchQuery] = React.useState("")

    const filteredExamples = examples.filter(ex =>
        ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.category.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const togglePublish = (id: string) => {
        setExamples(prev => prev.map(ex =>
            ex.id === id ? { ...ex, isPublished: !ex.isPublished } : ex
        ))
        const example = examples.find(ex => ex.id === id)
        toast.success(`${example?.title} ${!example?.isPublished ? 'published' : 'unpublished'}`)
    }

    const deleteExample = (id: string) => {
        if (confirm("Are you sure you want to delete this example?")) {
            setExamples(prev => prev.filter(ex => ex.id !== id))
            toast.success("Example deleted")
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-card/40 backdrop-blur-md p-4 rounded-2xl border border-border">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search interactive examples..."
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
                            <TableHead>Example Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Difficulty</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredExamples.length > 0 ? (
                            filteredExamples.map((example) => (
                                <TableRow key={example.id} className="hover:bg-primary/5 transition-colors group">
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-bold">{example.title}</span>
                                            <span className="text-[10px] text-muted-foreground">/{example.slug}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="text-[10px] font-bold uppercase py-0 px-2 border-primary/20 bg-primary/5 text-primary">
                                            {example.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1.5">
                                            <Zap className={cn(
                                                "h-3 w-3",
                                                example.difficulty === 'beginner' && "text-emerald-500",
                                                example.difficulty === 'intermediate' && "text-amber-500",
                                                example.difficulty === 'advanced' && "text-rose-500"
                                            )} />
                                            <span className="text-xs font-medium capitalize">{example.difficulty}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                checked={example.isPublished}
                                                onCheckedChange={() => togglePublish(example.id)}
                                                className="scale-75"
                                            />
                                            <span className={cn(
                                                "text-[10px] font-bold uppercase tracking-wider",
                                                example.isPublished ? "text-emerald-500" : "text-zinc-500"
                                            )}>
                                                {example.isPublished ? 'Live' : 'Draft'}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" asChild>
                                                <Link href={`/admin/examples/${example.id}`}>
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-muted-foreground hover:text-red-500"
                                                onClick={() => deleteExample(example.id)}
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
                                        <Library className="h-10 w-10 opacity-20" />
                                        <p>No examples found.</p>
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
