import { currentUser } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { users as usersTable, components, templates, starters } from "@/db/schema"
import { count } from "drizzle-orm"
import {
    MOCK_ACTIVITY
} from "@/lib/mock-data"
import { StatCard } from "@/components/admin/stat-card"
import { RecentActivity } from "@/components/admin/recent-activity"
import { QuickActions } from "@/components/admin/quick-actions"
import {
    Layers,
    Box,
    PlusCircle,
    FileText,
    Zap,
    TrendingUp,
    Activity as ActivityIcon
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

const iconMap: Record<string, any> = {
    "Components": Layers,
    "Templates": Box,
    "Starters": PlusCircle,
    "Docs": FileText,
}

export default async function AdminDashboard() {
    const user = await currentUser()

    // Fetch counts in parallel
    const [userCount, componentCount, templateCount, starterCount] = await Promise.all([
        db.select({ value: count() }).from(usersTable),
        db.select({ value: count() }).from(components),
        db.select({ value: count() }).from(templates),
        db.select({ value: count() }).from(starters),
    ])

    const totalUsers = userCount[0].value

    const stats = [
        { label: "Components", value: componentCount[0].value.toString(), trend: 12.5, published: componentCount[0].value, draft: 0 },
        { label: "Templates", value: templateCount[0].value.toString(), trend: 8.2, published: templateCount[0].value, draft: 0 },
        { label: "Starters", value: starterCount[0].value.toString(), trend: 5.1, published: starterCount[0].value, draft: 0 },
        { label: "Docs", value: "84", trend: 2.4, published: 80, draft: 4 },
    ]

    return (
        <div className="space-y-10 pb-10">
            {/* Welcome Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tighter flex items-center gap-3">
                        <span className="text-primary drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]">
                            Admin
                        </span>
                        Dashboard
                    </h1>
                    <p className="text-muted-foreground font-medium">
                        Welcome back, <span className="text-foreground font-bold">{user?.firstName || "Admin"}</span>. Here's what's happening with DevSuite today.
                    </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/10 rounded-2xl">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">System Live</span>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Zap size={14} className="text-primary fill-current" />
                    <h2 className="text-xs font-black uppercase tracking-[0.2em]">Quick Actions</h2>
                </div>
                <QuickActions />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <StatCard
                        key={stat.label}
                        label={stat.label}
                        value={stat.value}
                        trend={stat.trend}
                        description={`${stat.published} published / ${stat.draft} draft`}
                        icon={iconMap[stat.label] || Zap}
                    />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <ActivityIcon size={14} className="text-primary" />
                            <h2 className="text-xs font-black uppercase tracking-[0.2em]">Recent Activity</h2>
                        </div>
                        <span className="text-[10px] font-bold text-primary underline cursor-pointer uppercase tracking-widest">View All Logs</span>
                    </div>
                    <RecentActivity activities={MOCK_ACTIVITY} />
                </div>

                {/* Platform Health / Insights */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <TrendingUp size={14} className="text-primary" />
                        <h2 className="text-xs font-black uppercase tracking-[0.2em]">Platform Insights</h2>
                    </div>

                    <Card className="bg-gradient-to-br from-primary/10 via-background to-background border-primary/20 overflow-hidden relative group">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold">SEO Conversion</CardTitle>
                            <CardDescription className="text-[10px]">Starters & Templates Performance</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-end gap-2">
                                <span className="text-3xl font-black font-mono">24.8%</span>
                                <span className="text-emerald-500 text-[10px] font-bold mb-1">+4.2%</span>
                            </div>
                            <div className="mt-4 flex gap-1 h-12 items-end">
                                {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                                    <div key={i} className="flex-1 bg-primary/20 rounded-t-sm group-hover:bg-primary/40 transition-colors duration-500" style={{ height: `${h}%` }} />
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/40 backdrop-blur-md border-border">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold">Total Users</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex -space-x-2">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted overflow-hidden">
                                            <img src={`https://i.pravatar.cc/100?u=${i}`} alt="" />
                                        </div>
                                    ))}
                                    <div className="h-8 w-8 rounded-full border-2 border-background bg-primary flex items-center justify-center text-[10px] font-bold text-white">
                                        +{totalUsers > 4 ? totalUsers - 4 : 0}
                                    </div>
                                </div>
                                <span className="font-bold text-lg">{totalUsers.toLocaleString()}</span>
                            </div>
                            <p className="text-[10px] text-muted-foreground leading-relaxed uppercase tracking-wider font-medium">
                                Total registered users in the DevSuite ecosystem. Use the admin panel to manage roles and access.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
