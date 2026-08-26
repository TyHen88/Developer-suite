"use client"

import React, { useEffect, useRef } from "react"

export function PaperMouseEffect() {
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mouseX = -1000
    let mouseY = -1000
    let currentX = -1000
    let currentY = -1000
    let animationFrameId: number

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`)
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`)
    }

    const handleMouseLeave = () => {
      mouseX = -1000
      mouseY = -1000
    }

    const animate = () => {
      currentX += (mouseX - currentX) * 0.12
      currentY += (mouseY - currentY) * 0.12

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${currentX - 350}px, ${currentY - 350}px, 0)`
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true })
    animationFrameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 h-[700px] w-[700px] rounded-full opacity-60 transition-opacity duration-500 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(56, 189, 248, 0.09) 0%, rgba(99, 102, 241, 0.04) 40%, transparent 70%)",
        }}
      />
    </div>
  )
}
