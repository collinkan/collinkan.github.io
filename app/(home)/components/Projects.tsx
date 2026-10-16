import { Timeline } from "@/components/ui/timeline";
import { Metrics } from "@/components/ui/metrics";

import { Rajdhani } from "next/font/google";
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export default function Projects() {
    const data = [
        {
            title: "April 2026 – Present",
            content: (
                <div>
                    <h3 className="text-2xl md:text-3xl font-semibold mb-1 text-white">Founder & Principal Engineer</h3>
                    <p className="mb-5 flex items-center gap-2 border-b border-white/10 pb-4 text-lg md:text-xl font-semibold tracking-wide text-synthTeal">
                        <a href="https://jinuine.com" target="_blank" rel="noopener noreferrer" className="pointer-events-auto hover:opacity-70 transition-opacity">
                            Jinuine
                        </a>
                    </p>
                    <ul className="list-none max-w-[70ch] space-y-4 text-lg md:text-xl font-medium leading-[1.6] text-synthText/90">
                        <li className="relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rotate-45 before:bg-synthTeal before:shadow-[0_0_8px_rgba(45,226,230,0.8)] before:content-['']"><Metrics>{"Built a image platform where every photo is cryptographically proven authentic, camera-only capture enforced at the hardware level via Apple App Attest."}</Metrics></li>
                        <li className="relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rotate-45 before:bg-synthTeal before:shadow-[0_0_8px_rgba(45,226,230,0.8)] before:content-['']"><Metrics>{"Implemented HMAC-SHA256 payload signing with a 15-second TTL window to prevent MITM and replay attacks, and validated accelerometer data at shutter press to detect screen-rephotography."}</Metrics></li>
                        <li className="relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rotate-45 before:bg-synthTeal before:shadow-[0_0_8px_rgba(45,226,230,0.8)] before:content-['']"><Metrics>{"Designed a batch Merkle tree pipeline anchoring image hashes to a Solidity smart contract on Base L2 (Ethereum), enabling publicly verifiable provenance without relying on Jinuine's servers."}</Metrics></li>
                    </ul>
                </div>
            ),
        },
    ];

    return (
        <div id="projects" className={`relative w-full pb-20 pointer-events-none scroll-mt-20 ${rajdhani.className}`}>
            <style>{`
                #projects .py-20 {
                    padding-bottom: 2rem !important;
                }
            `}</style>
            <Timeline data={data} title="Projects" />
        </div>
    );
}
