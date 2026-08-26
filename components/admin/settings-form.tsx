"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import {
    Save,
    RotateCcw,
    Globe,
    ShieldCheck,
    Palette,
    Bell,
    Lock,
    SlidersHorizontal,
    Zap,
    ImageIcon,
    Eye
} from "lucide-react"
import { saveSettings, revertToDefaults } from "@/actions/settingsActions"
import { cn } from "@/lib/utils"
import { ThemePreview } from "@/components/admin/ThemePreview"
import { toast } from "sonner"

const settingsSchema = z.object({
    // General
    siteName: z.string().min(2, "Site name must be at least 2 characters"),
    siteDescription: z.string().min(10, "Description must be at least 10 characters"),
    logoUrl: z.string().optional(),

    // Auth
    clerkPublishableKey: z.string(),
    allowedDomains: z.string().optional(),

    // Appearance
    primaryColor: z.string(),
    enableGlassmorphism: z.boolean().default(true),

    // Notifications
    emailNotifications: z.boolean().default(true),
    slackWebhookUrl: z.string().optional(),

    // Security
    rateLimit: z.coerce.number().min(1),
    enforce2FA: z.boolean().default(false),

    // Advanced
    maintenanceMode: z.boolean().default(false),
    analyticsId: z.string().optional(),
})

type SettingsFormValues = z.infer<typeof settingsSchema>

const defaultValues: SettingsFormValues = {
    siteName: "Bayon Developer",
    siteDescription: "Modern Developer Infrastructure & Architectural Ecosystem.",
    logoUrl: "",
    clerkPublishableKey: "pk_test_...",
    allowedDomains: "bayondeveloper.io, google.com",
    primaryColor: "#06b6d4",
    enableGlassmorphism: true,
    emailNotifications: true,
    slackWebhookUrl: "",
    rateLimit: 100,
    enforce2FA: false,
    maintenanceMode: false,
    analyticsId: "G-XXXXXXXXXX",
}

export function SettingsForm() {
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(settingsSchema),
        defaultValues,
    })

    // Live preview watch
    const watchSiteName = form.watch("siteName")

    const onSubmit = async (data: SettingsFormValues) => {
        setIsSubmitting(true)
        await saveSettings(data)
        setIsSubmitting(false)
    }

    const handleRevert = async () => {
        if (confirm("Are you sure you want to revert all changes to default values?")) {
            await revertToDefaults()
            form.reset(defaultValues)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter">Site Settings</h1>
                    <p className="text-muted-foreground font-medium">Configure global parameters and platform behavior.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        type="button"
                        onClick={handleRevert}
                        className="rounded-xl h-11 px-6 border-border/50 bg-card/40 backdrop-blur-md gap-2"
                    >
                        <RotateCcw size={16} />
                        Revert Defaults
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-xl h-11 px-8 bg-primary shadow-xl shadow-primary/20 gap-2"
                    >
                        <Save size={16} />
                        {isSubmitting ? "Syncing..." : "Save Changes"}
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="bg-card/40 backdrop-blur-xl border border-border p-1 rounded-2xl mb-8 h-14">
                    <TabsTrigger value="general" className="rounded-xl px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                        <Globe size={14} className="mr-2" /> General
                    </TabsTrigger>
                    <TabsTrigger value="auth" className="rounded-xl px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                        <ShieldCheck size={14} className="mr-2" /> Authentication
                    </TabsTrigger>
                    <TabsTrigger value="appearance" className="rounded-xl px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                        <Palette size={14} className="mr-2" /> Appearance
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="rounded-xl px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                        <Bell size={14} className="mr-2" /> Notifications
                    </TabsTrigger>
                    <TabsTrigger value="security" className="rounded-xl px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                        <Lock size={14} className="mr-2" /> Security
                    </TabsTrigger>
                    <TabsTrigger value="advanced" className="rounded-xl px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                        <SlidersHorizontal size={14} className="mr-2" /> Advanced
                    </TabsTrigger>
                </TabsList>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <TabsContent value="general" className="mt-0 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Card className="bg-card/40 backdrop-blur-md border-border">
                                <CardHeader>
                                    <CardTitle>Site Identity</CardTitle>
                                    <CardDescription>Global branding and organizational information.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="siteName">Official Site Name</Label>
                                        <Input id="siteName" {...form.register("siteName")} />
                                        {form.formState.errors.siteName && <p className="text-xs text-red-500">{form.formState.errors.siteName.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="siteDescription">SEO Description</Label>
                                        <textarea
                                            id="siteDescription"
                                            {...form.register("siteDescription")}
                                            className="w-full min-h-[100px] p-3 rounded-xl bg-background border border-border text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                                        />
                                        {form.formState.errors.siteDescription && <p className="text-xs text-red-500">{form.formState.errors.siteDescription.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Site Logo</Label>
                                        <div className="p-8 border-2 border-dashed border-border rounded-3xl bg-primary/5 text-center group cursor-pointer hover:border-primary/50 transition-all">
                                            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                                <ImageIcon className="text-primary" size={20} />
                                            </div>
                                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Click to upload brand asset</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="auth" className="mt-0 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Card className="bg-card/40 backdrop-blur-md border-border">
                                <CardHeader>
                                    <CardTitle>Clerk Configuration</CardTitle>
                                    <CardDescription>Manage authentication providers and sign-up policies.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="clerkPk">Publishable Key</Label>
                                        <Input id="clerkPk" {...form.register("clerkPublishableKey")} type="password" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="domains">Whitelist Domains</Label>
                                        <Input id="domains" {...form.register("allowedDomains")} placeholder="comma separated list..." />
                                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-2">Restrict registration to corporate domains</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="appearance" className="mt-0 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Card className="bg-card/40 backdrop-blur-md border-border">
                                <CardHeader>
                                    <CardTitle>Theme & Presets</CardTitle>
                                    <CardDescription>Fine-tune the visual language of the entire platform.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-8">
                                    <div className="space-y-4">
                                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Select Global Theme</Label>
                                        <ThemePreview />
                                    </div>

                                    <div className="space-y-4 pt-4 border-t border-border/50">
                                        <Label>Brand Primary Color</Label>
                                        <div className="flex gap-4 items-center">
                                            <div
                                                className="h-10 w-20 rounded-xl border border-border shadow-inner transition-all duration-500"
                                                style={{ backgroundColor: form.watch("primaryColor") }}
                                            />
                                            <Input {...form.register("primaryColor")} className="flex-1 font-mono" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center justify-between p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                            <div className="space-y-0.5">
                                                <Label className="font-bold">Glassmorphism</Label>
                                                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Translucent layers</p>
                                            </div>
                                            <Switch
                                                checked={form.watch("enableGlassmorphism")}
                                                onCheckedChange={(val) => form.setValue("enableGlassmorphism", val)}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between p-4 bg-rose-500/5 rounded-2xl border border-rose-500/10">
                                            <div className="space-y-0.5">
                                                <Label className="font-bold text-rose-500">Force Dark Mode</Label>
                                                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Override user setting</p>
                                            </div>
                                            <Switch
                                                checked={false}
                                                onCheckedChange={(val) => toast.info(`Dark mode ${val ? 'forced' : 'released'}`)}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="notifications" className="mt-0 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Card className="bg-card/40 backdrop-blur-md border-border">
                                <CardHeader>
                                    <CardTitle>External Channels</CardTitle>
                                    <CardDescription>Broadcast platform events to external services.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center justify-between p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                        <div className="space-y-0.5">
                                            <Label className="font-bold">Transactional Emails</Label>
                                            <p className="text-[10px] text-muted-foreground uppercase font-black">Enable Resend integration</p>
                                        </div>
                                        <Switch
                                            checked={form.watch("emailNotifications")}
                                            onCheckedChange={(val) => form.setValue("emailNotifications", val)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="slack">Slack Webhook URL</Label>
                                        <Input id="slack" {...form.register("slackWebhookUrl")} placeholder="https://hooks.slack.com/services/..." />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="security" className="mt-0 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Card className="bg-card/40 backdrop-blur-md border-border">
                                <CardHeader>
                                    <CardTitle>Shield & Hardening</CardTitle>
                                    <CardDescription>Adjust security parameters for DDoS and brute force protection.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="rate">API Rate Limit</Label>
                                        <div className="flex gap-2 items-center">
                                            <Input id="rate" type="number" {...form.register("rateLimit")} className="w-32" />
                                            <span className="text-xs font-bold text-muted-foreground uppercase">Requests / minute</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-rose-500/5 rounded-2xl border border-rose-500/10">
                                        <div className="space-y-0.5">
                                            <Label className="font-bold text-rose-500">Enforce 2FA</Label>
                                            <p className="text-[10px] text-muted-foreground uppercase font-black">Require MFA for all admin accounts</p>
                                        </div>
                                        <Switch
                                            checked={form.watch("enforce2FA")}
                                            onCheckedChange={(val) => form.setValue("enforce2FA", val)}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="advanced" className="mt-0 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Card className="bg-card/40 backdrop-blur-md border-border">
                                <CardHeader>
                                    <CardTitle>System & DevOps</CardTitle>
                                    <CardDescription>Deep system configurations and environmental variables.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center justify-between p-4 bg-amber-500/5 rounded-2xl border border-amber-500/10">
                                        <div className="space-y-0.5">
                                            <Label className="font-bold text-amber-500">Maintenance Mode</Label>
                                            <p className="text-[10px] text-muted-foreground uppercase font-black">Disable public access for updates</p>
                                        </div>
                                        <Switch
                                            checked={form.watch("maintenanceMode")}
                                            onCheckedChange={(val) => form.setValue("maintenanceMode", val)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="ga">GA Analytics ID</Label>
                                        <Input id="ga" {...form.register("analyticsId")} />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </div>

                    <div className="space-y-8">
                        {/* Live Preview Card */}
                        <Card className="bg-gradient-to-br from-primary/20 via-background to-background border-primary/30 overflow-hidden sticky top-8">
                            <CardHeader>
                                <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                                    <Eye size={14} />
                                    Site Preview
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="p-6 rounded-3xl bg-background/50 border border-border shadow-2xl">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                                            <Zap size={18} className="text-white fill-current" />
                                        </div>
                                        <span className="font-bold tracking-tight text-lg">{watchSiteName || "Bayon Developer"}</span>
                                    </div>
                                    <div className="h-4 w-3/4 bg-muted rounded-full mb-2" />
                                    <div className="h-4 w-1/2 bg-muted rounded-full" />
                                </div>
                                <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                    <p className="text-[10px] text-muted-foreground leading-relaxed uppercase tracking-wider font-medium">
                                        Changes made here reflect instantly across all frontend deployments and SEO crawlers once saved.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="p-8 bg-card/40 border border-border rounded-[2.5rem] flex flex-col items-center text-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <SlidersHorizontal className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Automated Backups</h4>
                                <p className="text-[10px] text-muted-foreground mt-1">
                                    System state is backed up every 6 hours. Configuration changes are logged in the audit trail.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Tabs>
        </form>
    )
}
