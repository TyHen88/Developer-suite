"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Activity } from "@/lib/mock-data"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"

interface RecentActivityProps {
    activities: Activity[]
}

export function RecentActivity({ activities }: RecentActivityProps) {
    return (
        <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden">
            <Table aria-label="Recent platform activity">
                <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                        <TableHead className="font-bold">Activity</TableHead>
                        <TableHead className="font-bold">User</TableHead>
                        <TableHead className="font-bold">Status</TableHead>
                        <TableHead className="text-right font-bold">Time</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {activities.map((activity) => (
                        <TableRow key={activity.id} className="hover:bg-primary/5 transition-colors group">
                            <TableCell>
                                <div className="flex flex-col">
                                    <span className="font-bold text-sm tracking-tight">{activity.entity}</span>
                                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-black">
                                        {activity.action}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10 flex items-center justify-center text-[10px] font-bold">
                                        {activity.user.name.charAt(0)}
                                    </div>
                                    <span className="text-xs font-medium">{activity.user.name}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant="outline"
                                    className={cn(
                                        "text-[9px] font-black uppercase tracking-tighter px-1.5 py-0 h-4 border-none",
                                        activity.action === 'published' && "bg-emerald-500/10 text-emerald-500",
                                        activity.action === 'created' && "bg-blue-500/10 text-blue-500",
                                        activity.action === 'updated' && "bg-amber-500/10 text-amber-500",
                                        activity.action === 'deleted' && "bg-rose-500/10 text-rose-500",
                                    )}
                                >
                                    {activity.action}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right text-[10px] font-bold text-muted-foreground">
                                {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export function RecentActivitySkeleton() {
    return (
        <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden animate-pulse">
            <div className="h-12 bg-muted/30 w-full" />
            <div className="p-4 space-y-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                        <div className="space-y-2">
                            <div className="h-4 w-32 bg-muted rounded" />
                            <div className="h-2 w-16 bg-muted rounded" />
                        </div>
                        <div className="h-4 w-16 bg-muted rounded" />
                    </div>
                ))}
            </div>
        </div>
    )
}
