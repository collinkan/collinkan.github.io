'use client'

import { useEffect, useRef } from 'react'

// The stripe cut-outs from the original artwork, shared by every layer of the disc.
const SLATS_MASK: React.CSSProperties = {
    maskImage: 'url(/sunset.svg)',
    WebkitMaskImage: 'url(/sunset.svg)',
    maskSize: '175% 175%',
    WebkitMaskSize: '175% 175%',
    maskPosition: 'center',
    WebkitMaskPosition: 'center',
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
}

export default function Sunset() {
    const sunGlowRef = useRef<HTMLDivElement>(null)
    const pinkGlowRef = useRef<HTMLDivElement>(null)
    const sunRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const root = document.documentElement
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        let rafId = 0
        let running = false
        let current = 0

        // The sun drifts down at half the scroll speed and is fully set once it has dropped to the
        // horizon (35vh). Its glow fades with it, so a sun that is sinking never lights the sky at
        // full strength. The same 0-1 value is shared as --sun-lift for the horizon glow.
        const render = (y: number) => {
            const setDistance = Math.max(1, window.innerHeight * 0.35 - 20)
            const lift = Math.pow(1 - Math.min(1, y / setDistance), 1.5)

            if (sunRef.current) sunRef.current.style.transform = `translate3d(-50%, ${y}px, 0)`
            if (sunGlowRef.current) {
                sunGlowRef.current.style.transform = `translate3d(-50%, ${y}px, 0)`
                sunGlowRef.current.style.opacity = String(0.6 * lift)
            }
            if (pinkGlowRef.current) {
                pinkGlowRef.current.style.transform = `translate3d(-50%, ${y - 40}px, 0)`
                pinkGlowRef.current.style.opacity = String(0.3 * lift)
            }
            root.style.setProperty('--sun-lift', lift.toFixed(3))
        }

        const tick = () => {
            const target = window.scrollY * 0.5
            current += (target - current) * 0.1
            if (Math.abs(target - current) < 0.2) {
                current = target
                running = false
            } else {
                rafId = requestAnimationFrame(tick)
            }
            render(current)
        }

        // Only animate while the scroll position is changing; idle pages do no work.
        const onScroll = () => {
            if (running) return
            running = true
            rafId = requestAnimationFrame(tick)
        }

        current = window.scrollY * 0.5
        render(current)

        if (reduceMotion) {
            const onScrollStatic = () => render(window.scrollY * 0.5)
            window.addEventListener('scroll', onScrollStatic, { passive: true })
            window.addEventListener('resize', onScrollStatic)
            return () => {
                window.removeEventListener('scroll', onScrollStatic)
                window.removeEventListener('resize', onScrollStatic)
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll)
        return () => {
            cancelAnimationFrame(rafId)
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onScroll)
        }
    }, [])

    return (
        <div className='fixed w-full flex justify-center py-5 pointer-events-none'>
            {/* Wide pink atmosphere */}
            <div
                ref={pinkGlowRef}
                className='absolute left-1/2 w-[450px] h-[450px] rounded-full bg-synthPink blur-3xl will-change-transform'
                style={{ transform: 'translate3d(-50%, -40px, 0)', opacity: 0.3 }}
            ></div>

            {/* Sun glow */}
            <div
                ref={sunGlowRef}
                className='absolute left-1/2 w-[335px] h-[335px] rounded-full bg-gradientSun blur-md will-change-transform'
                style={{ transform: 'translate3d(-50%, 0px, 0)', opacity: 0.6 }}
            ></div>

            {/* Sun */}
            <div
                id="sun-circle"
                ref={sunRef}
                className='absolute left-1/2 w-[335px] h-[335px] rounded-full will-change-transform'
                style={{ transform: 'translate3d(-50%, 0px, 0)' }}
            >
                {/* Slow-breathing bloom behind the disc */}
                <span
                    aria-hidden='true'
                    className='sun-bloom absolute -inset-[28%] rounded-full'
                    style={{
                        background:
                            'radial-gradient(circle, rgba(255,214,90,0.38) 0%, rgba(255,110,40,0.14) 42%, transparent 68%)',
                        opacity: 'var(--sun-lift, 1)',
                    }}
                />

                {/* The disc: gradient, then a top highlight, then a deepening red as it sets */}
                <span
                    className='absolute inset-0 bg-gradientSun'
                    style={SLATS_MASK}
                ></span>
                <span
                    aria-hidden='true'
                    className='absolute inset-0 mix-blend-screen'
                    style={{
                        ...SLATS_MASK,
                        background: 'radial-gradient(ellipse 60% 42% at 50% 20%, rgba(255,250,200,0.5), transparent 70%)',
                    }}
                ></span>
                <span
                    aria-hidden='true'
                    className='absolute inset-0 mix-blend-multiply'
                    style={{
                        ...SLATS_MASK,
                        background: '#fd1d53',
                        opacity: 'calc(0.6 * (1 - var(--sun-lift, 1)))',
                    }}
                ></span>
            </div>
        </div>
    )
}
