"use client"

import { Button } from "@/components/ui/button"
import { Plus, Layers, Box, PlusCircle, FileText, Library } from "lucide-react"
import Link from "next/link"

const actions = [
    { label: "New Component", href: "/admin/components/new", icon: Layers, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "New Template", href: "/admin/templates/new", icon: Box, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "New Starter", href: "/admin/starters/new", icon: PlusCircle, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "New Document", href: "/admin/docs/new", icon: FileText, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "New Example", href: "/admin/examples/new", icon: Library, color: "text-rose-500", bg: "bg-rose-500/10" },
]

export function QuickActions() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {actions.map((action) => (
                <Button
                    key={action.href}
                    variant="outline"
                    className="h-auto py-4 px-4 flex flex-col items-center gap-3 bg-card/40 backdrop-blur-md border-border hover:border-primary/50 hover:bg-primary/5 group transition-all duration-300 rounded-2xl"
                    asChild
                >
                    <Link href={action.href}>
                        <div className={`h-12 w-12 rounded-2xl ${action.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                            <action.icon className={`h-6 w-6 ${action.color}`} />
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-xs font-bold tracking-tight">{action.label}</span>
                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Create Now</span>
                        </div>
                    </Link>
                </Button>
            ))}
        </div>
    )
}
