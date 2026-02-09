"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
    label: string
    value: string | number
    description?: string
    trend?: number
    icon: LucideIcon
}

export function StatCard({ label, value, description, trend, icon: Icon }: StatCardProps) {
    return (
        <Card className="bg-card/40 backdrop-blur-md border-border overflow-hidden relative group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500" aria-hidden="true">
                <Icon size={80} />
            </div>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    {label}
                </CardTitle>
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden="true">
                    <Icon className="h-4 w-4 text-primary" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-black tracking-tight">{value}</div>
                <div className="flex items-center mt-2">
                    {trend !== undefined && (
                        <div
                            className={cn(
                                "flex items-center text-xs font-bold mr-2 px-1.5 py-0.5 rounded-md",
                                trend >= 0 ? "text-emerald-500 bg-emerald-500/10" : "text-rose-500 bg-rose-500/10"
                            )}
                            aria-label={`${Math.abs(trend)}% ${trend >= 0 ? "increase" : "decrease"}`}
                        >
                            {trend >= 0 ? <ArrowUpRight className="h-3 w-3 mr-0.5" aria-hidden="true" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" aria-hidden="true" />}
                            {Math.abs(trend)}%
                        </div>
                    )}
                    {description && (
                        <p className="text-xs text-muted-foreground font-medium">{description}</p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export function StatCardSkeleton() {
    return (
        <Card className="bg-card/40 backdrop-blur-md border-border animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <div className="h-4 w-24 bg-muted rounded" />
                <div className="h-8 w-8 bg-muted rounded-lg" />
            </CardHeader>
            <CardContent>
                <div className="h-8 w-16 bg-muted rounded mb-2" />
                <div className="h-4 w-32 bg-muted rounded" />
            </CardContent>
        </Card>
    )
}
