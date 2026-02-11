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
import {
    Save,
    ArrowLeft,
    FileText,
    Settings2,
    Type,
    Code2,
    Eye
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { AdminDoc } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const docSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    slug: z.string().min(2, "Slug must be at least 2 characters"),
    category: z.string().min(1, "Please select a category"),
    content: z.string().min(10, "Content must be at least 10 characters"),
    isPublished: z.boolean().default(false),
})

type DocFormValues = z.infer<typeof docSchema>

interface DocFormProps {
    initialData?: AdminDoc
}

export function DocForm({ initialData }: DocFormProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [activeTab, setActiveTab] = React.useState<"edit" | "preview">("edit")

    const form = useForm<DocFormValues>({
        resolver: zodResolver(docSchema),
        defaultValues: initialData || {
            title: "",
            slug: "",
            category: "",
            content: "",
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

    const onSubmit = async (data: DocFormValues) => {
        setIsSubmitting(true)
        try {
            const { createDoc, updateDoc } = await import("@/actions/galleryActions")
            if (initialData) {
                await updateDoc(initialData.id, data)
                toast.success("Documentation updated successfully!")
            } else {
                await createDoc(data)
                toast.success("Documentation created successfully!")
            }
            router.push("/admin/docs")
            router.refresh()
        } catch (error) {
            console.error(error)
            toast.error("Failed to save documentation!")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex items-center justify-between">
                <Link href="/admin/docs" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to List
                </Link>
                <div className="flex gap-4">
                    <Button variant="outline" type="button" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="gap-2 px-6">
                        <Save className="h-4 w-4" />
                        {isSubmitting ? "Saving..." : "Save Document"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card className="bg-card/40 backdrop-blur-sm border-border">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-primary" />
                                Document Metadata
                            </CardTitle>
                            <CardDescription>Basic information for organizing and identifying the doc.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Document Title</Label>
                                    <Input id="title" {...form.register("title")} placeholder="e.g. Getting Started" />
                                    {form.formState.errors.title && <p className="text-xs text-red-500 font-medium">{form.formState.errors.title.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input id="slug" {...form.register("slug")} placeholder="e.g. getting-started" />
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
                                    <option value="Installation">Installation</option>
                                    <option value="API Reference">API Reference</option>
                                    <option value="Operations">Operations</option>
                                    <option value="Advanced">Advanced</option>
                                    <option value="Conceptual">Conceptual</option>
                                </select>
                                {form.formState.errors.category && <p className="text-xs text-red-500 font-medium">{form.formState.errors.category.message}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/40 backdrop-blur-sm border-border">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle className="flex items-center gap-2">
                                    <Type className="h-5 w-5 text-primary" />
                                    Content Editor
                                </CardTitle>
                                <CardDescription>Write your documentation using Markdown.</CardDescription>
                            </div>
                            <div className="flex bg-muted rounded-lg p-1">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("edit")}
                                    className={cn(
                                        "px-3 py-1.5 text-xs font-bold rounded-md transition-all",
                                        activeTab === "edit" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    Editor
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("preview")}
                                    className={cn(
                                        "px-3 py-1.5 text-xs font-bold rounded-md transition-all",
                                        activeTab === "preview" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    Preview
                                </button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {activeTab === "edit" ? (
                                <textarea
                                    id="content"
                                    {...form.register("content")}
                                    placeholder="# Your Markdown Content Here..."
                                    className="w-full min-h-[500px] p-4 bg-zinc-950 text-zinc-300 font-mono text-sm border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                            ) : (
                                <div className="min-h-[500px] p-4 prose prose-invert max-w-none border border-border rounded-xl bg-background/50">
                                    <div className="text-muted-foreground italic text-sm mb-4 flex items-center gap-2">
                                        <Eye className="h-4 w-4" />
                                        Markdown Preview Mode
                                    </div>
                                    {form.watch("content") || "Nothing to preview..."}
                                </div>
                            )}
                            {form.formState.errors.content && <p className="text-xs text-red-500 font-medium mt-2">{form.formState.errors.content.message}</p>}
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
                                    <p className="text-xs text-muted-foreground">Make visible on docs portal.</p>
                                </div>
                                <Switch
                                    id="publish"
                                    checked={form.watch("isPublished")}
                                    onCheckedChange={(val) => form.setValue("isPublished", val)}
                                />
                            </div>

                            <div className="p-4 bg-muted/30 rounded-2xl border border-border space-y-4">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Authoring Tips</h4>
                                <ul className="text-[10px] space-y-2 font-medium">
                                    <li className="flex gap-2"><div className="h-3 w-3 rounded bg-primary/20 shrink-0" /> Use H1 (#) for main title</li>
                                    <li className="flex gap-2"><div className="h-3 w-3 rounded bg-primary/20 shrink-0" /> Use H2 (##) for sections</li>
                                    <li className="flex gap-2"><div className="h-3 w-3 rounded bg-primary/20 shrink-0" /> Backticks for `inline code`</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="p-8 bg-card/40 border border-border rounded-[2.5rem] flex flex-col items-center text-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <Code2 className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm">Rich Snippets</h4>
                            <p className="text-[10px] text-muted-foreground mt-1">
                                Future updates will allow embedding live React components directly in documentation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
