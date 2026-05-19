'use client'

import { useEffect, useRef } from 'react'

export default function Sunset() {
    const sunGlowRef = useRef<HTMLDivElement>(null)
    const pinkGlowRef = useRef<HTMLDivElement>(null)
    const sunRef = useRef<HTMLDivElement>(null)

    const currentYSunGlow = useRef(0)
    const currentYPinkGlow = useRef(0)
    const currentYSun = useRef(0)

    useEffect(() => {
        let rafId: number
        const animate = () => {
            const targetY = window.scrollY

            currentYSunGlow.current += (targetY - currentYSunGlow.current) * 0.1
            currentYPinkGlow.current += (targetY - currentYPinkGlow.current) * 0.1
            currentYSun.current += (targetY - currentYSun.current) * 0.1

            if (sunGlowRef.current) {
                sunGlowRef.current.style.transform = `translate3d(-50%, ${currentYSunGlow.current * 0.5}px, 0)`
            }
            if (pinkGlowRef.current) {
                pinkGlowRef.current.style.transform = `translate3d(-50%, ${currentYPinkGlow.current * 0.5 - 40}px, 0)`
            }
            if (sunRef.current) {
                sunRef.current.style.transform = `translate3d(-50%, ${currentYSun.current * 0.5}px, 0)`
            }

            rafId = requestAnimationFrame(animate)
        }

        rafId = requestAnimationFrame(animate)

        return () => {
            cancelAnimationFrame(rafId)
        }
    }, [])

    return (
        <div className='fixed w-full flex justify-center py-5 pointer-events-none'>
            {/* Sun glow effect */}
            <div
                ref={sunGlowRef}
                className='absolute left-1/2 w-[335px] h-[335px] rounded-full bg-gradientSun blur-md opacity-60 will-change-transform'
                style={{ transform: 'translate3d(-50%, 0px, 0)' }}
            ></div>

            <div
                ref={pinkGlowRef}
                className='absolute left-1/2 w-[450px] h-[450px] rounded-full bg-synthPink blur-3xl opacity-30 will-change-transform'
                style={{ transform: 'translate3d(-50%, 0px, 0)' }}
            ></div>

            {/* Sun */}
            <div
                id="sun-circle"
                ref={sunRef}
                className='absolute left-1/2 w-[335px] h-[335px] rounded-full will-change-transform'
                style={{ transform: 'translate3d(-50%, 0px, 0)' }}
            >
                <span
                    className='absolute inset-0 bg-gradientSun'
                    style={{
                        maskImage: 'url(/sunset.svg)',
                        WebkitMaskImage: 'url(/sunset.svg)',
                        maskSize: '175% 175%',
                        maskPosition: 'center',
                        maskRepeat: 'no-repeat',
                    }}
                ></span>
            </div>
        </div>
    )
}
