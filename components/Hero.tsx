"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Sparkles, ArrowRight, Copy, Check, Terminal, Layers, ShieldCheck, Zap, Code2, Box } from 'lucide-react'
import { toast } from 'sonner'

export default function Hero() {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview')
  const cliCommand = "npx bayon-dev@latest init my-app"

  const handleCopy = () => {
    navigator.clipboard.writeText(cliCommand)
    setCopied(true)
    toast.success("Command copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="relative border-b border-border/40 overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-cyan-500/15 via-indigo-500/10 to-transparent blur-[120px] pointer-events-none -z-10" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-7 max-w-4xl mx-auto">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-bold tracking-wider uppercase backdrop-blur-xl shadow-lg shadow-cyan-500/5 hover:border-cyan-500/40 transition-colors cursor-default">
            <Sparkles size={13} className="text-cyan-400 animate-pulse" />
            <span>Bayon Developer UI &amp; Infrastructure</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-balance text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-foreground leading-[1.08]">
            Architect Faster with <br />
            <span className="text-gradient-primary">Bayon Developer</span>
          </h1>

          {/* Subtitle */}
          <p className="text-balance text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-normal leading-relaxed">
            A premium collection of high-performance UI components, full-stack starters, and architectural templates crafted for modern engineering teams.
          </p>

          {/* CTA Group & CLI Snippet */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/components"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 h-12 px-8 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold transition-all shadow-xl shadow-cyan-500/20 group hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Components</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={handleCopy}
              className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-3 h-12 px-5 rounded-2xl bg-card/60 hover:bg-card/90 border border-white/[0.1] backdrop-blur-xl text-xs font-mono text-muted-foreground hover:text-foreground transition-all group shadow-lg"
              title="Copy to clipboard"
            >
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-cyan-400" />
                <span className="text-foreground font-semibold">{cliCommand}</span>
              </div>
              <div className="h-7 w-7 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-muted-foreground group-hover:text-cyan-400 transition-colors">
                {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              </div>
            </button>
          </div>

          {/* Key Feature Stats Pills */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-muted-foreground font-medium">
            <div className="flex items-center gap-2">
              <Layers size={15} className="text-cyan-400" />
              <span>50+ Copy-Paste Components</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-indigo-400" />
              <span>100% Type-Safe (TypeScript &amp; Zod)</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={15} className="text-amber-400" />
              <span>Next.js 16 + React 19 Ready</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Blueprint Showcase Card */}
        <div className="mt-16 sm:mt-20 max-w-5xl mx-auto">
          <div className="paper-card spotlight-card p-1 rounded-3xl border border-white/[0.12] shadow-2xl bg-gradient-to-b from-card/90 via-card/60 to-card/40 backdrop-blur-2xl">
            {/* Window Top Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.08] bg-card/40 rounded-t-3xl">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                <span className="text-[11px] font-mono text-muted-foreground ml-3 hidden sm:inline-block">
                  bayon-developer / app / preview.tsx
                </span>
              </div>

              <div className="flex items-center gap-1 bg-background/50 p-1 rounded-xl border border-white/[0.06]">
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === 'preview'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Box size={13} />
                    Preview
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('code')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === 'code'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Code2 size={13} />
                    Code
                  </span>
                </button>
              </div>
            </div>

            {/* Window Content */}
            <div className="p-6 sm:p-10 min-h-[300px] flex items-center justify-center bg-background/30 rounded-b-3xl">
              {activeTab === 'preview' ? (
                <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Mock Interactive Component 1 */}
                  <div className="p-5 rounded-2xl bg-card/80 border border-white/[0.08] shadow-lg space-y-3 hover:border-cyan-500/40 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Tactical Metric</span>
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black font-mono tracking-tight">$48,290</span>
                      <span className="text-xs font-bold text-emerald-400">+14.6%</span>
                    </div>
                    <div className="w-full bg-muted/40 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full w-[72%]" />
                    </div>
                  </div>

                  {/* Mock Interactive Component 2 */}
                  <div className="p-5 rounded-2xl bg-card/80 border border-white/[0.08] shadow-lg space-y-3 hover:border-indigo-500/40 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Cloud Sync</span>
                      <span className="text-[10px] font-mono text-muted-foreground">Postgres 16</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                        <Zap size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-foreground">Neon Serverless</p>
                        <p className="text-[10px] text-muted-foreground">Sub-millisecond query cache</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-2xl font-mono text-xs text-muted-foreground overflow-x-auto bg-black/40 p-5 rounded-2xl border border-white/[0.06]">
                  <pre className="text-slate-300">
                    <code>{`import { Card, StatWidget, NeonSync } from "@bayon/ui"

export function Dashboard() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <StatWidget title="Tactical Metric" value="$48,290" trend="+14.6%" />
      <NeonSync provider="Neon Serverless" status="active" />
    </div>
  )
}`}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
