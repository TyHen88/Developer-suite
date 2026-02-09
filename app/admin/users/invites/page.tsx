import { InviteForm } from "@/components/admin/InviteForm"
import { InviteTable } from "@/components/admin/InviteTable"
import { Button } from "@/components/ui/button"
import { ArrowLeft, UserPlus, Users } from "lucide-react"
import Link from "next/link"

export default function InvitesPage() {
    return (
        <div className="space-y-10 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Link href="/admin/users" className="text-muted-foreground hover:text-primary transition-colors">
                            <ArrowLeft size={16} />
                        </Link>
                        <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">User Management / Invites</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter">Invite Colleagues</h1>
                    <p className="text-muted-foreground font-medium">Expand your team by sending secure invitation links.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="rounded-xl h-10 gap-2 border-border/50 bg-card/40 backdrop-blur-md" asChild>
                        <Link href="/admin/users">
                            <Users size={14} />
                            View All Users
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="lg:col-span-2 space-y-6">
                    <InviteForm />

                    <div className="p-8 bg-primary/5 border border-primary/10 rounded-[2.5rem] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <UserPlus className="h-24 w-24" />
                        </div>
                        <h4 className="font-bold text-sm mb-2 relative z-10">Scale Your Operations</h4>
                        <p className="text-[10px] text-muted-foreground leading-relaxed uppercase tracking-wider relative z-10 font-medium">
                            Invitations allow you to bypass manual account creation. Admins can join instantly with elevated permissions, while users follow the standard onboarding flow.
                        </p>
                    </div>
                </div>
                <div className="lg:col-span-3 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Pending Invitations</h2>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Auto-refresh Active</span>
                    </div>
                    <InviteTable />
                </div>
            </div>
        </div>
    )
}
