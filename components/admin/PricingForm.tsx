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
    DollarSign,
    Layers,
    Star,
    Trash2,
    Plus,
    Settings2,
    ListChecks,
    Info
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { AdminPricingPlan } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { createPlan, updatePlan } from "@/actions/pricingActions"

const pricingSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    slug: z.string().min(2, "Slug must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    monthlyPrice: z.coerce.number().min(0, "Price must be positive"),
    yearlyPrice: z.coerce.number().min(0).optional(),
    features: z.array(z.string()).min(1, "At least one feature is required"),
    isPopular: z.boolean().default(false),
    isActive: z.boolean().default(true),
    sortOrder: z.coerce.number().min(1),
})

type PricingFormValues = z.infer<typeof pricingSchema>

interface PricingFormProps {
    initialData?: AdminPricingPlan
}

export function PricingForm({ initialData }: PricingFormProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [featureInput, setFeatureInput] = React.useState("")

    const form = useForm<PricingFormValues>({
        resolver: zodResolver(pricingSchema),
        defaultValues: initialData ? {
            name: initialData.name,
            slug: initialData.slug,
            description: initialData.description,
            monthlyPrice: initialData.monthlyPrice,
            yearlyPrice: initialData.yearlyPrice,
            features: initialData.features,
            isPopular: initialData.isPopular,
            isActive: initialData.isActive,
            sortOrder: initialData.sortOrder,
        } : {
            name: "",
            slug: "",
            description: "",
            monthlyPrice: 0,
            features: [],
            isPopular: false,
            isActive: true,
            sortOrder: 1,
        },
    })

    // Auto-slug generation
    const watchName = form.watch("name")
    React.useEffect(() => {
        if (!initialData && watchName) {
            form.setValue("slug", watchName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))
        }
    }, [watchName, form, initialData])

    // Savings calculation
    const monthly = form.watch("monthlyPrice")
    const yearly = form.watch("yearlyPrice")
    const savings = React.useMemo(() => {
        if (!monthly || !yearly || monthly === 0) return 0
        const totalMonthly = monthly * 12
        const saved = ((totalMonthly - yearly) / totalMonthly) * 100
        return Math.max(0, Math.round(saved))
    }, [monthly, yearly])

    const onSubmit = async (data: PricingFormValues) => {
        setIsSubmitting(true)
        const action = initialData ? updatePlan(initialData.id, data) : createPlan(data)
        const res = await action
        setIsSubmitting(false)
        if (res.success) {
            router.push("/admin/pricing")
            router.refresh()
        }
    }

    const addFeature = () => {
        if (featureInput.trim()) {
            const currentFeatures = form.getValues("features")
            form.setValue("features", [...currentFeatures, featureInput.trim()])
            setFeatureInput("")
        }
    }

    const removeFeature = (index: number) => {
        const currentFeatures = form.getValues("features")
        form.setValue("features", currentFeatures.filter((_, i) => i !== index))
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-20">
            <div className="flex items-center justify-between">
                <Link href="/admin/pricing" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Pricing
                </Link>
                <div className="flex gap-4">
                    <Button variant="outline" type="button" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="gap-2 px-8 shadow-xl shadow-primary/20">
                        <Save className="h-4 w-4" />
                        {isSubmitting ? "Syncing..." : initialData ? "Update Plan" : "Deploy Plan"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card className="bg-card/40 backdrop-blur-sm border-border">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Info className="h-5 w-5 text-primary" />
                                Basic Identification
                            </CardTitle>
                            <CardDescription>Define the core details of your pricing tier.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Display Name</Label>
                                    <Input id="name" {...form.register("name")} placeholder="e.g. Professional" />
                                    {form.formState.errors.name && <p className="text-xs text-red-500 font-medium">{form.formState.errors.name.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="slug">Unique Slug</Label>
                                    <Input id="slug" {...form.register("slug")} placeholder="e.g. pro-plan" className="font-mono text-xs" />
                                    {form.formState.errors.slug && <p className="text-xs text-red-500 font-medium">{form.formState.errors.slug.message}</p>}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Short Description</Label>
                                <textarea
                                    id="description"
                                    {...form.register("description")}
                                    className="w-full min-h-[100px] p-4 bg-background border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                                    placeholder="Witty one-liner about who this plan is for..."
                                />
                                {form.formState.errors.description && <p className="text-xs text-red-500 font-medium">{form.formState.errors.description.message}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/40 backdrop-blur-sm border-border overflow-hidden">
                        <div className="bg-primary/5 border-b border-border/50 p-6">
                            <div className="flex items-center gap-2 text-primary">
                                <DollarSign className="h-5 w-5" />
                                <h3 className="font-bold text-lg">Financial Configuration</h3>
                            </div>
                        </div>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Monthly Billing</Label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">$</span>
                                        <Input
                                            type="number"
                                            {...form.register("monthlyPrice")}
                                            className="pl-10 h-14 bg-background text-2xl font-black rounded-2xl"
                                        />
                                    </div>
                                    {form.formState.errors.monthlyPrice && <p className="text-xs text-red-500 font-medium">{form.formState.errors.monthlyPrice.message}</p>}
                                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Base price per month</p>
                                </div>

                                <div className="space-y-4 relative">
                                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex justify-between">
                                        Yearly Billing (Optional)
                                        {savings > 0 && <span className="text-emerald-500 text-[10px] font-black">-{savings}% SAVING</span>}
                                    </Label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">$</span>
                                        <Input
                                            type="number"
                                            {...form.register("yearlyPrice")}
                                            className="pl-10 h-14 bg-background text-2xl font-black rounded-2xl border-emerald-500/20"
                                        />
                                    </div>
                                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Total amount charged per year</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/40 backdrop-blur-sm border-border">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ListChecks className="h-5 w-5 text-primary" />
                                Plan Features
                            </CardTitle>
                            <CardDescription>Add the benefits included in this tier.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex gap-2">
                                <Input
                                    value={featureInput}
                                    onChange={(e) => setFeatureInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault()
                                            addFeature()
                                        }
                                    }}
                                    placeholder="Type a feature and press Enter..."
                                    className="rounded-xl h-11"
                                />
                                <Button type="button" onClick={addFeature} size="icon" className="h-11 w-11 shrink-0 rounded-xl">
                                    <Plus size={18} />
                                </Button>
                            </div>
                            <div className="space-y-3">
                                {form.watch("features").map((feature, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-primary/5 border border-primary/10 rounded-xl group animate-in fade-in slide-in-from-left-2 transition-all">
                                        <span className="text-sm font-medium">{feature}</span>
                                        <Button
                                            onClick={() => removeFeature(idx)}
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7 opacity-0 group-hover:opacity-100 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 transition-all rounded-lg"
                                        >
                                            <Trash2 size={14} />
                                        </Button>
                                    </div>
                                ))}
                                {form.formState.errors.features && <p className="text-xs text-red-500 font-medium">{form.formState.errors.features.message}</p>}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card className="bg-card/40 backdrop-blur-sm border-border">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Settings2 className="h-5 w-5 text-primary" />
                                Visibility & Order
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                <div className="space-y-0.5">
                                    <Label className="font-bold flex items-center gap-2">
                                        <Star size={12} className="text-amber-500 fill-current" />
                                        Highlight Plan
                                    </Label>
                                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Mark as most popular</p>
                                </div>
                                <Switch
                                    checked={form.watch("isPopular")}
                                    onCheckedChange={(val) => form.setValue("isPopular", val)}
                                />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                                <div className="space-y-0.5">
                                    <Label className="font-bold">Active Status</Label>
                                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Visible on public pricing</p>
                                </div>
                                <Switch
                                    checked={form.watch("isActive")}
                                    onCheckedChange={(val) => form.setValue("isActive", val)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="order">Display Order</Label>
                                <div className="flex items-center gap-4">
                                    <Input id="order" type="number" {...form.register("sortOrder")} className="h-12 text-center text-xl font-black w-24 rounded-xl" />
                                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest leading-relaxed">
                                        Lower numbers appear first (Free, Pro, etc.)
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="p-8 bg-card/40 border border-border rounded-[2.5rem] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <DollarSign className="h-24 w-24" />
                        </div>
                        <h4 className="font-bold text-sm mb-2 relative z-10 flex items-center gap-2">
                            <Star size={14} className="text-amber-500" />
                            Stripe Syncing
                        </h4>
                        <p className="text-[10px] text-muted-foreground leading-relaxed uppercase tracking-wider relative z-10 font-medium">
                    // TODO: This form currently updates the DevSuite metadata. In production, this should trigger a Stripe Product/Price update via webhook or live API call to ensure visual parity.
                        </p>
                    </div>
                </div>
            </div>
        </form>
    )
}
