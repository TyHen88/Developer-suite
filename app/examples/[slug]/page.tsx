import { getMockExampleBySlug } from "@/lib/mock-data"
import { notFound } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ExternalLink, Code2, Monitor, Smartphone, Tablet, Copy } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ExampleDetailPageProps {
    params: Promise<{ slug: string }>
}

export default async function ExampleDetailPage({ params }: ExampleDetailPageProps) {
    const { slug } = await params
    const example = getMockExampleBySlug(slug)

    if (!example) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Header />

            <main className="flex-1">
                <div className="container mx-auto px-4 py-12 max-w-7xl">
                    {/* Breadcrumb / Back */}
                    <Link href="/examples" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors gap-2 mb-8">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Examples
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12">
                        <div className="space-y-10">
                            {/* Info */}
                            <div className="space-y-6">
                                <div className="flex flex-wrap items-center gap-3">
                                    <Badge variant="outline" className="rounded-full px-4 py-1 capitalize border-primary/20 text-primary bg-primary/5">
                                        {example.difficulty}
                                    </Badge>
                                    {example.tags.map(tag => (
                                        <Badge key={tag} variant="secondary" className="rounded-full px-4 py-1">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                                    {example.title}
                                </h1>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    {example.description}
                                </p>
                            </div>

                            {/* Preview Section */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between border-b border-border pb-4">
                                    <div className="flex items-center gap-6">
                                        <h2 className="text-xl font-bold">Interactive Preview</h2>
                                        <div className="flex items-center gap-1 p-1 bg-muted rounded-lg border border-border/50">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 bg-background"><Monitor className="h-4 w-4" /></Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8"><Tablet className="h-4 w-4" /></Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8"><Smartphone className="h-4 w-4" /></Button>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" className="gap-2 rounded-full">
                                        <ExternalLink className="h-3.5 w-3.5" />
                                        Open in New Tab
                                    </Button>
                                </div>

                                <div className="aspect-video bg-muted rounded-[2rem] border border-border overflow-hidden relative group">
                                    {/* TODO: Replace with real iframe / live demo later */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent flex flex-col items-center justify-center space-y-4">
                                        <div className="p-6 bg-background rounded-3xl border border-border shadow-2xl max-w-sm text-center">
                                            <Monitor className="h-10 w-10 text-primary mx-auto mb-4" />
                                            <h4 className="font-bold mb-2">Live Demo Instance</h4>
                                            <p className="text-sm text-muted-foreground">
                                                In a full deployment, this area would render a live instance
                                                of the {example.title}.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Code Tabs */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold">Implementation Details</h2>
                                    <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
                                        <Copy className="h-3.5 w-3.5" />
                                        Copy Entire Project
                                    </Button>
                                </div>

                                <Tabs defaultValue="page.tsx" className="w-full">
                                    <TabsList className="bg-muted/50 p-1 rounded-xl h-11 w-full justify-start gap-2 border border-border/50 mb-4">
                                        <TabsTrigger value="page.tsx" className="rounded-lg px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm">page.tsx</TabsTrigger>
                                        <TabsTrigger value="components.tsx" className="rounded-lg px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm">components.tsx</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="page.tsx">
                                        <div className="relative group">
                                            <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-all">
                                                <Button size="icon" variant="secondary" className="h-8 w-8"><Copy className="h-4 w-4" /></Button>
                                            </div>
                                            <div className="bg-zinc-950 rounded-2xl p-8 border border-zinc-800 font-mono text-sm shadow-xl">
                                                <pre className="text-zinc-300">
                                                    <code>{example.codeSnippet || `// No code snippet provided for this example.`}</code>
                                                </pre>
                                            </div>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="components.tsx">
                                        <div className="bg-zinc-950 rounded-2xl p-8 border border-zinc-800 min-h-[200px] flex items-center justify-center text-zinc-500 italic">
                                            Multiple files view is coming soon...
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </div>

                        {/* Sidebar / Metadata */}
                        <aside className="space-y-8">
                            <div className="p-8 bg-card/40 backdrop-blur-sm border border-border rounded-[2rem] space-y-6">
                                <h3 className="font-bold text-lg">Featured Components</h3>
                                <div className="flex flex-wrap gap-2">
                                    {example.featuredComponents.map(comp => (
                                        <Badge key={comp} variant="secondary" className="bg-background border border-border/50">
                                            {comp}
                                        </Badge>
                                    ))}
                                </div>
                                <div className="pt-6 border-t border-border/50 space-y-4">
                                    <Button className="w-full h-12 rounded-xl font-bold gap-2">
                                        Get Starter Template
                                    </Button>
                                    <Button variant="outline" className="w-full h-12 rounded-xl font-bold">
                                        View Documentation
                                    </Button>
                                </div>
                            </div>

                            <div className="p-8 bg-primary/5 border border-primary/10 rounded-[2rem] space-y-4">
                                <h4 className="font-bold flex items-center gap-2">
                                    <Code2 className="h-4 w-4 text-primary" />
                                    Technical Specs
                                </h4>
                                <ul className="space-y-3 text-sm text-muted-foreground font-medium">
                                    <li className="flex justify-between items-center">
                                        <span>React Version</span>
                                        <span className="text-foreground">19.0.0</span>
                                    </li>
                                    <li className="flex justify-between items-center">
                                        <span>Tailwind Version</span>
                                        <span className="text-foreground">4.0.0</span>
                                    </li>
                                    <li className="flex justify-between items-center">
                                        <span>Complexity Score</span>
                                        <span className="text-foreground uppercase">{example.difficulty}</span>
                                    </li>
                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
