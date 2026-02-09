import { type PricingPlan } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface PricingCardProps {
    plan: PricingPlan
    isYearly: boolean
}

export function PricingCard({ plan, isYearly }: PricingCardProps) {
    const price = isYearly ? plan.priceYearly : plan.priceMonthly
    const savings = isYearly && plan.priceMonthly > 0 ? (plan.priceMonthly * 12) - plan.priceYearly : 0

    return (
        <Card className={cn(
            "relative flex flex-col h-full transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5",
            plan.popular ? "border-primary shadow-lg scale-105 z-10" : "border-border"
        )}>
            {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Badge className="px-4 py-1 text-xs font-bold uppercase tracking-wider">Most Popular</Badge>
                </div>
            )}

            <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-sm mt-2">{plan.description}</CardDescription>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col items-center">
                <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-5xl font-extrabold tracking-tight">${price}</span>
                    <span className="text-muted-foreground font-medium">/{isYearly ? 'yr' : 'mo'}</span>
                </div>

                {savings > 0 && (
                    <Badge variant="secondary" className="mb-8 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">
                        Save ${savings} per year
                    </Badge>
                )}

                <ul className="w-full space-y-4 text-left">
                    {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                            <div className="mt-1 h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <Check className="h-2.5 w-2.5 text-primary" strokeWidth={3} />
                            </div>
                            <span className="text-muted-foreground">{feature}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>

            <CardFooter className="pt-8">
                <Button
                    className={cn(
                        "w-full h-12 rounded-xl text-sm font-bold transition-all",
                        plan.popular ? "bg-primary text-primary-foreground hover:scale-105 shadow-xl" : "variant-outline"
                    )}
                    variant={plan.popular ? "default" : "outline"}
                >
                    {plan.buttonText}
                </Button>
            </CardFooter>
        </Card>
    )
}
