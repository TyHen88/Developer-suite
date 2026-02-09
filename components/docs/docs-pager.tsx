"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DOCS_NAVIGATION } from "@/lib/constants"
import { usePathname } from "next/navigation"

export function DocsPager() {
    const pathname = usePathname()
    const allItems = DOCS_NAVIGATION.flatMap((section) => section.items)
    const currentIndex = allItems.findIndex((item) => `/docs/${item.slug}` === pathname)

    const prev = currentIndex > 0 ? allItems[currentIndex - 1] : null
    const next = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null

    return (
        <div className="flex flex-row items-center justify-between mt-12 pt-8 border-t border-border">
            {prev ? (
                <Link href={`/docs/${prev.slug}`}>
                    <Button variant="outline" className="gap-2">
                        <ChevronLeft className="h-4 w-4" />
                        {prev.title}
                    </Button>
                </Link>
            ) : <div />}
            {next && (
                <Link href={`/docs/${next.slug}`}>
                    <Button variant="outline" className="gap-2">
                        {next.title}
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </Link>
            )}
        </div>
    )
}
