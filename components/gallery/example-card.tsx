import { type UIExample } from "@/lib/mock-data"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Layers, Blocks } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ExampleCardProps {
    example: UIExample
}

export function ExampleCard({ example }: ExampleCardProps) {
    return (
        <Card className="group overflow-hidden border-border bg-card/40 backdrop-blur-sm transition-all hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/40 rounded-3xl flex flex-col">
            <div className="relative aspect-video overflow-hidden">
                {/* Mock Preview Background */}
                <div className={cn(
                    "absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-110",
                    example.difficulty === 'advanced' ? 'from-indigo-600/10 to-purple-600/10' :
                        example.difficulty === 'intermediate' ? 'from-blue-600/10 to-emerald-600/10' :
                            'from-slate-600/10 to-slate-400/10'
                )} />

                {/* Placeholder Graphic */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
                    <Layers className="w-12 h-12" />
                </div>

                <div className="absolute top-4 left-4 flex gap-2">
                    <Badge
                        variant="secondary"
                        className={cn(
                            "bg-background/90 backdrop-blur shadow-sm border-white/5",
                            example.difficulty === 'advanced' ? "text-purple-500" :
                                example.difficulty === 'intermediate' ? "text-blue-500" :
                                    "text-emerald-500"
                        )}
                    >
                        {example.difficulty}
                    </Badge>
                </div>
            </div>

            <CardHeader className="pt-6">
                <div className="flex flex-wrap gap-1.5 mb-3">
                    {example.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">
                            #{tag}
                        </span>
                    ))}
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{example.title}</CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-2 leading-relaxed">
                    {example.description}
                </p>
            </CardHeader>

            <CardContent className="flex-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground/80">
                    <Blocks className="h-3.5 w-3.5" />
                    {example.featuredComponents.length} components featured
                </div>
            </CardContent>

            <CardFooter className="pt-0 pb-6 px-6">
                <Link href={`/examples/${example.slug}`} className="w-full">
                    <Button variant="outline" className="w-full h-11 rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all gap-2">
                        View Example
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}
