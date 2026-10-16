'use client'

import { useEffect, useRef } from 'react'

const STAR_COUNT = 190
const TWINKLE_FPS = 30 // the twinkle is slow, so half the display rate looks identical
const SKY_BOTTOM = 0.35 // the horizon sits at 35vh; the floor covers anything below it
const SUN_FEATHER = { inner: 12, outer: 4 } // soft edge where stars fade out around the sun

// Mostly white, with a few cool and warm stars so the sky doesn't look flat.
const PALETTE: [color: string, share: number][] = [
  ['#ffffff', 0.55],
  ['#cfe3ff', 0.18],
  ['#a8f6f8', 0.1],
  ['#ffc7ea', 0.17],
]

type Tier = 'dot' | 'spark' | 'bright'

type Star = {
  x: number // 0-1 of the viewport width
  y: number // 0-1 of the viewport height
  size: number
  phase: number
  speed: number
  depth: number // how much of the twinkle this star shows
  color: number
  tier: Tier
}

type Sprites = Record<Tier, HTMLCanvasElement>

const SPRITE_PX = 48

// Three looks per colour, each drawn once and stamped with drawImage:
// a soft dot (most stars), a four-point sparkle, and a bright sparkle with a halo.
function makeSprites(color: string): Sprites {
  const make = (draw: (ctx: CanvasRenderingContext2D, mid: number) => void) => {
    const c = document.createElement('canvas')
    c.width = c.height = SPRITE_PX
    const ctx = c.getContext('2d')!
    draw(ctx, SPRITE_PX / 2)
    return c
  }

  const glow = (ctx: CanvasRenderingContext2D, mid: number, radius: number, core: number) => {
    const g = ctx.createRadialGradient(mid, mid, 0, mid, mid, radius)
    g.addColorStop(0, color)
    g.addColorStop(core, color)
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(mid, mid, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  const rays = (ctx: CanvasRenderingContext2D, mid: number, long: number) => {
    // Four thin points: long vertical/horizontal rays with a pinched waist.
    ctx.fillStyle = color
    ctx.beginPath()
    const waist = long * 0.1
    ctx.moveTo(mid, mid - long)
    ctx.lineTo(mid + waist, mid - waist)
    ctx.lineTo(mid + long, mid)
    ctx.lineTo(mid + waist, mid + waist)
    ctx.lineTo(mid, mid + long)
    ctx.lineTo(mid - waist, mid + waist)
    ctx.lineTo(mid - long, mid)
    ctx.lineTo(mid - waist, mid - waist)
    ctx.closePath()
    ctx.fill()
  }

  return {
    dot: make((ctx, mid) => glow(ctx, mid, mid * 0.5, 0.35)),
    spark: make((ctx, mid) => {
      glow(ctx, mid, mid * 0.28, 0.2)
      rays(ctx, mid, mid - 1)
    }),
    bright: make((ctx, mid) => {
      ctx.globalAlpha = 0.35
      glow(ctx, mid, mid - 1, 0)
      ctx.globalAlpha = 1
      glow(ctx, mid, mid * 0.2, 0.3)
      rays(ctx, mid, mid - 1)
    }),
  }
}

// How large each tier is drawn, as a multiple of the star's size.
const TIER_SCALE: Record<Tier, number> = { dot: 3.4, spark: 5.5, bright: 7.5 }

function pickColor(r: number): number {
  let acc = 0
  for (let i = 0; i < PALETTE.length; i++) {
    acc += PALETTE[i][1]
    if (r < acc) return i
  }
  return 0
}

function makeStar(): Star {
  const r = Math.random()
  const tier: Tier = r < 0.76 ? 'dot' : r < 0.95 ? 'spark' : 'bright'
  const size = tier === 'dot' ? 0.5 + Math.random() * 0.8 : tier === 'spark' ? 1 + Math.random() * 0.7 : 1.4 + Math.random() * 0.6
  return {
    x: Math.random(),
    // Denser toward the top of the sky, thinning out into the haze at the horizon.
    y: 0.01 + SKY_BOTTOM * 0.96 * Math.pow(Math.random(), 1.3),
    size,
    phase: Math.random() * Math.PI * 2,
    speed: 0.3 + Math.random() * 0.7,
    depth: tier === 'dot' ? 0.4 + Math.random() * 0.6 : 0.8,
    color: pickColor(Math.random()),
    tier,
  }
}

type Shooter = { x: number; y: number; dx: number; dy: number; start: number; duration: number }

export default function Stars() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const sprites = PALETTE.map(([color]) => makeSprites(color))
    const stars: Star[] = Array.from({ length: STAR_COUNT }, makeStar)
    const sunEl = document.getElementById('sun-circle')

    let width = 0
    let height = 0
    let rafId = 0
    let lastTime = 0
    let resizeTimer: ReturnType<typeof setTimeout> | undefined
    let shooter: Shooter | null = null
    let nextShooterAt = 6000 + Math.random() * 6000

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.imageSmoothingQuality = 'high'
      draw(performance.now())
    }

    // An occasional streak across the upper sky, kept above the horizon.
    const launchShooter = (now: number) => {
      const dist = Math.min(440, height * 0.36, width * 0.5)
      const dir = Math.random() < 0.5 ? 1 : -1
      shooter = {
        x: width * (dir > 0 ? 0.08 + Math.random() * 0.5 : 0.42 + Math.random() * 0.5),
        y: height * (0.03 + Math.random() * 0.07),
        dx: dir * dist,
        dy: dist * 0.4,
        start: now,
        duration: 850,
      }
    }

    const drawShooter = (now: number) => {
      if (!shooter) return
      const p = (now - shooter.start) / shooter.duration
      if (p >= 1) {
        shooter = null
        nextShooterAt = now + 7000 + Math.random() * 9000
        return
      }
      const headX = shooter.x + shooter.dx * p
      const headY = shooter.y + shooter.dy * p
      const tail = 0.28 // fraction of the path the tail trails behind the head
      const tailX = headX - shooter.dx * tail
      const tailY = headY - shooter.dy * tail
      const g = ctx.createLinearGradient(headX, headY, tailX, tailY)
      g.addColorStop(0, 'rgba(255,255,255,0.95)')
      g.addColorStop(0.35, 'rgba(207,227,255,0.45)')
      g.addColorStop(1, 'rgba(207,227,255,0)')
      ctx.globalAlpha = Math.sin(Math.PI * p)
      ctx.strokeStyle = g
      ctx.lineWidth = 1.6
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(headX, headY)
      ctx.lineTo(tailX, tailY)
      ctx.stroke()
      ctx.drawImage(sprites[0].dot, headX - 5, headY - 5, 10, 10)
      ctx.globalAlpha = 1
    }

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height)

      // One layout read per frame; stars near the sun fade out instead of using a masking pass.
      let sunX = 0
      let sunY = 0
      let sunR = -1
      if (sunEl) {
        const rect = sunEl.getBoundingClientRect()
        sunX = rect.left + rect.width / 2
        sunY = rect.top + rect.height / 2
        sunR = rect.width / 2
      }

      for (const star of stars) {
        const px = star.x * width
        const py = star.y * height

        let fade = 1
        if (sunR > 0) {
          const dist = Math.hypot(px - sunX, py - sunY)
          fade = (dist - (sunR - SUN_FEATHER.inner)) / (SUN_FEATHER.inner + SUN_FEATHER.outer)
          if (fade <= 0.01) continue
          if (fade > 1) fade = 1
        }

        // Stars dim as they near the horizon, the way thick air swallows them.
        const extinction = 1 - 0.75 * Math.min(1, Math.max(0, (star.y - 0.16) / (SKY_BOTTOM - 0.16)))

        const t = 0.5 + 0.5 * Math.sin(star.phase)
        const twinkle = 1 - star.depth * (1 - t)
        const s = star.size * TIER_SCALE[star.tier] * (0.85 + 0.3 * twinkle) * 0.5
        ctx.globalAlpha = (star.tier === 'dot' ? 0.35 + 0.65 * twinkle : 0.6 + 0.4 * twinkle) * fade * extinction
        ctx.drawImage(sprites[star.color][star.tier], px - s, py - s, s * 2, s * 2)
      }
      ctx.globalAlpha = 1

      drawShooter(now)
    }

    const frame = (time: number) => {
      rafId = requestAnimationFrame(frame)
      const elapsed = time - lastTime
      if (elapsed < 1000 / TWINKLE_FPS - 1) return
      const dt = Math.min(elapsed / 1000, 0.1)
      lastTime = time
      for (const star of stars) star.phase += star.speed * dt
      if (!shooter && time > nextShooterAt) launchShooter(time)
      draw(time)
    }

    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 100)
    }

    resize()
    window.addEventListener('resize', onResize)
    if (!reduceMotion) rafId = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 h-full w-full pointer-events-none" />
}
