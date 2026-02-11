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
    Layout,
    Settings2,
    Image as ImageIcon,
    Plus
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { AdminTemplate } from "@/lib/mock-data"

const templateSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    slug: z.string().min(2, "Slug must be at least 2 characters"),
    category: z.string().min(1, "Please select a category"),
    blocksCount: z.coerce.number().min(1, "Must have at least 1 block"),
    previewImage: z.string().optional(),
    isPublished: z.boolean().default(false),
})

type TemplateFormValues = z.infer<typeof templateSchema>

interface TemplateFormProps {
    initialData?: AdminTemplate
}

export function TemplateForm({ initialData }: TemplateFormProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [isUploading, setIsUploading] = React.useState(false)
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    const form = useForm<TemplateFormValues>({
        resolver: zodResolver(templateSchema),
        defaultValues: initialData || {
            title: "",
            slug: "",
            category: "",
            blocksCount: 1,
            previewImage: "",
            isPublished: false,
        },
    })

    // Auto-generate slug from title
    React.useEffect(() => {
        const subscription = form.watch((value, { name }) => {
            if (name === "title" && !initialData) {
                const slug = value.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || ""
                form.setValue("slug", slug)
            }
        })
        return () => subscription.unsubscribe()
    }, [form, initialData])

    const onSubmit = async (data: TemplateFormValues) => {
        setIsSubmitting(true)
        try {
            const { createTemplate, updateTemplate } = await import("@/actions/galleryActions")
            if (initialData) {
                await updateTemplate(initialData.id, data)
                toast.success("Template updated successfully!")
            } else {
                await createTemplate(data)
                toast.success("Template created successfully!")
            }
            router.push("/admin/templates")
            router.refresh()
        } catch (error) {
            console.log(error)
            toast.error("Failed to create template!")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setIsUploading(true)
            const formData = new FormData()
            formData.append("file", file)

            try {
                const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                })

                if (!res.ok) throw new Error("Upload failed")

                const data = await res.json()
                if (data.secure_url) {
                    form.setValue("previewImage", data.secure_url)
                    toast.success("Image uploaded successfully!")
                }
            } catch (error) {
                console.error("Upload error:", error)
                toast.error("Failed to upload image")
            } finally {
                setIsUploading(false)
                e.target.value = ""
            }
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex items-center justify-between">
                <Link href="/admin/templates" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to List
                </Link>
                <div className="flex gap-4">
                    <Button variant="outline" type="button" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="gap-2 px-6">
                        <Save className="h-4 w-4" />
                        {isSubmitting ? "Saving..." : "Save Template"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card className="bg-card/40 backdrop-blur-sm border-border">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Layout className="h-5 w-5 text-primary" />
                                Template Details
                            </CardTitle>
                            <CardDescription>Configure the template structure and identification.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Template Title</Label>
                                    <Input id="title" {...form.register("title")} placeholder="e.g. SaaS Modern Landing" />
                                    {form.formState.errors.title && <p className="text-xs text-red-500 font-medium">{form.formState.errors.title.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input id="slug" {...form.register("slug")} placeholder="e.g. saas-modern-landing" />
                                    {form.formState.errors.slug && <p className="text-xs text-red-500 font-medium">{form.formState.errors.slug.message}</p>}
                                </div>
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
                                        <option value="Marketing">Marketing</option>
                                        <option value="Dashboard">Dashboard</option>
                                        <option value="Auth">Auth</option>
                                        <option value="E-commerce">E-commerce</option>
                                        <option value="Landing">Landing</option>
                                    </select>
                                    {form.formState.errors.category && <p className="text-xs text-red-500 font-medium">{form.formState.errors.category.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="blocksCount">Blocks Count</Label>
                                    <Input id="blocksCount" type="number" {...form.register("blocksCount")} />
                                    {form.formState.errors.blocksCount && <p className="text-xs text-red-500 font-medium">{form.formState.errors.blocksCount.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Preview Image</Label>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                                <div
                                    className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:bg-primary/5 transition-colors cursor-pointer overflow-hidden relative group min-h-[160px] flex flex-col items-center justify-center"
                                    onClick={() => {
                                        console.log("Upload area clicked");
                                        fileInputRef.current?.click();
                                    }}
                                >
                                    {isUploading ? (
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                            <p className="text-xs font-bold text-primary animate-pulse uppercase tracking-widest">Uploading...</p>
                                        </div>
                                    ) : form.watch("previewImage") ? (
                                        <div className="relative aspect-video w-full">
                                            <img
                                                src={form.watch("previewImage")}
                                                alt="Preview"
                                                className="object-cover w-full h-full rounded-xl"
                                            />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                                                <p className="text-white text-xs font-bold">Click to Change Image</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <ImageIcon className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                                            <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                                            <p className="text-[10px] text-muted-foreground/60 uppercase mt-1">PNG, JPG up to 10MB</p>
                                        </>
                                    )}
                                </div>
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
                                    <p className="text-xs text-muted-foreground">Make visible in gallery.</p>
                                </div>
                                <Switch
                                    id="publish"
                                    checked={form.watch("isPublished")}
                                    onCheckedChange={(val) => form.setValue("isPublished", val)}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    )
}
