import { PricingTable } from "@/components/admin/PricingTable"
import { Button } from "@/components/ui/button"
import { Plus, DollarSign, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function AdminPricingPage() {
    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter">Pricing Engine</h1>
                    <p className="text-muted-foreground font-medium">Manage tiers, features, and monetization strategies for DevSuite.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="rounded-xl h-10 gap-2 border-border/50 bg-card/40 backdrop-blur-md">
                        <TrendingUp size={14} />
                        Revenue Sync
                    </Button>
                    <Button size="sm" className="rounded-xl h-10 gap-2 bg-primary shadow-lg shadow-primary/20" asChild>
                        <Link href="/admin/pricing/new">
                            <Plus size={14} />
                            New Pricing Plan
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Pricing Context Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-background to-background border border-primary/20 overflow-hidden relative group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <DollarSign size={80} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Platform Strategy</span>
                    <h3 className="text-xl font-bold mt-2">Elastic Monetization</h3>
                    <p className="text-sm text-muted-foreground mt-2 max-w-sm">Every change made here dynamically updates the landing page and checkout flows. Monthly prices and yearly discounts are calculated automatically.</p>
                </div>
                <div className="p-8 rounded-[2.5rem] bg-card/40 border border-border backdrop-blur-xl flex flex-col justify-center">
                    <div className="flex items-center gap-6">
                        <div>
                            <p className="text-3xl font-black tracking-tighter">$2,482</p>
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">MRR Approximation</span>
                        </div>
                        <div className="h-10 w-px bg-border" />
                        <div>
                            <p className="text-3xl font-black tracking-tighter">186</p>
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Active Subscriptions</span>
                        </div>
                    </div>
                </div>
            </div>

            <PricingTable />
        </div>
    )
}
