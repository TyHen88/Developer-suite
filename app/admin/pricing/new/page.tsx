import { PricingForm } from "@/components/admin/PricingForm"

export default function NewPricingPlanPage() {
    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-4xl font-black tracking-tighter">Draft New Plan</h1>
                <p className="text-muted-foreground font-medium">Create a new pricing tier to expand your business horizons.</p>
            </div>

            <PricingForm />
        </div>
    )
}
