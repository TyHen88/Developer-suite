"use client"

import * as React from "react"
import {
    ArrowLeft,
    Github,
    ExternalLink,
    Star,
    Terminal,
    Check,
    Copy,
    ChevronRight,
    FolderTree,
    ListChecks,
    Rocket,
    Wrench,
    Info
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type UIStarter } from "@/lib/constants"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { toast } from "sonner"

interface StarterDetailProps {
    starter: UIStarter
}

export default function StarterDetail({ starter }: StarterDetailProps) {
    const [isCopied, setIsCopied] = React.useState(false)

    const copyCloneCommand = () => {
        const command = `git clone ${starter.githubUrl}`
        navigator.clipboard.writeText(command)
        setIsCopied(true)
        toast.success("Clone command copied!")
        setTimeout(() => setIsCopied(false), 2000)
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            {/* Breadcrumb / Back */}
            <Link href="/starters" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 group">
                <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                Back to Starters
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12">
                {/* Main Content */}
                <div className="space-y-10">
                    {/* Hero Header */}
                    <div className="space-y-6">
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="rounded-md px-3 py-1 font-mono text-xs font-bold uppercase tracking-tight">
                                {starter.category}
                            </Badge>
                            {starter.stack.map(tech => (
                                <Badge key={tech} variant="outline" className="rounded-md px-3 py-1 text-xs">
                                    {tech}
                                </Badge>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{starter.name}</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            {starter.description}
                        </p>
                    </div>

                    {/* Quick Actions Mobile */}
                    <div className="lg:hidden flex flex-col gap-4">
                        <Button size="lg" className="w-full gap-2 font-bold h-14" onClick={copyCloneCommand}>
                            <Github className="w-5 h-5" />
                            Clone Repository
                        </Button>
                        <Link href={starter.demoUrl} target="_blank" className="w-full">
                            <Button size="lg" variant="outline" className="w-full gap-2 font-bold h-14">
                                <ExternalLink className="w-5 h-5" />
                                Live Demo
                            </Button>
                        </Link>
                    </div>

                    {/* Details Tabs */}
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="w-full grid grid-cols-3 h-12 bg-muted p-1">
                            <TabsTrigger value="overview" className="text-xs sm:text-sm font-bold">Overview</TabsTrigger>
                            <TabsTrigger value="structure" className="text-xs sm:text-sm font-bold">Structure</TabsTrigger>
                            <TabsTrigger value="setup" className="text-xs sm:text-sm font-bold">Setup Guide</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="mt-8 space-y-12">
                            {/* Features List */}
                            <section className="space-y-6">
                                <h3 className="text-2xl font-bold flex items-center gap-3">
                                    <ListChecks className="w-6 h-6 text-primary" />
                                    Key Features
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {starter.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:bg-accent/30 transition-colors">
                                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                                <Check className="w-4 h-4 text-primary" />
                                            </div>
                                            <span className="text-sm font-medium leading-normal">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Tech Breakdown */}
                            <section className="space-y-6">
                                <h3 className="text-2xl font-bold flex items-center gap-3">
                                    <Wrench className="w-6 h-6 text-primary" />
                                    Technology Stack
                                </h3>
                                <div className="p-6 rounded-2xl border border-border bg-muted/30">
                                    <div className="flex flex-wrap gap-4">
                                        {starter.stack.map(tech => (
                                            <div key={tech} className="flex flex-col gap-1">
                                                <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">{tech === "Next.js" ? "Framework" : "Utility"}</span>
                                                <div className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-bold shadow-sm">
                                                    {tech}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        </TabsContent>

                        <TabsContent value="structure" className="mt-8">
                            <section className="space-y-6">
                                <h3 className="text-2xl font-bold flex items-center gap-3">
                                    <FolderTree className="w-6 h-6 text-primary" />
                                    Folder Structure
                                </h3>
                                <div className="bg-zinc-950 text-zinc-300 p-8 rounded-2xl font-mono text-sm leading-relaxed overflow-x-auto border border-zinc-800 shadow-2xl">
                                    <pre>{starter.folderStructure}</pre>
                                </div>
                            </section>
                        </TabsContent>

                        <TabsContent value="setup" className="mt-8">
                            <section className="space-y-6">
                                <h3 className="text-2xl font-bold flex items-center gap-3">
                                    <Terminal className="w-6 h-6 text-primary" />
                                    Getting Started
                                </h3>
                                <div className="bg-zinc-950 text-zinc-300 p-8 rounded-2xl font-mono text-sm leading-relaxed border border-zinc-800 shadow-2xl relative group">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-4 top-4 text-zinc-400 hover:text-zinc-50"
                                        onClick={() => {
                                            navigator.clipboard.writeText(starter.setupInstructions)
                                            toast.success("Setup guide copied!")
                                        }}
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                    <pre className="whitespace-pre-wrap">{starter.setupInstructions}</pre>
                                </div>
                            </section>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Sidebar Info */}
                <aside className="space-y-8">
                    <div className="hidden lg:flex flex-col gap-4">
                        <Button size="lg" className="w-full gap-2 font-bold h-14 shadow-xl shadow-primary/20" onClick={copyCloneCommand}>
                            <Github className="w-5 h-5" />
                            Clone Repository
                        </Button>
                        <Link href={starter.demoUrl} target="_blank" className="w-full">
                            <Button size="lg" variant="outline" className="w-full gap-2 font-bold h-14">
                                <ExternalLink className="w-5 h-5" />
                                Live Demo
                            </Button>
                        </Link>
                    </div>

                    <Card className="border-border bg-card/50">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-bold">Project Stats</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between text-sm py-2 border-b border-border/50">
                                <span className="text-muted-foreground flex items-center gap-2">
                                    <Star className="w-4 h-4" /> Stars
                                </span>
                                <span className="font-bold">{starter.stars.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm py-2 border-b border-border/50">
                                <span className="text-muted-foreground flex items-center gap-2">
                                    <Rocket className="w-4 h-4" /> Version
                                </span>
                                <span className="font-bold">v1.2.4</span>
                            </div>
                            <div className="flex items-center justify-between text-sm py-2">
                                <span className="text-muted-foreground flex items-center gap-2">
                                    <Info className="w-4 h-4" /> License
                                </span>
                                <span className="font-bold">MIT</span>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 space-y-4">
                        <h4 className="font-bold text-primary flex items-center gap-2">
                            <Rocket className="w-4 h-4" />
                            Quick Clone
                        </h4>
                        <div className="bg-background border border-border p-3 rounded-lg flex items-center justify-between font-mono text-xs overflow-hidden">
                            <span className="truncate text-muted-foreground">git clone {starter.githubUrl.split('/').pop()}</span>
                            <button onClick={copyCloneCommand} className="text-primary hover:opacity-70 ml-2">
                                {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}
