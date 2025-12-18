'use client'

export default function Sunset() {
    return (
        <div className='absolute w-full flex justify-center py-16'>
            <div className='absolute w-52 h-52 rounded-full'>
                <span
                    className='absolute inset-0 bg-gradient-to-b from-synthYellow via-synthOrange to-synthRed'
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
