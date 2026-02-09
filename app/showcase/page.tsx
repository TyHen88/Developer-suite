"use client"

import * as React from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ProjectCard } from "@/components/gallery/project-card"
import { getMockProjects } from "@/lib/mock-data" // MOCK_DATA import
import { type ShowcaseProject } from "@/types/showcase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Filter } from "lucide-react"

export default function ShowcasePage() {
    const [projects, setProjects] = React.useState<ShowcaseProject[]>([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [activeCategory, setActiveCategory] = React.useState('all')

    // MOCK_DATA comment: This effect simulates an async API call to fetch projects.
    // To replace with real API: Replace getMockProjects() with fetch('/api/projects').
    React.useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            await new Promise(resolve => setTimeout(resolve, 800)) // Latency simulation
            const data = getMockProjects(activeCategory)
            setProjects(data)
            setIsLoading(false)
        }
        fetchData()
    }, [activeCategory])

    const categories = ['all', 'SaaS', 'Dashboard', 'E-commerce', 'Internal Tool']

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Header />

            <main className="flex-1">
                <div className="container mx-auto px-4 py-12 lg:py-20 max-w-7xl">
                    <div className="flex flex-col gap-12">
                        {/* Hero Section */}
                        <div className="max-w-3xl space-y-4">
                            <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                Built with DevSuite
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Explore the next generation of applications built by our global community.
                                High-performance, accessible, and stunningly designed using our professional components.
                            </p>
                        </div>

                        {/* Toolbar */}
                        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card/50 p-6 rounded-2xl border border-border mt-4 backdrop-blur-sm">
                            <div className="relative w-full md:max-w-sm">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search projects..." className="pl-10 h-11 bg-background/50" />
                            </div>
                            <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto no-scrollbar pb-1 md:pb-0">
                                <div className="flex p-1 bg-muted/50 rounded-lg border border-border/50">
                                    {categories.map(cat => (
                                        <Button
                                            key={cat}
                                            variant={activeCategory === cat ? 'default' : 'ghost'}
                                            size="sm"
                                            onClick={() => setActiveCategory(cat)}
                                            className="rounded-md h-8 text-xs px-3"
                                        >
                                            {cat === 'all' ? 'All Projects' : cat}
                                        </Button>
                                    ))}
                                </div>
                                <div className="w-px h-6 bg-border mx-1" />
                                <Button size="icon" variant="outline" className="h-9 w-9 rounded-full shrink-0">
                                    <Filter size={16} />
                                </Button>
                                <Button className="rounded-full gap-2 h-9 ml-2 px-5">
                                    <Plus size={16} />
                                    Submit
                                </Button>
                            </div>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {isLoading ? (
                                // Loading Skeleton
                                Array.from({ length: 6 }).map((_, i) => (
                                    <div key={i} className="h-[420px] rounded-3xl bg-muted/20 animate-pulse border border-border border-dashed" />
                                ))
                            ) : projects.length > 0 ? (
                                projects.map(project => (
                                    <ProjectCard key={project.id} project={project} />
                                ))
                            ) : (
                                <div className="col-span-full py-32 text-center bg-card/20 rounded-3xl border border-dashed border-border">
                                    <h3 className="text-2xl font-bold">No projects found in this category</h3>
                                    <p className="text-muted-foreground mt-2">Be the first to submit a project built with DevSuite!</p>
                                    <Button variant="outline" className="mt-6 rounded-full" onClick={() => setActiveCategory('all')}>
                                        View all projects
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
