"use client"

import * as React from "react"
import { Search, Copy, Check, ExternalLink, Code2, Layout, Sliders, Layers, MousePointer2, ListFilter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { apiService } from "@/lib/api"
import { type UIComponent, type ComponentCategory } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export default function ComponentGallery() {
    const [searchQuery, setSearchQuery] = React.useState("")
    const [selectedCategory, setSelectedCategory] = React.useState<ComponentCategory | "all">("all")
    const [filteredComponents, setFilteredComponents] = React.useState<UIComponent[]>([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [selectedComponent, setSelectedComponent] = React.useState<UIComponent | null>(null)
    const [isCopied, setIsCopied] = React.useState(false)

    React.useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const data = await apiService.getComponents({
                    query: searchQuery,
                    category: selectedCategory
                })
                setFilteredComponents(data)
            } catch (error) {
                toast.error("Failed to fetch components")
            } finally {
                setIsLoading(false)
            }
        }

        const timer = setTimeout(fetchData, 300) // Debounce search
        return () => clearTimeout(timer)
    }, [searchQuery, selectedCategory])

    const categories: { label: string, value: ComponentCategory | "all", icon: React.ReactNode }[] = [
        { label: "All Components", value: "all", icon: <Layers className="w-4 h-4" /> },
        { label: "Data Display", value: "data-display", icon: <Layout className="w-4 h-4" /> },
        { label: "Forms", value: "forms", icon: <Sliders className="w-4 h-4" /> },
        { label: "Navigation", value: "navigation", icon: <MousePointer2 className="w-4 h-4" /> },
        { label: "Overlays", value: "overlays", icon: <ExternalLink className="w-4 h-4" /> },
    ]

    const copyToClipboard = (code: string) => {
        navigator.clipboard.writeText(code)
        setIsCopied(true)
        toast.success("Code copied to clipboard")
        setTimeout(() => setIsCopied(false), 2000)
    }

    return (
        <div className="container mx-auto px-4 py-8 lg:py-12">
            <div className="flex flex-col gap-8">
                {/* Header Section */}
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold tracking-tight md:text-5xl">Component Gallery</h1>
                    <p className="text-lg text-muted-foreground max-w-3xl">
                        A curated collection of high-quality, responsive components built with Tailwind CSS and Radix UI.
                        Browse, preview, and copy the code to accelerate your development.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
                    {/* Sidebar Filters */}
                    <aside className="space-y-6">
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/70 flex items-center gap-2">
                                <ListFilter className="w-4 h-4" />
                                Categories
                            </h3>
                            <nav className="flex flex-col gap-1">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.value}
                                        onClick={() => setSelectedCategory(cat.value)}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-accent",
                                            selectedCategory === cat.value
                                                ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                                                : "text-muted-foreground"
                                        )}
                                    >
                                        {cat.icon}
                                        {cat.label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content Areas */}
                    <div className="space-y-8">
                        {/* Search & Stats Bar */}
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border border-border shadow-sm">
                            <div className="relative w-full sm:max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                <Input
                                    placeholder="Search components..."
                                    className="pl-10"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="text-sm text-muted-foreground whitespace-nowrap">
                                Showing <span className="font-semibold text-foreground">{filteredComponents.length}</span> components
                            </div>
                        </div>

                        {/* Components Grid */}
                        {isLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-pulse">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="h-[280px] bg-muted rounded-xl border border-border" />
                                ))}
                            </div>
                        ) : filteredComponents.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredComponents.map((comp) => (
                                    <Card key={comp.id} className="group overflow-hidden border-border hover:border-primary/50 transition-all hover:shadow-lg dark:hover:shadow-primary/5">
                                        <CardHeader className="pb-4">
                                            <div className="flex justify-between items-start">
                                                <Badge variant="secondary" className="mb-2 capitalize">
                                                    {comp.category.replace("-", " ")}
                                                </Badge>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => copyToClipboard(comp.code)}
                                                >
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <CardTitle className="text-xl group-hover:text-primary transition-colors">{comp.name}</CardTitle>
                                            <CardDescription className="line-clamp-2 mt-2">
                                                {comp.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="pb-6">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        className="w-full mt-2 bg-primary/5 text-primary border-primary/20 hover:bg-primary hover:text-primary-foreground"
                                                        variant="outline"
                                                        onClick={() => setSelectedComponent(comp)}
                                                    >
                                                        Explore Details
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 overflow-hidden">
                                                    <DialogHeader className="p-6 border-b border-border bg-muted/30">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <Badge variant="outline" className="capitalize">{comp.category.replace("-", " ")}</Badge>
                                                        </div>
                                                        <DialogTitle className="text-2xl font-bold">{comp.name}</DialogTitle>
                                                        <DialogDescription className="text-base">{comp.description}</DialogDescription>
                                                    </DialogHeader>

                                                    <ScrollArea className="flex-1">
                                                        <div className="p-6 space-y-8">
                                                            <Tabs defaultValue="preview" className="w-full">
                                                                <TabsList className="grid w-full grid-cols-2 mb-6">
                                                                    <TabsTrigger value="preview" className="flex items-center gap-2">
                                                                        <Layout className="w-4 h-4" /> Preview
                                                                    </TabsTrigger>
                                                                    <TabsTrigger value="code" className="flex items-center gap-2">
                                                                        <Code2 className="w-4 h-4" /> Code
                                                                    </TabsTrigger>
                                                                </TabsList>

                                                                <TabsContent value="preview" className="mt-0 border border-border rounded-xl bg-muted/50 p-12 min-h-[300px] flex items-center justify-center">
                                                                    <div className="w-full max-w-md bg-background p-8 rounded-lg border border-border/50 shadow-sm animate-in fade-in zoom-in-95 duration-300">
                                                                        <div className="text-center space-y-4">
                                                                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                                                                <Code2 className="w-6 h-6 text-primary" />
                                                                            </div>
                                                                            <p className="text-sm font-medium text-muted-foreground italic">
                                                                                [ Live Demo of {comp.name} ]
                                                                            </p>
                                                                            <p className="text-xs text-muted-foreground/60 max-w-[200px] mx-auto">
                                                                                Functional preview will render actual components in your implementation.
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </TabsContent>

                                                                <TabsContent value="code" className="mt-0">
                                                                    <div className="relative group">
                                                                        <div className="absolute right-4 top-4 flex items-center gap-2">
                                                                            <Button
                                                                                variant="secondary"
                                                                                size="sm"
                                                                                className="h-8 gap-2 bg-background/80 backdrop-blur"
                                                                                onClick={() => copyToClipboard(comp.code)}
                                                                            >
                                                                                {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                                                                {isCopied ? "Copied!" : "Copy Code"}
                                                                            </Button>
                                                                        </div>
                                                                        <pre className="p-6 rounded-xl bg-zinc-950 text-zinc-50 overflow-x-auto text-sm leading-relaxed font-mono">
                                                                            <code>{comp.code}</code>
                                                                        </pre>
                                                                    </div>
                                                                </TabsContent>
                                                            </Tabs>

                                                            <div className="space-y-4">
                                                                <h4 className="text-lg font-semibold flex items-center gap-2 border-b border-border pb-2">
                                                                    <Sliders className="w-4 h-4" />
                                                                    Properties (Props)
                                                                </h4>
                                                                <div className="overflow-x-auto rounded-lg border border-border">
                                                                    <table className="w-full text-sm text-left">
                                                                        <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
                                                                            <tr>
                                                                                <th className="px-4 py-3">Prop</th>
                                                                                <th className="px-4 py-3">Type</th>
                                                                                <th className="px-4 py-3">Description</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody className="divide-y divide-border">
                                                                            {comp.props.map((prop) => (
                                                                                <tr key={prop.name} className="hover:bg-muted/30 transition-colors">
                                                                                    <td className="px-4 py-3 font-mono text-primary">{prop.name}</td>
                                                                                    <td className="px-4 py-3 font-mono text-xs opacity-80">{prop.type}</td>
                                                                                    <td className="px-4 py-3 leading-relaxed">{prop.description}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </ScrollArea>
                                                </DialogContent>
                                            </Dialog>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-card rounded-2xl border border-dashed border-border">
                                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 text-muted-foreground/50" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">No components found</h3>
                                <p className="text-muted-foreground">Try adjusting your search or filters to find what you're looking for.</p>
                                <Button variant="link" onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }} className="mt-4">
                                    Clear all filters
                                </Button>
                            </div>
                        )}

                        {/* Pagination Placeholder */}
                        <div className="flex items-center justify-center pt-8">
                            <div className="flex items-center gap-2 py-4">
                                <Button variant="outline" size="sm" disabled>Previous</Button>
                                <div className="flex gap-1">
                                    {[1, 2, 3].map((i) => (
                                        <Button key={i} variant={i === 1 ? "default" : "outline"} size="sm" className="w-9">{i}</Button>
                                    ))}
                                    <span className="px-2 text-muted-foreground">...</span>
                                </div>
                                <Button variant="outline" size="sm">Next</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
