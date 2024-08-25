import React from "react";

import Link from "next/link";

import { SiLinkedin, SiGithub } from "react-icons/si";

export default function page() {
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
        <nav className="p-4 w-full fixed flex justify-between items-center shadow-lg shadow-synthBG/50 bg-synthTransparent backdrop-blur-md text-synthText">
            <h1 className="px-8 w-1/3 text-2xl font-bold">
                Collin Kan
            </h1>

            <div className="w-1/3 h-auto overflow-auto flex justify-between items-center border border-synthTransparent/20 bg-[#1a1a1a2a] px-10 py-4 rounded-3xl text-synthText">
                <a href="#about-me" className="w-1/3 size-auto text-left whitespace-nowrap cursor-pointer hover:scale-125 transition-all">
                    About Me
                </a>
                <a href="#skills" className="w-1/3 text-center cursor-pointer hover:scale-125 transition-all">
                    Skills
                </a>
                <a href="#experience" className="w-1/3 text-right cursor-pointer hover:scale-125 transition-all">
                    Experience
                </a>
            </div>

            <span className="px-8 w-1/3 flex justify-end items-center gap-5">
                {socials.map((social, index) => {
                    const Icon = social.Icon

                    return (
                        <Link className="group" href={social.link} key={index} aria-label={social.label}>
                            <span className="absolute w-5 h-5 bg-synthTeal opacity-60 blur-sm rounded-lg group-hover:scale-150 transition-all"></span>
                            <Icon className="relative w-5 h-5 group-hover:scale-125 transition-all" />
                        </Link>
                    )
                })}
            </span>
        </nav>
    )
}