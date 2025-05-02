import Link from 'next/link'
import React from 'react'

export default function Intro() {
  return (
    <div className='px-5 py-28'>
        <div>
            <h1>
                Hello There 
                <br /> 
                My Name is Collin Kan
            </h1>
            <p>
                Insert about me here
            </p>
            <Link href={"mailto:collinkan@gmail.com"} className='inline-block'>
                <h1 className='text-3x1 font-bold'>
                    Contact Me
                </h1>
            </Link>
        </div>
    </div>
  )
}
