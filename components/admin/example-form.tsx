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
    Library,
    Settings2,
    Zap,
    Layout,
    Info
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { AdminExample } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const exampleSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    slug: z.string().min(2, "Slug must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    category: z.string().min(1, "Please select a category"),
    difficulty: z.enum(["beginner", "intermediate", "advanced"]),
    isPublished: z.boolean().default(false),
})

type ExampleFormValues = z.infer<typeof exampleSchema>

interface ExampleFormProps {
    initialData?: AdminExample
}

export function ExampleForm({ initialData }: ExampleFormProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const form = useForm<ExampleFormValues>({
        resolver: zodResolver(exampleSchema),
        defaultValues: initialData || {
            title: "",
            slug: "",
            description: "",
            category: "",
            difficulty: "beginner",
            isPublished: false,
        },
    })

    // Auto-generate slug
    React.useEffect(() => {
        const subscription = form.watch((value, { name }) => {
            if (name === "title" && !initialData) {
                const slug = value.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || ""
                form.setValue("slug", slug)
            }
        })
        return () => subscription.unsubscribe()
    }, [form, initialData])

    const onSubmit = async (data: ExampleFormValues) => {
        setIsSubmitting(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsSubmitting(false)
        toast.success(`Example ${initialData ? 'updated' : 'created'} successfully!`)
        router.push("/admin/examples")
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex items-center justify-between">
                <Link href="/admin/examples" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to List
                </Link>
                <div className="flex gap-4">
                    <Button variant="outline" type="button" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="gap-2 px-6">
                        <Save className="h-4 w-4" />
                        {isSubmitting ? "Deploying..." : "Save Example"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card className="bg-card/40 backdrop-blur-sm border-border">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Info className="h-5 w-5 text-primary" />
                                Example Identity
                            </CardTitle>
                            <CardDescription>Define the core details of this interactive pattern.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Example Title</Label>
                                    <Input id="title" {...form.register("title")} placeholder="e.g. SaaS Dashboard" />
                                    {form.formState.errors.title && <p className="text-xs text-red-500 font-medium">{form.formState.errors.title.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input id="slug" {...form.register("slug")} placeholder="e.g. saas-dashboard" />
                                    {form.formState.errors.slug && <p className="text-xs text-red-500 font-medium">{form.formState.errors.slug.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <textarea
                                    id="description"
                                    {...form.register("description")}
                                    placeholder="Explain the technical pattern shown in this example..."
                                    className="w-full min-h-[100px] p-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                                {form.formState.errors.description && <p className="text-xs text-red-500 font-medium">{form.formState.errors.description.message}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <select
                                        id="category"
                                        {...form.register("category")}
                                        className="w-full h-10 px-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none"
                                    >
                                        <option value="">Select a category...</option>
                                        <option value="Dashboard">Dashboard</option>
                                        <option value="Authentication">Authentication</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Application">Application</option>
                                        <option value="Data Visualization">Data Visualization</option>
                                    </select>
                                    {form.formState.errors.category && <p className="text-xs text-red-500 font-medium">{form.formState.errors.category.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="difficulty">Difficulty Level</Label>
                                    <div className="flex gap-2">
                                        {["beginner", "intermediate", "advanced"].map((level) => (
                                            <button
                                                key={level}
                                                type="button"
                                                onClick={() => form.setValue("difficulty", level as any)}
                                                className={cn(
                                                    "flex-1 px-4 py-2 rounded-xl text-xs font-bold border transition-all capitalize",
                                                    form.watch("difficulty") === level
                                                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                                                        : "bg-background border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                                                )}
                                            >
                                                {level}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/40 backdrop-blur-sm border-border">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Layout className="h-5 w-5 text-primary" />
                                Live Preview Assets
                            </CardTitle>
                            <CardDescription>Manage the interactive demonstration for the gallery.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="p-12 border-2 border-dashed border-border rounded-3xl text-center bg-primary/5 group cursor-pointer hover:bg-primary/10 transition-colors">
                                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <Zap className="h-6 w-6 text-primary" />
                                </div>
                                <h4 className="font-bold mb-1">Click to Upload Preview</h4>
                                <p className="text-xs text-muted-foreground">Attach images or video demos of the pattern.</p>
                            </div>
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
                                    <p className="text-xs text-muted-foreground">Make visible in Examples gallery.</p>
                                </div>
                                <Switch
                                    id="publish"
                                    checked={form.watch("isPublished")}
                                    onCheckedChange={(val) => form.setValue("isPublished", val)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="p-8 bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/10 rounded-[2.5rem] flex flex-col gap-4">
                        <div className="h-10 w-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                            <Library className="h-5 w-5 text-indigo-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm">Gallery SEO</h4>
                            <p className="text-[10px] text-muted-foreground leading-relaxed uppercase tracking-widest">
                                Examples are the #1 driver for platform discovery.
                                Ensure titles use high-intent keywords like "SaaS Dashboard" or "Auth Flow".
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
