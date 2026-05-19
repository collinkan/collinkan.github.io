import { Rajdhani } from "next/font/google";
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export default function Intro() {
    return (
        <div id="about-me" className={`relative min-h-screen flex flex-col pointer-events-none px-6 sm:px-12 md:px-20 pt-28 md:pt-40 pb-10 md:pb-20 text-synthText ${rajdhani.className}`}>
            <div className='w-full sm:w-[70vw] md:w-[50vw] lg:w-[35vw] text-wrap'>
                <h1 className='font-semibold text-3xl md:text-5xl'>
                    Hey, I&#39;m Collin
                </h1>

                <br />

                <span className='text-xl md:text-3xl space-y-4 md:space-y-6 flex flex-col'>
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
