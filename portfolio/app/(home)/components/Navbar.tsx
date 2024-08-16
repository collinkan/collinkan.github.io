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
    <nav className="p-10 flex justify-between items-center bg-synthGrid text-synthText">
        <h1 className="text-2xl font-bold underline underline-offset-8 decoration-green-500 -rotate-2">
            Collin Kan
        </h1>
        <span className="flex items-center gap-5">
            {socials.map((social, index) => {
                const Icon = social.Icon

                return (
                    <Link href={social.link} key={index} aria-label={social.label}>
                        <Icon className="w-5 h-5 hover:scale-125 transition-all"/>
                    </Link>
                )
            })}
        </span>
    </nav>
  )
}