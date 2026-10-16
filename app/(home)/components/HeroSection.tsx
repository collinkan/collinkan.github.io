import { TiltFrame } from "@/components/ui/tilt-frame";
import { Rajdhani } from "next/font/google";
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export default function Intro() {
    return (
        <div id="about-me" className={`relative min-h-screen flex flex-col pointer-events-none px-6 sm:px-12 md:px-20 pt-28 md:pt-40 pb-10 md:pb-20 text-synthText ${rajdhani.className}`}>
            <div className='flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between'>
            <div className='w-full sm:w-[70vw] md:w-[50vw] lg:w-[35vw] text-wrap glass-panel [--glass-fill:rgb(26_4_32/0.32)] rounded-3xl p-6 -mx-2'>
                <h1 className='synth-heading font-semibold text-3xl md:text-5xl'>
                    Hey, I&#39;m Collin
                </h1>

                <br />

                <span className='text-xl md:text-3xl space-y-4 md:space-y-6 flex flex-col'>
                    <p>
                        I&apos;m a Software Engineer with a deep interest in <strong className="font-semibold text-white">machine learning</strong>, building AI agents and the distributed systems they run on.
                    </p>
                    <p>
                        I&apos;m currently pursuing my M.S. in Computer Science at Georgia Tech with a <strong className="font-semibold text-white">Machine Learning</strong> specialization, and I love turning what I learn into production systems.
                    </p>
                    <p>
                        Originally from Toronto, I&apos;m currently based in the Greater Seattle Area.
                    </p>
                </span>
            </div>

            {/* Portrait: neon-framed, tinted into the scene, sitting opposite the intro card */}
            <figure className='relative mx-auto w-56 sm:w-64 lg:mx-0 lg:mr-6 lg:w-[clamp(260px,24vw,380px)] shrink-0'>
                {/* Sunset bloom behind the frame */}
                <div aria-hidden='true' className='absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-synthPink/35 via-synthOrange/20 to-synthTeal/30 blur-2xl' />
                <TiltFrame className='pointer-events-auto relative rounded-[2rem]'>
                <div className='glass-pill relative aspect-[3/4] overflow-hidden rounded-[2rem] p-[6px]'>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src='/images/profile.jpg'
                        alt='Collin Kan hiking in the Olympic Mountains, wearing sunglasses and a blue rain jacket'
                        width={960}
                        height={1280}
                        decoding='async'
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                        className='h-full w-full select-none rounded-[1.65rem] object-cover object-[50%_60%]'
                    />
                    {/* Synthwave grade: purple wash from below, a pink glint from the top corner */}
                    <div aria-hidden='true' className='pointer-events-none absolute inset-[6px] rounded-[1.65rem] bg-gradient-to-t from-synthBG/70 via-transparent to-transparent' />
                    <div aria-hidden='true' className='pointer-events-none absolute inset-[6px] rounded-[1.65rem] bg-gradient-to-br from-synthPink/20 via-transparent to-synthTeal/15 mix-blend-screen' />
                </div>
                </TiltFrame>
            </figure>
            </div>
        </div>
    )
}
