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
    Code2,
    Info,
    Settings2,
    X,
    Plus
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { AdminComponent } from "@/lib/mock-data"

const componentSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    slug: z.string().min(2, "Slug must be at least 2 characters"),
    category: z.string().min(1, "Please select a category"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    codeSnippet: z.string().optional(),
    isPublished: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
})

type ComponentFormValues = z.infer<typeof componentSchema>

interface ComponentFormProps {
    initialData?: AdminComponent
}

export function ComponentForm({ initialData }: ComponentFormProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [tagInput, setTagInput] = React.useState("")

    const form = useForm<ComponentFormValues>({
        resolver: zodResolver(componentSchema),
        defaultValues: initialData || {
            name: "",
            slug: "",
            category: "",
            description: "",
            codeSnippet: "",
            isPublished: false,
            tags: [],
        },
    })

    // Auto-generate slug from name
    React.useEffect(() => {
        const subscription = form.watch((value, { name }) => {
            if (name === "name" && !initialData) {
                const slug = value.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || ""
                form.setValue("slug", slug)
            }
        })
        return () => subscription.unsubscribe()
    }, [form, initialData])

    const onSubmit = async (data: ComponentFormValues) => {
        setIsSubmitting(true)
        try {
            const { createComponent, updateComponent } = await import("@/actions/galleryActions")

            if (initialData) {
                await updateComponent(initialData.id, data)
                toast.success("Component updated successfully!")
            } else {
                await createComponent(data)
                toast.success("Component created successfully!")
            }
            router.push("/admin/components")
            router.refresh()
        } catch (error) {
            console.error("Failed to save component:", error)
            toast.error("Failed to save component. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const addTag = () => {
        if (tagInput.trim()) {
            const currentTags = form.getValues("tags")
            if (!currentTags.includes(tagInput.trim())) {
                form.setValue("tags", [...currentTags, tagInput.trim()])
            }
            setTagInput("")
        }
    }

    const removeTag = (tagToRemove: string) => {
        const currentTags = form.getValues("tags")
        form.setValue("tags", currentTags.filter(t => t !== tagToRemove))
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex items-center justify-between">
                <Link href="/admin/components" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to List
                </Link>
                <div className="flex gap-4">
                    <Button variant="outline" type="button" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="gap-2 px-6">
                        <Save className="h-4 w-4" />
                        {isSubmitting ? "Saving..." : "Save Component"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card className="bg-card/40 backdrop-blur-sm border-border">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Info className="h-5 w-5 text-primary" />
                                General Information
                            </CardTitle>
                            <CardDescription>The basic identity and categorization of the component.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Component Name</Label>
                                    <Input id="name" {...form.register("name")} placeholder="e.g. Interactive Button" />
                                    {form.formState.errors.name && <p className="text-xs text-red-500 font-medium">{form.formState.errors.name.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input id="slug" {...form.register("slug")} placeholder="e.g. interactive-button" />
                                    {form.formState.errors.slug && <p className="text-xs text-red-500 font-medium">{form.formState.errors.slug.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <select
                                    id="category"
                                    {...form.register("category")}
                                    className="w-full h-10 px-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none"
                                >
                                    <option value="">Select a category...</option>
                                    <option value="Data Display">Data Display</option>
                                    <option value="Forms">Forms</option>
                                    <option value="Navigation">Navigation</option>
                                    <option value="Overlays">Overlays</option>
                                    <option value="Marketing">Marketing</option>
                                </select>
                                {form.formState.errors.category && <p className="text-xs text-red-500 font-medium">{form.formState.errors.category.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <textarea
                                    id="description"
                                    {...form.register("description")}
                                    placeholder="Provide a clear description of what this component does..."
                                    className="w-full min-h-[120px] p-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                                {form.formState.errors.description && <p className="text-xs text-red-500 font-medium">{form.formState.errors.description.message}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/40 backdrop-blur-sm border-border">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Code2 className="h-5 w-5 text-primary" />
                                Source Code
                            </CardTitle>
                            <CardDescription>The React/TypeScript implementation code.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <textarea
                                id="codeSnippet"
                                {...form.register("codeSnippet")}
                                placeholder="// Paste your component code here..."
                                className="w-full min-h-[300px] p-4 bg-zinc-950 text-zinc-300 font-mono text-sm border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
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
                                    <p className="text-xs text-muted-foreground">Make visible on the live site.</p>
                                </div>
                                <Switch
                                    id="publish"
                                    checked={form.watch("isPublished")}
                                    onCheckedChange={(val) => form.setValue("isPublished", val)}
                                />
                            </div>

                            <div className="space-y-4">
                                <Label>Project Tags</Label>
                                <div className="flex gap-2">
                                    <Input
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        placeholder="Add tag..."
                                        className="h-9"
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                    />
                                    <Button type="button" size="sm" onClick={addTag} className="flex-shrink-0">
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {form.watch("tags").map(tag => (
                                        <Badge key={tag} variant="secondary" className="pl-3 pr-1 py-1 rounded-full text-[10px] font-bold uppercase flex items-center gap-1 group">
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(tag)}
                                                className="h-4 w-4 rounded-full flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
                                            >
                                                <X className="h-2.5 w-2.5" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="p-6 bg-primary/5 rounded-[2rem] border border-primary/10 space-y-4">
                        <h4 className="font-bold text-sm">Deployment Check</h4>
                        <ul className="space-y-2 text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                            <li className="flex items-center gap-2 opacity-50"><div className="h-1.5 w-1.5 rounded-full bg-primary" /> Lint checks passed</li>
                            <li className="flex items-center gap-2 opacity-50"><div className="h-1.5 w-1.5 rounded-full bg-primary" /> Types generated</li>
                        </ul>
                    </div>
                </div>
            </div>
        </form>
    )
}
