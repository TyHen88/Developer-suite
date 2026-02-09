"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Save,
    ArrowLeft,
    Rocket,
    Settings2,
    Github,
    Plus,
    X,
    Layers,
    Cpu
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { AdminStarter } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const starterSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    slug: z.string().min(2, "Slug must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    repoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    techStack: z.array(z.string()).min(1, "Select at least one tech stack item"),
    features: z.array(z.string()).min(1, "Add at least one feature"),
    isPublished: z.boolean().default(false),
})

type StarterFormValues = z.infer<typeof starterSchema>

interface StarterFormProps {
    initialData?: AdminStarter
}

const PRESET_TECH = ["Next.js", "React", "TypeScript", "Tailwind", "Drizzle", "Prisma", "Clerk", "Auth.js", "Stripe", "PostgreSQL", "OpenAI", "Lucide"]

export function StarterForm({ initialData }: StarterFormProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [featureInput, setFeatureInput] = React.useState("")

    const form = useForm<StarterFormValues>({
        resolver: zodResolver(starterSchema),
        defaultValues: initialData || {
            name: "",
            slug: "",
            description: "",
            repoUrl: "",
            techStack: [],
            features: [],
            isPublished: false,
        },
    })

    // Auto-generate slug
    React.useEffect(() => {
        const subscription = form.watch((value, { name }) => {
            if (name === "name" && !initialData) {
                const slug = value.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || ""
                form.setValue("slug", slug)
            }
        })
        return () => subscription.unsubscribe()
    }, [form, initialData])

    const onSubmit = async (data: StarterFormValues) => {
        setIsSubmitting(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsSubmitting(false)
        toast.success(`Starter ${initialData ? 'updated' : 'created'} successfully!`)
        router.push("/admin/starters")
    }

    const toggleTech = (tech: string) => {
        const current = form.getValues("techStack")
        if (current.includes(tech)) {
            form.setValue("techStack", current.filter(t => t !== tech))
        } else {
            form.setValue("techStack", [...current, tech])
        }
    }

    const addFeature = () => {
        if (featureInput.trim()) {
            const current = form.getValues("features")
            if (!current.includes(featureInput.trim())) {
                form.setValue("features", [...current, featureInput.trim()])
            }
            setFeatureInput("")
        }
    }

    const removeFeature = (feature: string) => {
        const current = form.getValues("features")
        form.setValue("features", current.filter(f => f !== feature))
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex items-center justify-between">
                <Link href="/admin/starters" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to List
                </Link>
                <div className="flex gap-4">
                    <Button variant="outline" type="button" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="gap-2 px-6">
                        <Save className="h-4 w-4" />
                        {isSubmitting ? "Deploying..." : "Save Starter"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card className="bg-card/40 backdrop-blur-sm border-border">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Rocket className="h-5 w-5 text-primary" />
                                Starter Essentials
                            </CardTitle>
                            <CardDescription>Core identity and metadata for the project boilerplate.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Starter Name</Label>
                                    <Input id="name" {...form.register("name")} placeholder="e.g. Next.js SaaS Boilerplate" />
                                    {form.formState.errors.name && <p className="text-xs text-red-500 font-medium">{form.formState.errors.name.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input id="slug" {...form.register("slug")} placeholder="e.g. nextjs-saas-boilerplate" />
                                    {form.formState.errors.slug && <p className="text-xs text-red-500 font-medium">{form.formState.errors.slug.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <textarea
                                    id="description"
                                    {...form.register("description")}
                                    placeholder="Detailed explanation of what's inside this starter..."
                                    className="w-full min-h-[100px] p-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                                {form.formState.errors.description && <p className="text-xs text-red-500 font-medium">{form.formState.errors.description.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="repoUrl" className="flex items-center gap-2">
                                    <Github className="h-3.5 w-3.5" />
                                    Repository URL
                                </Label>
                                <Input id="repoUrl" {...form.register("repoUrl")} placeholder="https://github.com/org/repo" />
                                {form.formState.errors.repoUrl && <p className="text-xs text-red-500 font-medium">{form.formState.errors.repoUrl.message}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/40 backdrop-blur-sm border-border">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Cpu className="h-5 w-5 text-primary" />
                                Tech Stack
                            </CardTitle>
                            <CardDescription>Select the technologies included in this boilerplate.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {PRESET_TECH.map(tech => {
                                    const isSelected = form.watch("techStack").includes(tech)
                                    return (
                                        <Badge
                                            key={tech}
                                            variant={isSelected ? "default" : "outline"}
                                            className={cn(
                                                "cursor-pointer px-4 py-1.5 rounded-full text-xs font-bold transition-all",
                                                isSelected ? "shadow-lg shadow-primary/20" : "hover:border-primary/50"
                                            )}
                                            onClick={() => toggleTech(tech)}
                                        >
                                            {tech}
                                        </Badge>
                                    )
                                })}
                            </div>
                            {form.formState.errors.techStack && <p className="text-xs text-red-500 font-medium mt-4">{form.formState.errors.techStack.message}</p>}
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card className="bg-card/40 backdrop-blur-sm border-border">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Settings2 className="h-5 w-5 text-primary" />
                                Settings
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                <div className="space-y-0.5">
                                    <Label htmlFor="publish" className="font-bold">Published Status</Label>
                                    <p className="text-xs text-muted-foreground">Make visible on the store.</p>
                                </div>
                                <Switch
                                    id="publish"
                                    checked={form.watch("isPublished")}
                                    onCheckedChange={(val) => form.setValue("isPublished", val)}
                                />
                            </div>

                            <div className="space-y-4">
                                <Label className="flex items-center gap-2">
                                    <Layers className="h-3.5 w-3.5" />
                                    Key Features
                                </Label>
                                <div className="flex gap-2">
                                    <Input
                                        value={featureInput}
                                        onChange={(e) => setFeatureInput(e.target.value)}
                                        placeholder="e.g. Stripe Integration"
                                        className="h-9"
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                                    />
                                    <Button type="button" size="sm" onClick={addFeature} className="flex-shrink-0">
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    {form.watch("features").map(feature => (
                                        <div key={feature} className="flex items-center justify-between p-2.5 bg-background/50 border border-border rounded-xl group transition-colors hover:border-primary/30">
                                            <span className="text-xs font-medium">{feature}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeFeature(feature)}
                                                className="h-6 w-6 rounded-full flex items-center justify-center text-muted-foreground hover:bg-destructive hover:text-destructive-foreground transition-all"
                                            >
                                                <X className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    ))}
                                    {form.formState.errors.features && <p className="text-xs text-red-500 font-medium">{form.formState.errors.features.message}</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="p-8 bg-gradient-to-br from-primary/10 to-transparent border border-primary/10 rounded-[2.5rem] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Rocket className="h-24 w-24" />
                        </div>
                        <h4 className="font-bold mb-2 relative z-10">Pro Deployment</h4>
                        <p className="text-[10px] text-muted-foreground leading-relaxed uppercase tracking-widest relative z-10">
                            Starters are automatically indexed for the DevSuite CLI search engine.
                            Ensure the repo links are public or provide an access token in settings.
                        </p>
                    </div>
                </div>
            </div>
        </form>
    )
}
