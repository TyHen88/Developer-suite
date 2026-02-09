"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { DOCS_NAVIGATION } from "@/lib/constants"
import { ScrollArea } from "@/components/ui/scroll-area"

export function DocsSidebar() {
    const pathname = usePathname()

    return (
        <aside className="sticky top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto md:block">
            <ScrollArea className="h-full py-6 pr-6 lg:py-8">
                <div className="relative flex flex-col gap-6">
                    {DOCS_NAVIGATION.map((section, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <h4 className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                {section.title}
                            </h4>
                            <div className="grid grid-flow-row auto-rows-max text-sm">
                                {section.items.map((item, idx) => {
                                    const href = `/docs/${item.slug}`
                                    const isActive = pathname === href
                                    return (
                                        <Link
                                            key={idx}
                                            href={href}
                                            className={cn(
                                                "group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 transition-colors hover:bg-accent hover:text-accent-foreground",
                                                isActive
                                                    ? "bg-accent font-medium text-foreground"
                                                    : "text-muted-foreground"
                                            )}
                                        >
                                            {item.title}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </aside>
    )
}
