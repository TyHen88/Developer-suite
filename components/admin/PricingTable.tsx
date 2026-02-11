"use client"

import * as React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    MoreHorizontal,
    Edit,
    Trash2,
    Archive,
    CheckCircle2,
    XCircle,
    Star,
    DollarSign,
    Layers,
    Search,
    Filter
} from "lucide-react"
import { AdminPricingPlan, MOCK_ADMIN_PRICING_PLANS } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import Link from "next/link"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { togglePlanActive, deletePlan } from "@/actions/pricingActions"

export function PricingTable({ initialPlans }: { initialPlans: any[] }) {
    const [plans, setPlans] = React.useState<any[]>(initialPlans)
    const [searchQuery, setSearchQuery] = React.useState("")
    const [statusFilter, setStatusFilter] = React.useState<string>("all")

    const filteredPlans = plans.filter(p =>
        (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (statusFilter === "all" || (statusFilter === "active" ? p.isActive : !p.isActive))
    ).sort((a, b) => a.sortOrder - b.sortOrder)

    const handleToggleActive = async (id: string, current: boolean) => {
        const res = await togglePlanActive(id, current)
        if (res.success) {
            setPlans(prev => prev.map(p => p.id === id ? { ...p, isActive: res.newStatus } : p))
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this plan? This cannot be undone.")) {
            const res = await deletePlan(id)
            if (res.success) {
                setPlans(prev => prev.filter(p => p.id !== id))
            }
        }
    }

    return (
        <div className="space-y-6">
            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-card/40 backdrop-blur-md p-4 rounded-2xl border border-border">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search plans..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 h-10 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter size={14} className="text-muted-foreground" />
                    <select
                        className="bg-background/50 border border-border rounded-xl h-10 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none min-w-[120px]"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active Only</option>
                        <option value="archived">Archived Only</option>
                    </select>
                </div>
            </div>

            <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden shadow-xl">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/30 hover:bg-muted/30">
                            <TableHead className="w-[200px]">Plan Name</TableHead>
                            <TableHead>Price (Monthly)</TableHead>
                            <TableHead>Price (Yearly)</TableHead>
                            <TableHead>Features</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPlans.length > 0 ? (
                            filteredPlans.map((plan) => (
                                <TableRow key={plan.id} className="hover:bg-primary/5 transition-colors group">
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-sm tracking-tight">{plan.name}</span>
                                                {plan.isPopular && (
                                                    <Badge className="bg-amber-500/10 text-amber-500 border-none text-[9px] font-black uppercase tracking-widest h-4 px-1.5">
                                                        <Star size={10} className="mr-1 fill-current" /> Popular
                                                    </Badge>
                                                )}
                                            </div>
                                            <span className="text-[10px] text-muted-foreground truncate max-w-[180px]">{plan.description}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-mono text-sm font-bold flex items-center">
                                            <DollarSign size={14} className="text-muted-foreground" />
                                            {plan.monthlyPrice}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {plan.yearlyPrice ? (
                                            <div className="flex flex-col">
                                                <div className="font-mono text-sm font-bold flex items-center">
                                                    <DollarSign size={14} className="text-muted-foreground" />
                                                    {plan.yearlyPrice}
                                                </div>
                                                {plan.savingsPercent && (
                                                    <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-tighter">Save {plan.savingsPercent}%</span>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-muted-foreground opacity-50 italic text-xs">N/A</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                                            <Layers size={14} />
                                            {plan.features.length} features
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {plan.isActive ? (
                                                <div className="flex items-center gap-1.5 text-emerald-500">
                                                    <CheckCircle2 size={14} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">Active</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1.5 text-muted-foreground opacity-60">
                                                    <Archive size={14} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">Archived</span>
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/5" aria-label={`Actions for ${plan.name}`}>
                                                    <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48 bg-card/95 backdrop-blur-xl border-border rounded-2xl shadow-2xl p-2">
                                                <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground font-black px-2 pb-2">Plan Control</DropdownMenuLabel>
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/admin/pricing/${plan.id}`} className="flex items-center gap-2 rounded-xl cursor-pointer">
                                                        <Edit className="h-4 w-4" />
                                                        <span>Edit Details</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleToggleActive(plan.id, plan.isActive)}
                                                    className="flex items-center gap-2 rounded-xl cursor-pointer"
                                                >
                                                    {plan.isActive ? (
                                                        <>
                                                            <Archive className="h-4 w-4" />
                                                            <span>Archive Plan</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                                            <span className="text-emerald-500">Activate Plan</span>
                                                        </>
                                                    )}
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className="bg-border/50 my-2" />
                                                <DropdownMenuItem
                                                    onClick={() => handleDelete(plan.id)}
                                                    className="flex items-center gap-2 rounded-xl cursor-pointer text-rose-500 focus:text-rose-500 focus:bg-rose-500/10"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span>Delete Plan</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-48 text-center text-muted-foreground italic">
                                    No pricing plans found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
