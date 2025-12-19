import React from "react";

import Link from "next/link";
import { SiLinkedin, SiGithub } from "react-icons/si";


export type Gradient = 'bg-gradientAbout' | 'bg-gradientSkills' | 'bg-gradientExp'

type NavbarProps = {
    onChange: (newGradient: Gradient) => void
}

export default function Navbar({ onChange }: NavbarProps) {
    const sections = [
        {
            label: "About Me",
            href: "#about-me",
            textAlign: "text-left",
            textOrigin: 'origin-left',
            newGradient: "bg-gradientAbout"
        },
        {
            label: "Skills",
            href: "#skills",
            textAlign: "text-center",
            textOrigin: 'origin-center',
            newGradient: "bg-gradientSkills"
        },
        {
            label: "Experience",
            href: "#experience",
            textAlign: "text-right",
            textOrigin: 'origin-right',
            newGradient: "bg-gradientExp"
        }
    ]

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

    return (
        <nav className="p-4 w-full fixed flex justify-between items-center shadow-lg shadow-synthBlack/15 bg-synthTransparent backdrop-blur-md text-synthText">
            <h1 className="px-8 w-1/3 text-2xl font-bold">
                Collin Kan
            </h1>

            <span className="w-1/3 h-auto flex justify-between items-center border border-synthTransparent/20 bg-synthTransparent px-10 py-4 rounded-3xl text-synthText">
                {sections.map((section, index) => {
                    return (
                        <a
                            key={index}
                            href={section.href}
                            className={`w-1/3 ${section.textAlign} ${section.textOrigin} cursor-pointer hover:scale-125 transition-all ease-in-out`}
                            onClick={() => onChange(section.newGradient as Gradient)}
                        >
                            {section.label}
                        </a>
                    )
                })}
            </span>

            <span className="px-8 w-1/3 flex justify-end items-center gap-10">
                {socials.map((social, index) => {
                    const Icon = social.Icon

                    return (
                        <Link className="group scale-150" href={social.link} key={index} aria-label={social.label}>
                            <Icon className="relative w-5 h-5 group-hover:scale-125 transition-transform" />
                        </Link>
                    )
                })}
            </span>
        </nav>
    )
}
