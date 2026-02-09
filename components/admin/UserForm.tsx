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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Save,
    ArrowLeft,
    Shield,
    Settings2,
    Ban,
    User,
    History,
    FileText,
    BadgeAlert
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { AdminUser } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { updateRole, toggleSuspend } from "@/actions/userActions"

const userSchema = z.object({
    role: z.enum(["admin", "user"]),
    status: z.enum(["active", "suspended"]),
    notes: z.string().optional(),
})

type UserFormValues = z.infer<typeof userSchema>

interface UserFormProps {
    user: AdminUser
}

export function UserForm({ user }: UserFormProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const form = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            role: user.role,
            status: user.status,
            notes: user.notes || "",
        },
    })

    const onSubmit = async (data: UserFormValues) => {
        setIsSubmitting(true)
        try {
            if (data.role !== user.role) {
                await updateRole(user.id, data.role)
            }
            if (data.status !== user.status) {
                await toggleSuspend(user.id, user.status)
            }
            // In real app, update notes in DB too
            await new Promise(resolve => setTimeout(resolve, 500))
            toast.success("User profile updated")
            router.refresh()
            router.push("/admin/users")
        } catch (error) {
            toast.error("Failed to update user")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-10">
            {/* Header Actions */}
            <div className="flex items-center justify-between">
                <Link href="/admin/users" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Users
                </Link>
                <div className="flex gap-4">
                    <Button variant="outline" type="button" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="gap-2 px-6 shadow-xl shadow-primary/20">
                        <Save className="h-4 w-4" />
                        {isSubmitting ? "Updating..." : "Update Permission"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* User Profile Card */}
                    <Card className="bg-card/40 backdrop-blur-sm border-border overflow-hidden">
                        <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/5 to-background border-b border-border/50" />
                        <CardContent className="-mt-12 pb-8">
                            <div className="flex flex-col md:flex-row items-end gap-6 mb-8">
                                <Avatar className="h-24 w-24 border-4 border-background shadow-2xl ring-1 ring-border/50">
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback className="bg-primary/5 text-primary text-2xl font-black">
                                        {user.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 pb-2">
                                    <h2 className="text-2xl font-black tracking-tight">{user.name}</h2>
                                    <p className="text-muted-foreground font-medium text-sm">{user.email}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-border/50">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Shield className="h-4 w-4 text-primary" />
                                        <span className="text-xs font-black uppercase tracking-widest">Administrative Role</span>
                                    </div>
                                    <div className="flex gap-2 p-1 bg-muted rounded-2xl w-fit">
                                        {["user", "admin"].map((r) => (
                                            <button
                                                key={r}
                                                type="button"
                                                onClick={() => form.setValue("role", r as any)}
                                                className={cn(
                                                    "px-6 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-wider",
                                                    form.watch("role") === r
                                                        ? "bg-background shadow-lg text-foreground"
                                                        : "text-muted-foreground hover:text-foreground"
                                                )}
                                            >
                                                {r}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <BadgeAlert className="h-4 w-4 text-primary" />
                                        <span className="text-xs font-black uppercase tracking-widest">Account Status</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                        <div className="flex-1">
                                            <Label htmlFor="status" className="font-bold block">Access Active</Label>
                                            <span className="text-[10px] text-muted-foreground uppercase font-black">Control platform access</span>
                                        </div>
                                        <Switch
                                            id="status"
                                            checked={form.watch("status") === "active"}
                                            onCheckedChange={(val) => form.setValue("status", val ? "active" : "suspended")}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Internal Notes */}
                    <Card className="bg-card/40 backdrop-blur-sm border-border">
                        <CardHeader>
                            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                <FileText className="h-4 w-4 text-primary" />
                                Administrative Notes
                            </CardTitle>
                            <CardDescription className="text-xs">Internal notes regarding this user account. Visible only to admins.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <textarea
                                {...form.register("notes")}
                                placeholder="Enter moderation details, support history, or compliance notes..."
                                className="w-full min-h-[150px] p-4 bg-background/50 border border-border rounded-2xl text-sm focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                            />
                            {form.formState.errors.notes && <p className="text-xs text-red-500 mt-2">{form.formState.errors.notes.message}</p>}
                        </CardContent>
                    </Card>
                </div>

                {/* Account Info Sidebar */}
                <div className="space-y-8">
                    <Card className="bg-card/40 backdrop-blur-sm border-border">
                        <CardHeader>
                            <CardTitle className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 text-muted-foreground">
                                <History size={14} />
                                Metadata
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-1">
                                <span className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">User ID</span>
                                <p className="font-mono text-[10px] bg-muted/50 p-2 rounded-lg border border-border/50 truncate">
                                    {user.id}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <span className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Created</span>
                                    <p className="text-xs font-bold">
                                        {format(new Date(user.createdAt), "MMM d, yyyy")}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Last Sign-In</span>
                                    <p className="text-xs font-bold">
                                        {format(new Date(user.lastSignInAt), "MMM d, yyyy")}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="p-8 bg-card/40 border border-border rounded-[2.5rem] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Shield className="h-24 w-24" />
                        </div>
                        <h4 className="font-bold text-sm mb-2 relative z-10 flex items-center gap-2">
                            <User size={14} className="text-primary" />
                            Clerk Sync
                        </h4>
                        <p className="text-[10px] text-muted-foreground leading-relaxed uppercase tracking-wider relative z-10 font-medium">
                            Core identity data is managed by Clerk. Role changes reflect in publicMetadata for frontend checks. Suspension bans the user at the auth level.
                        </p>
                    </div>
                </div>
            </div>
        </form>
    )
}
