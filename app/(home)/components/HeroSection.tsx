export default function Intro() {
    return (
        <div id="about-me" className='relative min-h-screen flex flex-col pointer-events-none px-20 pt-40 pb-20 text-synthText'>
            <div className='w-[30vw] text-wrap'>
                <h1 className='font-semibold text-5xl'>
                    Hey, I&#39;m Collin
                </h1>

                <br />

                <span className='text-3xl space-y-6 flex flex-col'>
                    <p>
                        I'm a Software Engineer specializing in automation, AI-driven distributed systems, and scalable backend architectures.
                    </p> 
                    <p>
                        I also have experience in fullstack development, and have a passion for learning new skills and technologies, and building innovative solutions.
                    </p>
                    <p>
                        Originally from Toronto, I'm currently based in the Greater Seattle Area.
                    </p>
                </span>
            </div>
        </div>
    )
}
