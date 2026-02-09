"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card"
import {
    Send,
    X,
    Mail,
    UserPlus,
    MessageSquare,
    Copy,
    Check
} from "lucide-react"
import { createInvite } from "@/actions/inviteActions"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const inviteSchema = z.object({
    emails: z.array(z.string().email("Invalid email")).min(1, "Enter at least one email"),
    role: z.enum(["admin", "user"]),
    message: z.string().optional(),
})

type InviteFormValues = z.infer<typeof inviteSchema>

export function InviteForm() {
    const [emails, setEmails] = React.useState<string[]>([])
    const [inputValue, setInputValue] = React.useState("")
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [inviteLink, setInviteLink] = React.useState<string | null>(null)
    const [copied, setCopied] = React.useState(false)

    const form = useForm<InviteFormValues>({
        resolver: zodResolver(inviteSchema),
        defaultValues: {
            role: "user",
            emails: [],
        },
    })

    React.useEffect(() => {
        form.setValue("emails", emails)
    }, [emails, form])

    const addEmail = () => {
        const email = inputValue.trim()
        if (email && !emails.includes(email) && z.string().email().safeParse(email).success) {
            setEmails([...emails, email])
            setInputValue("")
        }
    }

    const removeEmail = (email: string) => {
        setEmails(emails.filter(e => e !== email))
    }

    const copyToClipboard = () => {
        if (inviteLink) {
            navigator.clipboard.writeText(inviteLink)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
            toast.success("Link copied to clipboard")
        }
    }

    const onSubmit = async (data: InviteFormValues) => {
        setIsSubmitting(true)
        const res = await createInvite(data)
        setIsSubmitting(false)
        if (res.success && res.inviteLink) {
            setInviteLink(res.inviteLink)
            setEmails([])
            form.reset()
        }
    }

    return (
        <Card className="bg-card/40 backdrop-blur-md border-border overflow-hidden">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5 text-primary" />
                    Send Invitations
                </CardTitle>
                <CardDescription>Invite new team members to DevSuite. They will receive an email with a secure join link.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label>Recipients</Label>
                        <div className="flex flex-wrap gap-2 p-2 min-h-[44px] bg-background/50 border border-border rounded-xl focus-within:ring-2 focus-within:ring-primary/50 transition-all">
                            {emails.map(email => (
                                <div key={email} className="flex items-center gap-1.5 bg-primary/10 text-primary px-2 py-1 rounded-lg text-xs font-bold ring-1 ring-primary/20">
                                    {email}
                                    <button type="button" onClick={() => removeEmail(email)} className="hover:text-primary/70">
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                            <input
                                type="text"
                                placeholder={emails.length === 0 ? "Enter email addresses..." : ""}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault()
                                        addEmail()
                                    }
                                }}
                                onBlur={addEmail}
                                className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground min-w-[120px]"
                            />
                        </div>
                        {form.formState.errors.emails && <p className="text-xs text-red-500 font-medium">{form.formState.errors.emails.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Default Role</Label>
                            <div className="flex gap-2 p-1 bg-muted rounded-2xl w-full">
                                {["user", "admin"].map((r) => (
                                    <button
                                        key={r}
                                        type="button"
                                        onClick={() => form.setValue("role", r as any)}
                                        className={cn(
                                            "flex-1 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-wider",
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
                        <div className="space-y-2">
                            <Label htmlFor="message">Personal Message (Optional)</Label>
                            <Input
                                id="message"
                                {...form.register("message")}
                                placeholder="Welcome to the team!"
                                className="rounded-xl h-10"
                            />
                        </div>
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full rounded-xl h-12 bg-primary shadow-xl shadow-primary/20 gap-2 font-bold tracking-tight">
                        <Send size={16} />
                        {isSubmitting ? "Generating Links..." : "Send Invitations"}
                    </Button>
                </form>

                {inviteLink && (
                    <div className="mt-8 p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/20 animate-in fade-in slide-in-from-bottom-2">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Global Invite Link Generated</span>
                            <Button variant="ghost" size="sm" onClick={() => setInviteLink(null)} className="h-6 w-6 p-0 rounded-full">
                                <X size={12} />
                            </Button>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex-1 bg-background/50 border border-emerald-500/10 px-3 py-2 rounded-xl text-xs truncate text-muted-foreground font-mono">
                                {inviteLink}
                            </div>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="bg-background shrink-0 border border-emerald-500/10 hover:bg-emerald-500/10 hover:text-emerald-500"
                                onClick={copyToClipboard}
                            >
                                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                            </Button>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-3 leading-relaxed uppercase tracking-wider font-medium text-center">
                            Share this link with anyone you want to join. It expires in <span className="text-emerald-500 font-bold">7 days</span>.
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
