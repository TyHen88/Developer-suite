"use client"

import React, { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface Point {
  baseX: number
  baseY: number
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  targetAlpha: number
}

interface Ripple {
  x: number
  y: number
  radius: number
  maxRadius: number
  strength: number
  speed: number
  alpha: number
}

export function InteractiveCanvasGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    let dpr = window.devicePixelRatio || 1

    const setupCanvasSize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)
    }

    setupCanvasSize()

    // Grid configuration
    const spacing = 32
    let points: Point[] = []

    const initPoints = () => {
      points = []
      const cols = Math.ceil(width / spacing) + 2
      const rows = Math.ceil(height / spacing) + 2

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = (c - 0.5) * spacing
          const y = (r - 0.5) * spacing
          points.push({
            baseX: x,
            baseY: y,
            x: x,
            y: y,
            vx: 0,
            vy: 0,
            radius: 1.2,
            alpha: 0.12,
            targetAlpha: 0.12,
          })
        }
      }
    }

    initPoints()

    // Mouse Tracking
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 160,
      active: false,
    }

    const ripples: Ripple[] = []

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX
      mouse.targetY = e.clientY
      mouse.active = true
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`)
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`)
    }

    const handleMouseLeave = () => {
      mouse.active = false
      mouse.targetX = -1000
      mouse.targetY = -1000
    }

    const handleClick = (e: MouseEvent) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 10,
        maxRadius: 320,
        strength: 24,
        speed: 7,
        alpha: 0.7,
      })
    }

    const handleResize = () => {
      setupCanvasSize()
      initPoints()
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true })
    window.addEventListener("click", handleClick, { passive: true })
    window.addEventListener("resize", handleResize, { passive: true })

    // Animation Loop
    let time = 0

    const render = () => {
      time += 0.02
      ctx.clearRect(0, 0, width, height)

      // Smooth mouse interpolation
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.18
        mouse.y += (mouse.targetY - mouse.y) * 0.18
      } else {
        mouse.x = -1000
        mouse.y = -1000
      }

      // Update and draw ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i]
        rp.radius += rp.speed
        rp.alpha *= 0.95

        if (rp.radius > rp.maxRadius || rp.alpha < 0.01) {
          ripples.splice(i, 1)
        }
      }

      const isDark = resolvedTheme !== "light"
      const baseDotColor = isDark ? "rgba(255, 255, 255, " : "rgba(15, 23, 42, "
      const glowCyan = isDark ? "rgba(56, 189, 248, " : "rgba(14, 165, 233, "
      const glowIndigo = isDark ? "rgba(99, 102, 241, " : "rgba(79, 70, 229, "

      // Draw subtle connections between illuminated points near cursor
      const activePoints: Point[] = []

      for (let i = 0; i < points.length; i++) {
        const pt = points[i]

        // 1. Mouse distance & displacement
        const dx = pt.baseX - mouse.x
        const dy = pt.baseY - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        // 2. Ripple displacement
        let ripplePushX = 0
        let ripplePushY = 0

        for (const rp of ripples) {
          const rdx = pt.baseX - rp.x
          const rdy = pt.baseY - rp.y
          const rDist = Math.sqrt(rdx * rdx + rdy * rdy)
          const diff = Math.abs(rDist - rp.radius)

          if (diff < 40) {
            const factor = (1 - diff / 40) * rp.alpha * rp.strength
            const angle = Math.atan2(rdy, rdx)
            ripplePushX += Math.cos(angle) * factor
            ripplePushY += Math.sin(angle) * factor
          }
        }

        // 3. Elastic Spring Physics to return to baseX, baseY
        if (dist < mouse.radius && mouse.active) {
          const force = (1 - dist / mouse.radius) * 12
          const angle = Math.atan2(dy, dx)
          const targetX = pt.baseX + Math.cos(angle) * force + ripplePushX
          const targetY = pt.baseY + Math.sin(angle) * force + ripplePushY

          pt.vx += (targetX - pt.x) * 0.2
          pt.vy += (targetY - pt.y) * 0.2

          const proximity = 1 - dist / mouse.radius
          pt.targetAlpha = 0.15 + proximity * 0.85
          pt.radius = 1.2 + proximity * 2.2

          activePoints.push(pt)
        } else {
          // Ambient breathing idle motion
          const ambientWave = Math.sin(time + pt.baseX * 0.01 + pt.baseY * 0.01) * 0.03
          const targetX = pt.baseX + ripplePushX
          const targetY = pt.baseY + ripplePushY

          pt.vx += (targetX - pt.x) * 0.1
          pt.vy += (targetY - pt.y) * 0.1
          pt.targetAlpha = Math.max(0.08, 0.12 + ambientWave)
          pt.radius = 1.2
        }

        pt.vx *= 0.75
        pt.vy *= 0.75
        pt.x += pt.vx
        pt.y += pt.vy
        pt.alpha += (pt.targetAlpha - pt.alpha) * 0.15

        // Draw dot
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2)

        if (pt.alpha > 0.4) {
          // Luminous cyber glow near mouse
          ctx.fillStyle = `${glowCyan}${pt.alpha})`
          ctx.shadowColor = glowCyan + "0.6)"
          ctx.shadowBlur = pt.alpha * 8
        } else {
          ctx.fillStyle = `${baseDotColor}${pt.alpha})`
          ctx.shadowBlur = 0
        }
        ctx.fill()
      }

      // Draw faint constellation lines between active grid neighbors
      if (activePoints.length > 1) {
        ctx.shadowBlur = 0
        for (let i = 0; i < activePoints.length; i++) {
          for (let j = i + 1; j < activePoints.length; j++) {
            const p1 = activePoints[i]
            const p2 = activePoints[j]
            const lineDist = Math.hypot(p1.x - p2.x, p1.y - p2.y)

            if (lineDist < spacing * 1.5) {
              const lineAlpha = (1 - lineDist / (spacing * 1.5)) * Math.min(p1.alpha, p2.alpha) * 0.4
              ctx.beginPath()
              ctx.moveTo(p1.x, p1.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.strokeStyle = `${glowIndigo}${lineAlpha})`
              ctx.lineWidth = 0.8
              ctx.stroke()
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("click", handleClick)
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [resolvedTheme])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-90 transition-opacity duration-700"
      aria-hidden="true"
    />
  )
}
