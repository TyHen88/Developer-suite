"use client"

import * as React from "react"
import { Copy, Check, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface MDXContentProps {
    content: string
}

export function MDXContent({ content }: MDXContentProps) {
    // Simple regex-based line splitting to simulate MDX/Markdown rendering
    const lines = content.split('\n')
    let inCodeBlock = false
    let codeSnippet = ""
    let codeLanguage = ""

    return (
        <div className="prose prose-zinc dark:prose-invert max-w-none">
            {lines.map((line, idx) => {
                // Handle code blocks
                if (line.trim().startsWith('```')) {
                    if (!inCodeBlock) {
                        inCodeBlock = true
                        codeLanguage = line.trim().replace('```', '')
                        codeSnippet = ""
                        return null
                    } else {
                        inCodeBlock = false
                        const finalCode = codeSnippet.trim()
                        return (
                            <CodeBlock key={idx} code={finalCode} language={codeLanguage} />
                        )
                    }
                }

                if (inCodeBlock) {
                    codeSnippet += line + '\n'
                    return null
                }

                // Handle headings
                if (line.startsWith('# ')) return <h1 key={idx} className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">{line.replace('# ', '')}</h1>
                if (line.startsWith('## ')) return <h2 key={idx} id={line.replace('## ', '').toLowerCase().replace(/\s+/g, '-')} className="text-3xl font-bold tracking-tight border-b border-border pb-2 mt-12 mb-6">{line.replace('## ', '')}</h2>
                if (line.startsWith('### ')) return <h3 key={idx} id={line.replace('### ', '').toLowerCase().replace(/\s+/g, '-')} className="text-2xl font-bold tracking-tight mt-10 mb-4">{line.replace('### ', '')}</h3>

                // Handle lists
                if (line.startsWith('- ')) return <li key={idx} className="ml-6 list-disc mb-2">{line.replace('- ', '')}</li>

                // Handle paragraphs or empty lines
                if (line.trim() === '') return <br key={idx} />

                // Handle bold/links inside text (very basic)
                const formattedLine = line
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary underline font-medium">$1</a>')
                    .replace(/\`(.*?)\`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')

                return (
                    <p
                        key={idx}
                        className="text-lg text-muted-foreground leading-relaxed mb-6"
                        dangerouslySetInnerHTML={{ __html: formattedLine }}
                    />
                )
            })}

            <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Caught a mistake or want to improve the docs?</p>
                <Button variant="ghost" size="sm" className="gap-2">
                    <Github className="h-4 w-4" />
                    Edit this page on GitHub
                </Button>
            </div>
        </div>
    )
}

function CodeBlock({ code, language }: { code: string, language: string }) {
    const [copied, setCopied] = React.useState(false)

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        toast.success("Code copied!")
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="relative my-6 group">
            <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-muted-foreground/50">{language}</span>
                <Button size="icon" variant="ghost" className="h-8 w-8 bg-background/50 backdrop-blur" onClick={copyToClipboard}>
                    {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                </Button>
            </div>
            <div className="bg-zinc-950 p-6 rounded-xl font-mono text-sm leading-relaxed overflow-x-auto border border-zinc-800 shadow-xl">
                <pre className="text-zinc-300"><code>{code}</code></pre>
            </div>
        </div>
    )
}
