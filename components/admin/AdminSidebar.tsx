"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Layers,
    Box,
    PlusCircle,
    FileText,
    Library,
    Users,
    Settings,
    DollarSign,
    ChevronLeft,
    Menu,
    X,
    Zap,
    ExternalLink
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Components", href: "/admin/components", icon: Layers },
    { label: "Templates", href: "/admin/templates", icon: Box },
    { label: "Starters", href: "/admin/starters", icon: PlusCircle },
    { label: "Docs", href: "/admin/docs", icon: FileText },
    { label: "Examples", href: "/admin/examples", icon: Library },
    { label: "Settings", href: "/admin/settings", icon: Settings },
    { label: "Pricing", href: "/admin/pricing", icon: DollarSign },
]

export function AdminSidebar() {
    const pathname = usePathname()
    const [isCollapsed, setIsCollapsed] = React.useState(false)
    const [isMobileOpen, setIsMobileOpen] = React.useState(false)

    return (
        <>
            {/* Mobile Toggle Button */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="bg-card shadow-xl border-border h-10 w-10 rounded-xl"
                    aria-label={isMobileOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMobileOpen}
                >
                    {isMobileOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
                </Button>
            </div>

            {/* Overlay for mobile */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsMobileOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-40 lg:relative flex flex-col bg-card/30 backdrop-blur-2xl border-r border-border transition-all duration-500 ease-in-out",
                    isCollapsed ? "w-20" : "w-72",
                    isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
                aria-label="Sidebar Navigation"
            >
                {/* Header/Logo Section */}
                <div className="h-20 flex items-center justify-between px-6 border-b border-border/50">
                    <div className={cn("flex items-center gap-3 transition-all duration-300", isCollapsed ? "scale-0 w-0 opacity-0" : "scale-100 w-auto opacity-100")}>
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20" aria-hidden="true">
                            <span className="font-black text-white text-base">B</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-base tracking-tight leading-none">Bayon <span className="text-cyan-400">Dev</span></span>
                            <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">Admin Console</span>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="hidden lg:flex shrink-0 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-colors"
                        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        <ChevronLeft size={18} className={cn("transition-transform duration-500", isCollapsed && "rotate-180")} aria-hidden="true" />
                    </Button>
                </div>

                {/* View Site Button */}
                <div className="px-4 py-4 border-b border-border/50 group relative">
                    <Button
                        variant="outline"
                        asChild
                        className={cn(
                            "w-full rounded-xl bg-primary/5 border-primary/10 hover:bg-primary/10 transition-all gap-3 h-11",
                            isCollapsed ? "px-0 justify-center" : "px-4 justify-start"
                        )}
                        aria-label={isCollapsed ? "View Site" : undefined}
                    >
                        <Link href="/">
                            <ExternalLink size={18} className="text-primary shrink-0" aria-hidden="true" />
                            {!isCollapsed && <span className="text-xs font-bold uppercase tracking-widest text-primary">View Site</span>}
                        </Link>
                    </Button>
                    {isCollapsed && (
                        <div className="absolute left-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none bg-popover text-popover-foreground px-4 py-2 rounded-xl text-xs font-bold border border-border shadow-2xl transition-all duration-300 z-50 whitespace-nowrap translate-x-4 group-hover:translate-x-0">
                            View Site
                        </div>
                    )}
                </div>

                {/* Navigation Section */}
                <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2 no-scrollbar">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileOpen(false)}
                                className={cn(
                                    "flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group relative overflow-hidden",
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 font-bold"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                )}
                            >
                                {/* Active Indicator Glow */}
                                {isActive && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 toward-transparent opacity-50" />
                                )}

                                <item.icon
                                    size={20}
                                    className={cn(
                                        "shrink-0 transition-all duration-300",
                                        isActive ? "scale-110" : "group-hover:text-primary group-hover:scale-110"
                                    )}
                                />

                                {!isCollapsed && (
                                    <span className="text-sm tracking-wide transition-opacity duration-300">
                                        {item.label}
                                    </span>
                                )}

                                {/* Tooltip for collapsed state */}
                                {isCollapsed && (
                                    <div className="absolute left-16 opacity-0 group-hover:opacity-100 pointer-events-none bg-popover text-popover-foreground px-4 py-2 rounded-xl text-xs font-bold border border-border shadow-2xl transition-all duration-300 z-50 whitespace-nowrap translate-x-4 group-hover:translate-x-0">
                                        {item.label}
                                    </div>
                                )}
                            </Link>
                        )
                    })}
                </nav>

                {/* Footer/Account Section */}
                <div className="p-4 border-t border-border/50">
                    <div className={cn(
                        "flex items-center gap-4 p-3 rounded-2xl bg-muted/30 transition-all duration-300",
                        isCollapsed ? "justify-center" : ""
                    )}>
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shrink-0 shadow-lg ring-2 ring-background">
                            <span className="text-sm font-black text-white">AD</span>
                        </div>
                        {!isCollapsed && (
                            <div className="flex flex-col min-w-0">
                                <span className="text-xs font-bold truncate">Admin User</span>
                                <span className="text-[10px] text-muted-foreground truncate">admin@bayondeveloper.io</span>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </>
    )
}
