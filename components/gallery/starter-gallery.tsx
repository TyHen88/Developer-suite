"use client"

import * as React from "react"
import { Search, Star, Github, ExternalLink, Box, Terminal, ChevronRight, Layers, Package, Globe, Smartphone, BookOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { apiService } from "@/lib/api"
import { type UIStarter, type StarterCategory } from "@/lib/constants"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { toast } from "sonner"

export default function StarterGallery() {
    const [searchQuery, setSearchQuery] = React.useState("")
    const [selectedCategory, setSelectedCategory] = React.useState<StarterCategory | "all">("all")
    const [starters, setStarters] = React.useState<UIStarter[]>([])
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const data = await apiService.getStarters({
                    query: searchQuery,
                    category: selectedCategory
                })
                setStarters(data)
            } catch (error) {
                toast.error("Failed to fetch starters")
            } finally {
                setIsLoading(false)
            }
        }

        const timer = setTimeout(fetchData, 300)
        return () => clearTimeout(timer)
    }, [searchQuery, selectedCategory])

    const categories: { label: string, value: StarterCategory | "all", icon: React.ReactNode }[] = [
        { label: "All Kits", value: "all", icon: <Package className="w-4 h-4" /> },
        { label: "Full-stack", value: "Full-stack", icon: <Layers className="w-4 h-4" /> },
        { label: "Frontend", value: "Frontend", icon: <Globe className="w-4 h-4" /> },
        { label: "Mobile", value: "Mobile", icon: <Smartphone className="w-4 h-4" /> },
        { label: "Library", value: "Library", icon: <Box className="w-4 h-4" /> },
    ]

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col gap-10">
                {/* Header */}
                <div className="space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Starter Kits</h1>
                    <p className="text-xl text-muted-foreground max-w-3xl">
                        Jumpstart your development with professional-grade boilerplate and app templates.
                        Pre-configured with the best tools and patterns.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-card p-6 rounded-2xl border border-border shadow-sm">
                    <div className="relative w-full md:max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                            placeholder="Search by name, tech or description..."
                            className="pl-10 h-11"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
                        {categories.map((cat) => (
                            <button
                                key={cat.value}
                                onClick={() => setSelectedCategory(cat.value)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                                    selectedCategory === cat.value
                                        ? "bg-primary text-primary-foreground shadow-lg"
                                        : "bg-muted text-muted-foreground hover:bg-accent"
                                )}
                            >
                                {cat.icon}
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {isLoading ? (
                        Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="h-[400px] rounded-2xl bg-muted animate-pulse border border-border" />
                        ))
                    ) : starters.length > 0 ? (
                        starters.map((starter) => (
                            <Card key={starter.id} className="group flex flex-col h-full border-border hover:border-primary/50 transition-all hover:shadow-2xl">
                                <CardHeader className="pb-4">
                                    <div className="flex justify-between items-start mb-4">
                                        <Badge variant="outline" className="rounded-md font-mono text-[10px] uppercase tracking-wider">
                                            {starter.category}
                                        </Badge>
                                        <div className="flex items-center gap-1.5 text-amber-500 font-bold text-sm">
                                            <Star className="w-4 h-4 fill-current" />
                                            {starter.stars >= 1000 ? `${(starter.stars / 1000).toFixed(1)}k` : starter.stars}
                                        </div>
                                    </div>
                                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">{starter.name}</CardTitle>
                                    <CardDescription className="line-clamp-2 mt-2 leading-relaxed h-10">
                                        {starter.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1 space-y-6">
                                    <div className="flex flex-wrap gap-2">
                                        {starter.stack.map(tech => (
                                            <Badge key={tech} variant="secondary" className="bg-primary/5 text-primary border-primary/10">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter className="pt-0 border-t border-border/50 bg-muted/20 px-6 py-5 gap-3">
                                    <Link href={`/starters/${starter.slug}`} className="flex-1">
                                        <Button variant="outline" className="w-full font-bold">
                                            View Details
                                        </Button>
                                    </Link>
                                    <Button className="font-bold gap-2">
                                        <Github className="w-4 h-4" />
                                        Clone
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <Package className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
                            <h3 className="text-xl font-bold">No starters found</h3>
                            <p className="text-muted-foreground">Try adjusting your search terms or category filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
