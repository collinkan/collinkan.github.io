import Link from 'next/link'
import React from 'react'

export default function Intro() {
  return (
    <div>
        <div>
            <h1>
                Hello There 
                <br /> 
                My Name is Collin Kan
            </h1>
            <p>
                I Am A Developer From Canada
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
