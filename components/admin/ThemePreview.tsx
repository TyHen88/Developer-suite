"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Sun, Moon, Monitor, Check } from "lucide-react"

export function ThemePreview() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // Avoid hydration mismatch
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const themes = [
        {
            id: "light",
            label: "Light Mode",
            icon: Sun,
            bgColor: "bg-white",
            textColor: "text-zinc-900",
            borderColor: "border-zinc-200",
            accentColor: "bg-primary",
        },
        {
            id: "dark",
            label: "Dark Mode",
            icon: Moon,
            bgColor: "bg-zinc-950",
            textColor: "text-zinc-50",
            borderColor: "border-zinc-800",
            accentColor: "bg-primary",
        },
        {
            id: "system",
            label: "System",
            icon: Monitor,
            bgColor: "bg-gradient-to-br from-white to-zinc-950",
            textColor: "text-zinc-500",
            borderColor: "border-zinc-400",
            accentColor: "bg-primary/50",
        },
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {themes.map((t) => (
                <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={cn(
                        "group relative flex flex-col items-start p-4 rounded-3xl border-2 transition-all duration-300 outline-none",
                        theme === t.id
                            ? "border-primary bg-primary/5 shadow-2xl shadow-primary/10"
                            : "border-border bg-card/40 hover:border-primary/50"
                    )}
                >
                    {/* Mock UI Preview */}
                    <div className={cn(
                        "w-full aspect-[4/3] rounded-2xl mb-4 overflow-hidden border shadow-inner flex flex-col p-2 gap-2",
                        t.bgColor,
                        t.borderColor
                    )}>
                        <div className="flex items-center gap-2">
                            <div className={cn("h-3 w-3 rounded-full", t.accentColor)} />
                            <div className={cn("h-2 w-12 rounded-full opacity-20", t.textColor, t.bgColor === "bg-white" ? "bg-black" : "bg-white")} />
                        </div>
                        <div className="space-y-1.5 mt-1">
                            <div className={cn("h-1.5 w-full rounded-full opacity-10", t.textColor, t.bgColor === "bg-white" ? "bg-black" : "bg-white")} />
                            <div className={cn("h-1.5 w-3/4 rounded-full opacity-10", t.textColor, t.bgColor === "bg-white" ? "bg-black" : "bg-white")} />
                            <div className={cn("h-1.5 w-1/2 rounded-full opacity-10", t.textColor, t.bgColor === "bg-white" ? "bg-black" : "bg-white")} />
                        </div>
                    </div>

                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                            <t.icon size={14} className={cn(theme === t.id ? "text-primary" : "text-muted-foreground")} />
                            <span className={cn("text-xs font-bold uppercase tracking-widest", theme === t.id ? "text-primary" : "text-muted-foreground")}>
                                {t.label}
                            </span>
                        </div>
                        {theme === t.id && (
                            <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center animate-in zoom-in duration-300">
                                <Check size={10} className="text-primary-foreground stroke-[4px]" />
                            </div>
                        )}
                    </div>

                    {/* Label context */}
                    <p className="text-[10px] text-muted-foreground mt-2 text-left opacity-60 font-medium">
                        {t.id === 'system' ? 'Adapts to OS settings' : `Optimized for ${t.id} viewing`}
                    </p>
                </button>
            ))}
        </div>
    )
}
