'use client'

import { useEffect, useRef } from 'react'

export default function Stars() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.8,
      phase: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.5,
    }))

    const sunEl = document.getElementById('sun-circle')

    let rafId: number
    let lastTime = 0

    const draw = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05)
      lastTime = time

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const star of stars) {
        star.phase += star.speed * dt
        const t = 0.5 + 0.5 * Math.sin(star.phase)
        const opacity = 0.15 + 0.85 * t
        const s = star.size * (0.8 + 0.4 * t)
        const px = (star.x / 100) * canvas.width
        const py = (star.y / 100) * canvas.height

        ctx.save()
        ctx.globalAlpha = opacity
        ctx.fillStyle = 'white'
        ctx.translate(px, py)

        // 8-point star shape
        ctx.beginPath()
        for (let j = 0; j < 16; j++) {
          const angle = (j * Math.PI) / 8 - Math.PI / 2
          const r = j % 2 === 0 ? s : s * 0.4
          if (j === 0) ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r)
          else ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r)
        }
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      }

      // Erase stars that fall inside the sun using a soft-edged radial cutout
      if (sunEl) {
        const rect = sunEl.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const r = rect.width / 2

        const gradient = ctx.createRadialGradient(cx, cy, r - 12, cx, cy, r + 4)
        gradient.addColorStop(0, 'rgba(0,0,0,1)')
        gradient.addColorStop(1, 'rgba(0,0,0,0)')

        ctx.save()
        ctx.globalCompositeOperation = 'destination-out'
        ctx.beginPath()
        ctx.arc(cx, cy, r + 4, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
        ctx.restore()
      }

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />
}
