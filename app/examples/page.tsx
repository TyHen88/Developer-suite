"use client"

import * as React from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ExampleCard } from "@/components/gallery/example-card"
import { MOCK_EXAMPLES, type UIExample } from "@/lib/mock-data"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, LayoutGrid } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ExamplesPage() {
    const [searchQuery, setSearchQuery] = React.useState("")
    const [activeDifficulty, setActiveDifficulty] = React.useState<string | null>(null)
    const [activeTag, setActiveTag] = React.useState<string | null>(null)
    const [isLoading, setIsLoading] = React.useState(true)

    // MOCK_DATA comment: Simulated API call
    const [filteredExamples, setFilteredExamples] = React.useState<UIExample[]>([])

    React.useEffect(() => {
        const timer = setTimeout(() => {
            let filtered = MOCK_EXAMPLES.filter(ex => {
                const matchesSearch = ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    ex.description.toLowerCase().includes(searchQuery.toLowerCase())
                const matchesDifficulty = !activeDifficulty || ex.difficulty === activeDifficulty
                const matchesTag = !activeTag || ex.tags.includes(activeTag)
                return matchesSearch && matchesDifficulty && matchesTag
            })
            setFilteredExamples(filtered)
            setIsLoading(false)
        }, 500)
        return () => clearTimeout(timer)
    }, [searchQuery, activeDifficulty, activeTag])

    const tags = Array.from(new Set(MOCK_EXAMPLES.flatMap(ex => ex.tags))).sort()

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Header />

            <main className="flex-1">
                <div className="container mx-auto px-4 py-16 lg:py-24 max-w-7xl">
                    <div className="flex flex-col gap-12">
                        {/* Header */}
                        <div className="max-w-3xl space-y-4">
                            <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl text-gradient">
                                Practical Examples
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Learn by doing. Browse our collection of mini-apps and common UI patterns
                                built with DevSuite components to accelerate your development.
                            </p>
                        </div>

                        {/* Filters */}
                        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between bg-card/40 backdrop-blur-md p-6 rounded-3xl border border-border">
                            <div className="relative w-full lg:max-w-md">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search examples (e.g. 'auth', 'dashboard')..."
                                    className="pl-10 h-12 bg-background/50 rounded-xl"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <div className="flex p-1 bg-muted/50 rounded-xl border border-border/50">
                                    {['beginner', 'intermediate', 'advanced'].map(diff => (
                                        <Button
                                            key={diff}
                                            variant={activeDifficulty === diff ? 'default' : 'ghost'}
                                            size="sm"
                                            onClick={() => setActiveDifficulty(activeDifficulty === diff ? null : diff)}
                                            className="rounded-lg h-9 text-xs capitalize"
                                        >
                                            {diff}
                                        </Button>
                                    ))}
                                </div>
                                <div className="w-px h-6 bg-border mx-2" />
                                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 max-w-[300px]">
                                    {tags.map(tag => (
                                        <Badge
                                            key={tag}
                                            variant={activeTag === tag ? 'default' : 'outline'}
                                            className="cursor-pointer whitespace-nowrap px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all"
                                            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Grid */}
                        {isLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <div key={i} className="h-[400px] rounded-3xl bg-muted/20 animate-pulse border border-border border-dashed" />
                                ))}
                            </div>
                        ) : filteredExamples.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredExamples.map(example => (
                                    <ExampleCard key={example.id} example={example} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-32 text-center bg-card/20 rounded-3xl border border-dashed border-border">
                                <LayoutGrid className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                                <h3 className="text-xl font-bold">No examples found</h3>
                                <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
                                <Button variant="link" onClick={() => { setSearchQuery(""); setActiveDifficulty(null); setActiveTag(null); }} className="mt-4">
                                    Clear all filters
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
