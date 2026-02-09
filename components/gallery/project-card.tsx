import { type ShowcaseProject } from "@/types/showcase"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Eye, Heart, ExternalLink, Milestone } from "lucide-react"
import { cn } from "@/lib/utils"

export function ProjectCard({ project }: { project: ShowcaseProject }) {
    return (
        <Card className="group overflow-hidden border-border bg-card/40 backdrop-blur-sm transition-all hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/40 rounded-3xl">
            <div className="relative aspect-video overflow-hidden">
                {/* Placeholder gradient mimicking screenshot */}
                <div className={cn(
                    "absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-110",
                    project.complexity === 'High' ? 'from-indigo-600/20 to-blue-500/20' : 'from-slate-600/20 to-slate-400/20'
                )} />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Milestone className="w-12 h-12 text-muted-foreground/30" />
                </div>
                <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-md shadow-sm border-white/10">
                        {project.category}
                    </Badge>
                </div>
            </div>

            <CardHeader className="pt-6">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6 border border-border">
                            <AvatarImage src={project.author.avatarUrl} />
                            <AvatarFallback>{project.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium text-muted-foreground">{project.author.name}</span>
                    </div>
                    <div className="flex gap-1">
                        <div className={cn(
                            "w-3 h-1 rounded-full",
                            project.complexity === 'High' ? "bg-primary" : project.complexity === 'Medium' ? "bg-primary/60" : "bg-primary/20"
                        )} />
                    </div>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{project.name}</CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-2 leading-relaxed">
                    {project.description}
                </p>
            </CardHeader>

            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] bg-muted px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-muted-foreground">
                            {tag}
                        </span>
                    ))}
                </div>
            </CardContent>

            <CardFooter className="pt-0 flex items-center justify-between mt-auto px-6 py-6 border-t border-border/50">
                <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1.5 text-xs font-bold">
                        <Eye size={14} /> {(project.stats.views / 1000).toFixed(1)}k
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold hover:text-red-500 transition-colors cursor-pointer">
                        <Heart size={14} /> {project.stats.likes}
                    </div>
                </div>
                <button className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline group/link">
                    Preview
                    <ExternalLink size={12} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </button>
            </CardFooter>
        </Card>
    )
}
