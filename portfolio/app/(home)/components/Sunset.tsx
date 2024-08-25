import React from 'react'

export default function Sunset() {
    const numDivisions = 7
    const divisions = Array.from(Array(numDivisions).keys())

    return (
        <div className='absolute w-full flex justify-center py-5'>
            <div className='absolute w-52 h-52 rounded-full'>
                <span className="absolute -inset-5 bg-synthPink opacity-80 rounded-full blur-3xl"></span>
            </div>
            <div className='relative w-52 h-52 rounded-full overflow-hidden'>
                <span className='absolute inset-0 bg-gradient-to-b from-synthYellow via-synthOrange to-synthRed'></span>
                <span>
                    {divisions.map((division) => {
                        return (
                            <span>
                                <span key={division} style={{top: `${division * (50/numDivisions) + 50}%`, height: 3 + division*0.5}} 
                                    className={`absolute inset-x-0 bg-synthBG`}>
                                </span>
                                <span key={division} style={{top: `${division * (50/numDivisions) + 50}%`, height: 1 + division*0.5}}
                                    className={`absolute inset-x-0 bg-synthPink blur-sm`}>
                                </span>
                            </span>
                        )
                    })}
                </span>
            </div>
        </div>
    )
}
