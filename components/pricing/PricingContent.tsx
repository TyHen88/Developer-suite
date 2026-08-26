"use client"

import * as React from "react"
import { PricingCard } from "@/components/pricing/pricing-card"
import { ComparisonTable } from "@/components/pricing/comparison-table"
import { PRICING_FAQ } from "@/lib/mock-data"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function PricingContent({ plans }: { plans: any[] }) {
    const [isYearly, setIsYearly] = React.useState(false)

    return (
        <div className="container mx-auto px-4 py-16 lg:py-24 max-w-7xl">
            {/* Header */}
            <div className="flex flex-col items-center text-center space-y-6 mb-16">
                <Badge variant="secondary" className="px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/5 text-primary border-primary/10">
                    Pricing Plans
                </Badge>
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-7xl bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent">
                    Scalable pricing for <br className="hidden md:block" /> every developer
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                    Start for free and upgrade as you grow. No hidden fees, cancel anytime.
                    Get access to premium components, templates, and full starter kits.
                </p>

                {/* Billing Toggle */}
                <div className="flex items-center gap-4 pt-8">
                    <Label
                        htmlFor="period-toggle"
                        className={cn("text-sm font-bold transition-colors", !isYearly ? "text-foreground" : "text-muted-foreground")}
                    >
                        Monthly
                    </Label>
                    <Switch
                        id="period-toggle"
                        checked={isYearly}
                        onCheckedChange={setIsYearly}
                    />
                    <div className="flex items-center gap-2">
                        <Label
                            htmlFor="period-toggle"
                            className={cn("text-sm font-bold transition-colors", isYearly ? "text-foreground" : "text-muted-foreground")}
                        >
                            Yearly
                        </Label>
                        <div className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">
                            Save 20%
                        </div>
                    </div>
                </div>
            </div>

            {/* Pricing Grid */}
            {plans.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {plans.map((plan) => (
                        <PricingCard key={plan.id} plan={plan} isYearly={isYearly} />
                    ))}
                </div>
            ) : (
                <div className="py-24 text-center border border-dashed border-border rounded-3xl">
                    <h3 className="text-2xl font-bold">No plans available</h3>
                    <p className="text-muted-foreground">We're currently updating our pricing. Check back soon!</p>
                </div>
            )}

            {/* Feature Comparison */}
            <ComparisonTable />

            {/* FAQ Section */}
            <div className="mt-32 max-w-3xl mx-auto space-y-12">
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
                    <p className="text-muted-foreground mt-2">Everything you need to know about Bayon Developer subscriptions.</p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                    {PRICING_FAQ.map((faq, i) => (
                        <AccordionItem key={i} value={`faq-${i}`} className="border-border/50">
                            <AccordionTrigger className="text-left font-bold hover:no-underline hover:text-primary transition-colors">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            {/* Bottom CTA */}
            <div className="mt-32 p-12 lg:p-20 rounded-[3rem] bg-gradient-to-br from-primary/5 via-background to-background border border-primary/20 flex flex-col items-center text-center space-y-8 overflow-hidden relative group">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />
                <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">Need a custom solution?</h2>
                <p className="text-xl text-muted-foreground max-w-xl">
                    We offer tailored enterprise plans for large organizations with specific security,
                    compliance, and integration requirements.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="h-14 px-10 rounded-full font-bold shadow-xl shadow-primary/20">Contact Sales</Button>
                    <Button size="lg" variant="outline" className="h-14 px-10 rounded-full font-bold">Schedule a Demo</Button>
                </div>
            </div>
        </div>
    )
}
