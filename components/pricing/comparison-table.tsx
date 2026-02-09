import { MOCK_PLANS } from "@/lib/mock-data"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Check, Minus } from "lucide-react"

const FEATURES = [
    { name: "UI Components", free: "50+", pro: "All (200+)", team: "All (200+)", enterprise: "Custom Library" },
    { name: "Full-page Templates", free: false, pro: true, team: true, enterprise: true },
    { name: "Starter Kits", free: "Basic", pro: "Advanced", team: "Unlimited", enterprise: "On-Premise" },
    { name: "Support", free: "Community", pro: "Priority Email", team: "Shared Slack", enterprise: "Dedicated Manager" },
    { name: "CLI Access", free: true, pro: true, team: true, enterprise: true },
    { name: "Team Workspace", free: false, pro: false, team: true, enterprise: true },
    { name: "Custom Theming", free: false, pro: "Standard", team: "Advanced", enterprise: "Unlimited" },
    { name: "SLA Guarantee", free: false, pro: false, team: false, enterprise: true },
]

export function ComparisonTable() {
    return (
        <div className="mt-24 space-y-12">
            <div className="text-center">
                <h2 className="text-3xl font-bold">Compare Features</h2>
                <p className="text-muted-foreground mt-2">Everything you need to scale your development.</p>
            </div>

            <div className="rounded-3xl border border-border bg-card/30 backdrop-blur-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="w-[300px]">Features</TableHead>
                            {MOCK_PLANS.map((plan) => (
                                <TableHead key={plan.id} className="text-center font-bold text-foreground">
                                    {plan.name}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {FEATURES.map((feature, i) => (
                            <TableRow key={i} className="hover:bg-primary/5">
                                <TableCell className="font-medium">{feature.name}</TableCell>
                                {MOCK_PLANS.map((plan) => {
                                    const val = (feature as any)[plan.id.toLowerCase()]
                                    return (
                                        <TableCell key={plan.id} className="text-center">
                                            {typeof val === "boolean" ? (
                                                val ? (
                                                    <div className="mx-auto h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                                        <Check className="h-3 w-3 text-emerald-500" strokeWidth={3} />
                                                    </div>
                                                ) : (
                                                    <Minus className="mx-auto h-4 w-4 text-muted-foreground/30" />
                                                )
                                            ) : (
                                                <span className="text-xs font-medium text-muted-foreground">{val}</span>
                                            )}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
