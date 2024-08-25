import React, { useState, useRef, Suspense } from 'react'
import { HeroHighlight } from '@/components/ui/hero-highlight'

export default function GridBackground() {
    return (
        // <div className="relative h-screen flex justify-center items-center perspective-750">
        //     <div className="transform-gpu rotate-x-[70deg] w-[100%] h-[100%] bg-fixed bg-[linear-gradient(#fe53bb_5px,transparent_1px),linear-gradient(90deg,#fe53bb_5px,transparent_1px)] bg-[length:50px_50px]">
        //     </div>
        // </div>
        <div className='absolute w-full h-full'>
            <HeroHighlight>
                <h1></h1>
            </HeroHighlight>
        </div>
    )
}
