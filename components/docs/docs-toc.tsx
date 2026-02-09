"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TOCItem {
    id: string
    title: string
    level: number
}

export function DocsTOC() {
    const [items, setItems] = React.useState<TOCItem[]>([])

    React.useEffect(() => {
        // Extract headings from the main content
        const headings = Array.from(document.querySelectorAll('h2, h3'))
            .map((heading) => ({
                id: heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-') || '',
                title: heading.textContent || '',
                level: parseInt(heading.tagName.replace('H', ''))
            }))

        // Assign IDs to headings if they don't have them
        document.querySelectorAll('h2, h3').forEach((h) => {
            if (!h.id) {
                h.id = h.textContent?.toLowerCase().replace(/\s+/g, '-') || ''
            }
        })

        setItems(headings)
    }, [])

    if (items.length === 0) return null

    return (
        <aside className="h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">On this page</h4>
                <nav className="flex flex-col gap-2.5 text-sm">
                    {items.map((item, index) => (
                        <a
                            key={index}
                            href={`#${item.id}`}
                            className={cn(
                                "line-clamp-2 text-muted-foreground transition-colors hover:text-foreground",
                                item.level === 3 && "pl-4 text-[13px]"
                            )}
                        >
                            {item.title}
                        </a>
                    ))}
                </nav>
            </div>
        </aside>
    )
}
