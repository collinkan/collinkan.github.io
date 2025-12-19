'use client'

import { useEffect, useRef } from 'react'

export default function Sunset() {
    const sunGlowRef = useRef<HTMLDivElement>(null)
    const pinkGlowRef = useRef<HTMLDivElement>(null)
    const sunRef = useRef<HTMLDivElement>(null)
    const rafRef = useRef<number | null>(null)
    const currentYSunGlow = useRef(0)
    const currentYPinkGlow = useRef(0)
    const currentYSun = useRef(0)

    useEffect(() => {
        const animate = () => {
            const targetY = window.scrollY
            const vw3 = window.innerWidth * 0.03

            currentYSunGlow.current += (targetY - currentYSunGlow.current) * 0.1
            currentYPinkGlow.current += (targetY - currentYPinkGlow.current) * 0.1
            currentYSun.current += (targetY - currentYSun.current) * 0.1

            if (sunGlowRef.current) {
                sunGlowRef.current.style.transform = `translate(-50%, ${currentYSunGlow.current * 0.5}px)`
            }
            if (pinkGlowRef.current) {
                pinkGlowRef.current.style.transform = `translate(-50%, ${currentYPinkGlow.current * 0.5 - vw3}px)`
            }
            if (sunRef.current) {
                sunRef.current.style.transform = `translate(-50%, ${currentYSun.current * 0.5}px)`
            }

            rafRef.current = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current)
            }
        }
    }, [])

    return (
        <div className='fixed w-full flex justify-center py-5'>
            {/* Sun glow effect */}
            <div
                ref={sunGlowRef}
                className='absolute left-1/2 w-[20vw] h-[20vw] rounded-full bg-gradientSun blur-md opacity-60 will-change-transform'
                style={{ transform: 'translate(-50%, 0px)' }}
            ></div>

            <div
                ref={pinkGlowRef}
                className='absolute left-1/2 w-[25vw] h-[25vw] rounded-full bg-synthPink blur-3xl opacity-30 will-change-transform'
                style={{ transform: 'translate(-50%, 0px)' }}
            ></div>

            {/* Sun */}
            <div
                ref={sunRef}
                className='absolute left-1/2 w-[20vw] h-[20vw] rounded-full will-change-transform'
                style={{ transform: 'translate(-50%, 0px)' }}
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
