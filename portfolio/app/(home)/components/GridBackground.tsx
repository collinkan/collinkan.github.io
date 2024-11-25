import React, { useState, useRef, Suspense } from 'react'

export default function GridBackground() {
    return (
        <div className='absolute w-screen h-full -inset-y-40 flex justify-center overflow-hidden'>
            <div className="absolute w-[200vw] h-full perspective-500 overflow-hidden]">
                <div className="transform-gpu w-full h-full rotate-x-[80deg] bg-fixed bg-[linear-gradient(#fe53bb_5px,transparent_1px),linear-gradient(90deg,#fe53bb_5px,#2a3459_1px)] bg-[length:50px_50px]">
                </div>
            </div>
        </div>
    )
}
