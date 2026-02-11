import { db } from "@/lib/db"
import { users as usersTable } from "@/db/schema"
import { desc } from "drizzle-orm"
import { UserTable } from "@/components/admin/UserTable"
import { Button } from "@/components/ui/button"
import { Download, ArrowUpRight, UserPlus, RefreshCw } from "lucide-react"
import Link from "next/link"
import { syncClerkUsers } from "@/actions/syncActions"

export default async function AdminUsersPage() {
    const users = await db.query.users.findMany({
        orderBy: [desc(usersTable.createdAt)]
    })
    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter">User Management</h1>
                    <p className="text-muted-foreground font-medium">Control access, roles, and moderation for the DevSuite community.</p>
                </div>
                <div className="flex items-center gap-3">
                    <form action={async () => { "use server"; await syncClerkUsers(); }}>
                        <Button variant="outline" size="sm" className="rounded-xl h-10 gap-2 border-border/50 bg-card/40 backdrop-blur-md">
                            <RefreshCw size={14} />
                            Sync Clerk
                        </Button>
                    </form>
                    <Button variant="outline" size="sm" className="rounded-xl h-10 gap-2 border-border/50 bg-card/40 backdrop-blur-md">
                        <Download size={14} />
                        Export Data
                    </Button>
                    <Button size="sm" className="rounded-xl h-10 gap-2 bg-primary shadow-lg shadow-primary/20" asChild>
                        <Link href="/admin/users/invites">
                            <UserPlus size={14} />
                            Invite Users
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Quick Stats Overlay */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-[2rem] bg-card/40 border border-border backdrop-blur-xl flex items-center justify-between group cursor-pointer hover:border-primary/50 transition-all">
                    <div className="space-y-1">
                        <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Total Users</span>
                        <p className="text-2xl font-black tracking-tighter">1,284</p>
                    </div>
                    <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <ArrowUpRight size={20} />
                    </div>
                </div>
                <div className="p-6 rounded-[2rem] bg-card/40 border border-border backdrop-blur-xl flex items-center justify-between group cursor-pointer hover:border-emerald-500/50 transition-all">
                    <div className="space-y-1">
                        <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Active Now</span>
                        <p className="text-2xl font-black tracking-tighter">42</p>
                    </div>
                    <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                </div>
                <div className="p-6 rounded-[2rem] bg-card/40 border border-border backdrop-blur-xl flex items-center justify-between group cursor-pointer hover:border-rose-500/50 transition-all">
                    <div className="space-y-1">
                        <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Banned</span>
                        <p className="text-2xl font-black tracking-tighter">12</p>
                    </div>
                    <div className="h-10 w-10 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform font-black text-xs">
                        1.2%
                    </div>
                </div>
            </div>

            <UserTable initialUsers={users} />
        </div>
    )
}
