"use client"

import * as React from "react"
import {
    Search,
    Copy,
    Check,
    Layout,
    Monitor,
    Smartphone,
    Tablet,
    ChevronDown,
    Filter,
    Blocks,
    Star,
    ArrowUpRight,
    ChevronRight,
    Code2,
    Eye,
    Type
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { apiService } from "@/lib/api"
import { type UITemplate, type TemplateCategory, type TemplateType, type UIStarter } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export default function TemplateGallery() {
    const [searchQuery, setSearchQuery] = React.useState("")
    const [selectedCategory, setSelectedCategory] = React.useState<TemplateCategory | "all">("all")
    const [selectedType, setSelectedType] = React.useState<TemplateType | "all">("all")
    const [sortBy, setSortBy] = React.useState<"popular" | "newest" | "complexity">("popular")
    const [filteredTemplates, setFilteredTemplates] = React.useState<UITemplate[]>([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [isCopied, setIsCopied] = React.useState(false)

    React.useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const data = await apiService.getTemplates({
                    query: searchQuery,
                    category: selectedCategory,
                    type: selectedType,
                    sortBy: sortBy
                })
                setFilteredTemplates(data)
            } catch (error) {
                toast.error("Failed to fetch templates")
            } finally {
                setIsLoading(false)
            }
        }

        const timer = setTimeout(fetchData, 300)
        return () => clearTimeout(timer)
    }, [searchQuery, selectedCategory, selectedType, sortBy])

    const categories: TemplateCategory[] = ["Marketing", "Application UI", "E-commerce", "Dashboard", "Blog", "Auth"]
    const types: TemplateType[] = ["Hero", "Pricing", "Features", "Footer", "Landing", "Dashboard", "Forms"]

    const copyAllCode = (template: UITemplate) => {
        const allCode = template.files.map(f => `// ${f.name}\n${f.code}`).join('\n\n')
        navigator.clipboard.writeText(allCode)
        setIsCopied(true)
        toast.success("Full template code copied to clipboard")
        setTimeout(() => setIsCopied(false), 2000)
    }

    return (
        <div className="container mx-auto px-4 py-8 lg:py-12">
            <div className="flex flex-col gap-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            Page Templates
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl">
                            Production-ready sections and full pages. Built with Tailwind CSS,
                            optimized for copy-paste and customization.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center p-1 bg-muted rounded-lg border border-border">
                            <Button variant="ghost" size="sm" className="h-8 rounded-md bg-background shadow-sm">
                                <Monitor className="w-4 h-4 mr-2" />
                                Desktop
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 rounded-md text-muted-foreground">
                                <Smartphone className="w-4 h-4 mr-2" />
                                Mobile
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Filters Bar */}
                <div className="flex flex-col gap-6 sticky top-20 z-40 bg-background/80 backdrop-blur-md pt-2">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                                placeholder="Search templates (e.g. 'landing page', 'dashboard')..."
                                className="pl-10 h-11"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <div className="flex items-center gap-2 px-3 py-1 bg-card border border-border rounded-lg h-11 overflow-x-auto no-scrollbar">
                                <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
                                <div className="flex gap-1 overflow-x-auto no-scrollbar">
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(selectedCategory === cat ? "all" : cat)}
                                            className={cn(
                                                "px-3 py-1 text-xs font-semibold rounded-md whitespace-nowrap transition-all",
                                                selectedCategory === cat ? "bg-primary text-primary-foreground" : "hover:bg-accent text-muted-foreground"
                                            )}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 border border-border rounded-lg h-11 px-3 bg-card">
                                <Type className="w-4 h-4 text-muted-foreground" />
                                <select
                                    className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as any)}
                                >
                                    <option value="popular">Most Popular</option>
                                    <option value="newest">Newest First</option>
                                    <option value="complexity">Complexity</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                        <Button
                            variant={selectedType === "all" ? "default" : "outline"}
                            size="sm"
                            className="rounded-full h-8"
                            onClick={() => setSelectedType("all")}
                        >
                            All Types
                        </Button>
                        {types.map(type => (
                            <Button
                                key={type}
                                variant={selectedType === type ? "default" : "outline"}
                                size="sm"
                                className="rounded-full h-8 whitespace-nowrap"
                                onClick={() => setSelectedType(type)}
                            >
                                {type}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Templates Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 animate-pulse">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-[400px] bg-muted rounded-xl border border-border" />
                        ))}
                    </div>
                ) : filteredTemplates.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {filteredTemplates.map((tpl) => (
                            <Card key={tpl.id} className="group overflow-hidden border-border transition-all hover:ring-2 hover:ring-primary/20 hover:border-primary/40 flex flex-col">
                                <div className="relative aspect-video bg-muted overflow-hidden group/img">
                                    {/* Mock Image Placeholder with gradient */}
                                    <div className={cn(
                                        "absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover/img:scale-105",
                                        tpl.category === 'Marketing' ? 'from-blue-500/10 to-purple-500/10' :
                                            tpl.category === 'Dashboard' ? 'from-emerald-500/10 to-teal-500/10' :
                                                'from-slate-500/10 to-slate-800/10'
                                    )} />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover/img:opacity-50 transition-opacity">
                                        <Monitor className="w-12 h-12" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <Badge variant="secondary" className="bg-background/90 backdrop-blur shadow-sm">
                                            {tpl.category}
                                        </Badge>
                                    </div>

                                    <div className="absolute top-4 right-4 animate-in fade-in slide-in-from-right-2 hidden group-hover:flex">
                                        <Button size="icon" variant="secondary" className="h-8 w-8 bg-background/90" onClick={() => copyAllCode(tpl)}>
                                            <Copy className="h-4 h-4" />
                                        </Button>
                                    </div>

                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors cursor-pointer flex items-center justify-center">
                                                <Button variant="secondary" size="sm" className="opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 shadow-lg">
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    Preview & Code
                                                </Button>
                                            </div>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-[95vw] w-[1400px] h-[90vh] p-0 overflow-hidden flex flex-col bg-background border-border">
                                            <DialogHeader className="p-6 border-b border-border bg-card">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2">
                                                            <Badge variant="outline">{tpl.category}</Badge>
                                                            <Badge variant="outline">{tpl.type}</Badge>
                                                        </div>
                                                        <DialogTitle className="text-2xl font-bold">{tpl.name}</DialogTitle>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Button variant="outline" size="sm" className="gap-2">
                                                            <ArrowUpRight className="w-4 h-4" /> Live Demo
                                                        </Button>
                                                        <Button size="sm" className="gap-2" onClick={() => copyAllCode(tpl)}>
                                                            <Copy className="w-4 h-4" /> Copy All Code
                                                        </Button>
                                                    </div>
                                                </div>
                                            </DialogHeader>

                                            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                                                {/* Live Preview Side */}
                                                <div className="flex-1 bg-muted/30 p-8 overflow-hidden flex flex-col items-center justify-center">
                                                    <div className="w-full h-full max-w-[1000px] bg-background rounded-xl border border-border shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                                                        {/* Browser Toolbar Mock */}
                                                        <div className="h-10 border-b border-border bg-card flex items-center px-4 gap-4">
                                                            <div className="flex gap-1.5">
                                                                <div className="w-3 h-3 rounded-full bg-red-500/20 px-0" />
                                                                <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                                                                <div className="w-3 h-3 rounded-full bg-green-500/20" />
                                                            </div>
                                                            <div className="flex-1 h-6 bg-muted/50 rounded flex items-center px-3 text-[10px] text-muted-foreground/60">
                                                                https://devsuite.app/preview/{tpl.id}
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 overflow-auto p-12 bg-card relative">
                                                            {/* Preview Illustration Content */}
                                                            <div className="max-w-md mx-auto space-y-8 animate-pulse">
                                                                <div className="h-8 bg-muted rounded w-3/4 mx-auto" />
                                                                <div className="h-4 bg-muted rounded w-full" />
                                                                <div className="h-4 bg-muted rounded w-5/6 mx-auto" />
                                                                <div className="h-64 bg-muted rounded-xl w-full" />
                                                                <div className="grid grid-cols-3 gap-4">
                                                                    <div className="h-20 bg-muted rounded-lg" />
                                                                    <div className="h-20 bg-muted rounded-lg" />
                                                                    <div className="h-20 bg-muted rounded-lg" />
                                                                </div>
                                                            </div>
                                                            <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-[2px]">
                                                                <div className="text-center p-8 bg-background border border-border rounded-2xl shadow-xl max-w-sm">
                                                                    <Monitor className="w-12 h-12 text-primary mx-auto mb-4" />
                                                                    <h4 className="text-lg font-bold mb-2">Interactive Preview</h4>
                                                                    <p className="text-sm text-muted-foreground">
                                                                        In a full deployment, this area would render a live,
                                                                        interactive instance of the <strong>{tpl.name}</strong>.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Code Editor Side */}
                                                <div className="w-full md:w-[500px] lg:w-[600px] border-t md:border-t-0 md:border-l border-border flex flex-col bg-zinc-950">
                                                    <Tabs defaultValue={tpl.files[0].name} className="flex flex-col h-full">
                                                        <div className="h-12 border-b border-zinc-800 bg-zinc-900/50 flex items-center px-2">
                                                            <ScrollArea className="flex-1 h-full">
                                                                <TabsList className="bg-transparent h-10 w-full justify-start gap-1">
                                                                    {tpl.files.map(file => (
                                                                        <TabsTrigger
                                                                            key={file.name}
                                                                            value={file.name}
                                                                            className="data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-50 text-zinc-500 rounded-sm h-8 px-3 text-xs font-mono"
                                                                        >
                                                                            {file.name}
                                                                        </TabsTrigger>
                                                                    ))}
                                                                </TabsList>
                                                            </ScrollArea>
                                                        </div>
                                                        {tpl.files.map(file => (
                                                            <TabsContent key={file.name} value={file.name} className="flex-1 mt-0 relative group/editor">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="absolute right-4 top-4 h-8 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800"
                                                                    onClick={() => {
                                                                        navigator.clipboard.writeText(file.code)
                                                                        toast.success(`${file.name} copied!`)
                                                                    }}
                                                                >
                                                                    <Copy className="w-3.5 h-3.5 mr-2" />
                                                                    Copy
                                                                </Button>
                                                                <ScrollArea className="h-full">
                                                                    <pre className="p-6 text-sm font-mono text-zinc-300 leading-relaxed">
                                                                        <code>{file.code}</code>
                                                                    </pre>
                                                                </ScrollArea>
                                                            </TabsContent>
                                                        ))}
                                                    </Tabs>
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>

                                <CardHeader className="flex-1 pb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex gap-1 items-center text-xs font-medium text-muted-foreground">
                                            <Blocks className="w-3 h-3" />
                                            {tpl.blocksCount} sections
                                        </div>
                                        <div className="flex gap-1 items-center text-xs font-medium text-amber-500">
                                            <Star className="w-3 h-3 fill-amber-500" />
                                            {tpl.popularity}%
                                        </div>
                                    </div>
                                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{tpl.name}</CardTitle>
                                    <CardDescription className="mt-2 line-clamp-2">
                                        {tpl.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardFooter className="pt-0 border-t border-border/50 bg-muted/20 px-6 py-4">
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Complexity</span>
                                            <div className="flex gap-0.5">
                                                {[1, 2, 3].map(i => {
                                                    const score = tpl.complexity === 'High' ? 3 : tpl.complexity === 'Medium' ? 2 : 1
                                                    return (
                                                        <div key={i} className={cn(
                                                            "w-4 h-1 rounded-full",
                                                            i <= score ? "bg-primary" : "bg-muted-foreground/20"
                                                        )} />
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" className="group/btn text-xs font-bold hover:bg-transparent hover:text-primary transition-colors">
                                            Get Template
                                            <ChevronRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover/btn:translate-x-1" />
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 bg-card rounded-3xl border border-dashed border-border shadow-inner">
                        <Layout className="w-16 h-16 text-muted-foreground/20 mb-6" />
                        <h3 className="text-2xl font-bold mb-2">No templates found</h3>
                        <p className="text-muted-foreground text-center max-w-sm px-6">
                            We couldn't find any templates matching your current filters.
                            Try expanding your search or clearing the categories.
                        </p>
                        <Button variant="link" onClick={() => { setSearchQuery(""); setSelectedCategory("all"); setSelectedType("all"); }} className="mt-6">
                            Reset all filters
                        </Button>
                    </div>
                )}

                {/* Bottom CTA */}
                <div className="mt-12 p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-background to-background border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-4 text-center md:text-left">
                        <h2 className="text-3xl font-bold">Custom Request?</h2>
                        <p className="text-muted-foreground max-w-md">
                            Need a specific page layout or niche-specific section?
                            Our designers can build custom blocks tailored to your requirements.
                        </p>
                    </div>
                    <Button size="lg" className="rounded-full px-8 h-14 bg-primary text-primary-foreground hover:shadow-xl transition-all hover:-translate-y-1">
                        Request a Template
                    </Button>
                </div>
            </div>
        </div>
    )
}
