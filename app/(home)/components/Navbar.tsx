import Link from "next/link";
import { SiLinkedin, SiGithub } from "react-icons/si";
import { Sections } from "../types/models/SectionProps";
import { Section } from "../types/enums/Section";
import { TextAlign } from "../types/enums/TextAlign";
import { Gradient } from "../types/enums/Gradient";

type NavbarProps = {
    onChange: (newGradient: Gradient, newSection: Section) => void
}

export default function Navbar({ onChange }: NavbarProps) {
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
        }
    ]

    const numSections = Sections.length - 1

    return (
        <nav className="
            fixed z-[999] p-4 w-full flex justify-between items-center 
            shadow-lg shadow-synthBlack/15 bg-synthTransparent 
            backdrop-blur-md text-synthText"
        >
            <span className="px-8 w-1/3 flex justify-start items-center gap-10 ">
                <a href="#about-me" className="font-bold text-xl tracking-widest cursor-pointer hover:text-synthTeal hover:drop-shadow-[0_0_8px_theme('colors.synthTeal')] transition-all duration-300 ease-in-out">
                    Collin Kan
                </a>
            </span>

            <span className="
                w-1/3 h-auto flex justify-between items-center 
                border border-synthTransparent/20 bg-synthTransparent 
                px-10 py-4 rounded-3xl text-synthText 
                [text-shadow:-1px_-1px_0_#000,1px_-1px_0_#000,-1px_1px_0_#000,1px_1px_0_#000]"
            >
                {Sections.map((section, index) => {
                    return (
                        <a
                            key={index}
                            href={section.href}
                            className={
                                `w-1/3 
                                ${index == 0 ? TextAlign.LEFT : index == numSections ? TextAlign.RIGHT : TextAlign.CENTER}
                                cursor-pointer hover:scale-125 hover:text-synthTeal hover:drop-shadow-[0_0_8px_theme('colors.synthTeal')] transition-all duration-300 ease-in-out`
                            }
                            onClick={() => onChange(section.gradient as Gradient, section.name as Section)}
                        >
                            {section.name}
                        </a>
                    )
                })}
            </span>

            <span className="px-8 w-1/3 flex justify-end items-center gap-10">
                {socials.map((social, index) => {
                    const Icon = social.Icon

                    return (
                        <Link className="scale-150 group" href={social.link} key={index} aria-label={social.label}>
                            <Icon className="relative w-5 h-5 group-hover:scale-125 group-hover:text-synthTeal group-hover:drop-shadow-[0_0_8px_theme('colors.synthTeal')] transition-all duration-300 ease-in-out" />
                        </Link>
                    )
                })}
            </span>
        </nav>
    )
}
