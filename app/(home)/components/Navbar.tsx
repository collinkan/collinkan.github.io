import Link from "next/link";
import { SiLinkedin, SiGithub } from "react-icons/si";
import { Sections } from "../types/models/SectionProps";
import { animate } from "framer-motion";

import { Rajdhani } from "next/font/google";
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

const JinuineIcon = ({ className }: { className?: string }) => (
    <span
        className={className}
        style={{
            display: 'block',
            backgroundColor: 'currentColor',
            maskImage: 'url(/jinuine.svg)',
            WebkitMaskImage: 'url(/jinuine.svg)',
            maskSize: '132% 132%',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
        }}
    />
)

export default function Navbar() {
    const socials = [
        {
            link: "https://www.linkedin.com/in/collinkan",
            label: "LinkedIn",
            Icon: SiLinkedin
        },
        {
            link: "https://github.com/collinkan",
            label: "GitHub",
            Icon: SiGithub
        },
        {
            link: "https://jinuine.com",
            label: "Jinuine",
            Icon: JinuineIcon
        }
    ]

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        e.preventDefault();
        const targetId = href.replace(/.*\#/, "");
        const elem = document.getElementById(targetId);
        if (elem) {
            const style = window.getComputedStyle(elem);
            const scrollMarginTop = parseFloat(style.scrollMarginTop) || 0;
            const top = elem.getBoundingClientRect().top + window.scrollY - scrollMarginTop;
            animate(window.scrollY, top, {
                duration: 0.8,
                ease: "easeInOut",
                onUpdate: (latest) => window.scrollTo(0, latest)
            });
        }
    };

    return (
        <nav className={`
            fixed z-[999] p-4 w-full flex justify-between items-center
            shadow-lg shadow-synthBlack/15 bg-synthTransparent
            backdrop-blur-md text-synthText ${rajdhani.className}`}
        >
            <span className="flex-1 px-4 md:px-8 flex justify-start items-center">
                <a href="#about-me" onClick={(e) => handleScroll(e, "#about-me")} className="font-bold text-3xl tracking-widest cursor-pointer hover:text-synthTeal hover:drop-shadow-[0_0_8px_theme('colors.synthTeal')] transition-all duration-300 ease-in-out">
                    Collin Kan
                </a>
            </span>

            <span className="
                hidden md:inline-flex h-auto items-center gap-10
                bg-synthTransparent
                px-10 py-4 rounded-3xl text-xl text-synthText
                shadow-[2px_3px_8px_rgba(0,0,0,0.45)]
                [text-shadow:0_1px_4px_rgba(0,0,0,0.9)]"
            >
                {Sections.map((section, index) => {
                    return (
                        <a
                            key={index}
                            href={section.href}
                            onClick={(e) => handleScroll(e, section.href)}
                            className="cursor-pointer hover:text-synthTeal hover:drop-shadow-[0_0_8px_theme('colors.synthTeal')] transition-all duration-300 ease-in-out"
                        >
                            {section.name}
                        </a>
                    )
                })}
            </span>

            <span className="flex-1 px-4 md:px-8 flex justify-end items-center gap-6 md:gap-10">
                {socials.map((social, index) => {
                    const Icon = social.Icon

                    return (
                        <Link className="scale-150 group" href={social.link} key={index} aria-label={social.label}>
                            <Icon className="relative w-5 h-5 group-hover:text-synthTeal group-hover:drop-shadow-[0_0_8px_theme('colors.synthTeal')] transition-all duration-300 ease-in-out" />
                        </Link>
                    )
                })}
            </span>
        </nav>
    )
}
