import { Timeline } from "@/components/ui/timeline";

import { Rajdhani } from "next/font/google";
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export default function Projects() {
    const data = [
        {
            title: "April 2026 – Present",
            content: (
                <div>
                    <h3 className="text-2xl md:text-4xl font-bold tracking-wide mb-2">Founder & Principal Engineer</h3>
                    <p className="text-lg md:text-2xl italic text-synthTeal mb-4 flex items-center gap-2">
                        Jinuine •{" "}
                        <a href="https://jinuine.com" target="_blank" rel="noopener noreferrer" className="pointer-events-auto inline-flex items-center hover:opacity-70 transition-opacity">
                            <span
                                className="inline-block"
                                style={{
                                    width: '0.95em',
                                    height: '0.95em',
                                    backgroundColor: 'currentColor',
                                    maskImage: 'url(/jinuine.svg)',
                                    WebkitMaskImage: 'url(/jinuine.svg)',
                                    maskSize: '132% 132%',
                                    maskRepeat: 'no-repeat',
                                    maskPosition: 'center',
                                }}
                            />
                        </a>
                    </p>
                    <ul className="list-disc pl-6 text-base md:text-xl font-medium space-y-2">
                        <li>Built a image platform where every photo is cryptographically proven authentic, camera-only capture enforced at the hardware level via Apple App Attest.</li>
                        <li>Implemented HMAC-SHA256 payload signing with a 15-second TTL window to prevent MITM and replay attacks, and validated accelerometer data at shutter press to detect screen-rephotography.</li>
                        <li>Designed a batch Merkle tree pipeline anchoring image hashes to a Solidity smart contract on Base L2 (Ethereum), enabling publicly verifiable provenance without relying on Jinuine's servers.</li>
                    </ul>
                </div>
            ),
        },
    ];

    return (
        <div id="projects" className={`relative w-full pb-20 pointer-events-none scroll-mt-20 ${rajdhani.className}`}>
            <style>{`
                #projects * {
                    font-family: ${rajdhani.style.fontFamily} !important;
                }
                #projects .py-20 {
                    padding-bottom: 2rem !important;
                }
            `}</style>
            <Timeline data={data} title="Projects" />
        </div>
    );
}
