"use client"

import * as React from "react"
import Link from "next/link"
import { Search, ChevronRight, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function DocsHeader() {
    const pathname = usePathname()
    const segments = pathname.split('/').filter(Boolean)

    return (
        <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto max-w-7xl px-4 md:px-8 flex h-14 items-center justify-between">
                <div className="flex items-center gap-4">
                    <nav className="hidden md:flex items-center gap-1 text-sm text-muted-foreground font-medium">
                        <Link href="/" className="hover:text-foreground">Home</Link>
                        {segments.map((segment, index) => (
                            <React.Fragment key={index}>
                                <ChevronRight className="h-4 w-4" />
                                <Link
                                    href={`/${segments.slice(0, index + 1).join('/')}`}
                                    className={cn(
                                        "capitalize hover:text-foreground",
                                        index === segments.length - 1 && "text-foreground font-bold"
                                    )}
                                >
                                    {segment.replace(/-/g, ' ')}
                                </Link>
                            </React.Fragment>
                        ))}
                    </nav>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>

                <div className="flex flex-1 items-center justify-end px-4 md:flex-none">
                    <div className="relative w-full max-w-[300px]">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search docs..."
                            className="h-9 w-full rounded-md pl-9 md:w-[200px] lg:w-[300px] bg-muted/50 focus-visible:bg-background"
                        />
                    </div>
                </div>
            </div>
        </header>
    )
}
