"use client";

import { useState } from "react";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { Sections } from "../types/models/SectionProps";
import { animate } from "framer-motion";

import { Rajdhani } from "next/font/google";
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export default function Navbar() {
    const [lamp, setLamp] = useState({ left: 0, width: 0, visible: false, instant: true });

    const lightLink = (el: HTMLElement) =>
        setLamp((prev) => ({ left: el.offsetLeft, width: el.offsetWidth, visible: true, instant: !prev.visible }));
    const dimLamp = () => setLamp((prev) => ({ ...prev, visible: false, instant: false }));

    const socials = [
        { link: "https://www.linkedin.com/in/collinkan", label: "LinkedIn", Icon: Linkedin },
        { link: "https://github.com/collinkan", label: "GitHub", Icon: Github },
    ]

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        e.preventDefault();
        const targetId = href.replace(/.*\#/, "");
        const elem = document.getElementById(targetId);
        if (elem) {
            const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            const style = window.getComputedStyle(elem);
            const scrollMarginTop = parseFloat(style.scrollMarginTop) || 0;
            const top = elem.getBoundingClientRect().top + window.scrollY - scrollMarginTop;
            if (reduceMotion) {
                window.scrollTo(0, top);
                return;
            }
            animate(window.scrollY, top, {
                duration: 0.8,
                ease: "easeInOut",
                onUpdate: (latest) => window.scrollTo(0, latest)
            });
        }
    };

    return (
        <nav className={`
            fixed z-[999] px-4 py-3 w-full flex justify-between items-center
            glass-blur [--glass-fill:rgb(40_14_56/0.36)] text-synthText ${rajdhani.className}`}
        >
            <span className="flex-1 px-4 md:px-8 flex justify-start items-center">
                <a href="#about-me" onClick={(e) => handleScroll(e, "#about-me")} className="synth-heading synth-wordmark cursor-pointer whitespace-nowrap font-semibold text-2xl md:text-3xl">
                    Collin Kan
                </a>
            </span>

            <span className="
                hidden md:inline-flex h-auto items-center gap-0.5
                glass-pill glass-neutral [--pill-fill:rgb(26_4_32/0.62)]
                px-3 py-2 rounded-full text-xl font-semibold text-white"
                onMouseLeave={dimLamp}
            >
                {/* Sliding lamp: one soft light that follows the hovered link */}
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 h-[calc(100%-10px)] -translate-y-1/2 rounded-full"
                    style={{
                        left: lamp.left,
                        width: lamp.width,
                        opacity: lamp.visible ? 1 : 0,
                        background: "radial-gradient(ellipse at 50% 120%, rgba(45,226,230,0.35), rgba(45,226,230,0.08) 60%, transparent 80%)",
                        boxShadow: "inset 0 0 0 1px rgba(45,226,230,0.35), 0 0 18px rgba(45,226,230,0.3)",
                        transition: lamp.instant
                            ? "opacity 0.25s ease-out"
                            : "left 0.35s cubic-bezier(0.3,0.7,0.2,1), width 0.35s cubic-bezier(0.3,0.7,0.2,1), opacity 0.25s ease-out",
                    }}
                />
                {Sections.map((section, index) => {
                    return (
                        <a
                            key={index}
                            href={section.href}
                            onClick={(e) => handleScroll(e, section.href)}
                            onMouseEnter={(e) => lightLink(e.currentTarget)}
                            onFocus={(e) => lightLink(e.currentTarget)}
                            onBlur={dimLamp}
                            className="relative z-10 cursor-pointer rounded-full px-5 py-1 transition-colors duration-300 hover:text-synthTeal focus-visible:text-synthTeal"
                        >
                            {section.name}
                        </a>
                    )
                })}
            </span>

            <span className="flex-1 px-4 md:px-8 flex justify-end items-center gap-3 md:gap-4">
                {socials.map((social, index) => {
                    const Icon = social.Icon

                    return (
                        <Link
                            className="glass-pill glass-glow group grid h-11 w-11 place-items-center rounded-full hover:scale-105 focus-visible:outline-none"
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={index}
                            aria-label={social.label}
                        >
                            <Icon strokeWidth={1.75} className="h-5 w-5 transition-colors duration-300 group-hover:text-synthTeal group-focus-visible:text-synthTeal" />
                        </Link>
                    )
                })}
            </span>
        </nav>
    )
}
