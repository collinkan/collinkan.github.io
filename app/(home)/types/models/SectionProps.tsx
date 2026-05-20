import { Section } from "../enums/Section"
import { Gradient } from "../enums/Gradient"

export interface SectionProps {
    name: string,
    href: string,
    gradient: Gradient
}

export const Sections: SectionProps[] = [
    {
        name: Section.ABOUT,
        href: "#about-me",
        gradient: Gradient.ABOUT
    },
    {
        name: Section.EXP,
        href: "#experience",
        gradient: Gradient.EXP
    },
    {
        name: Section.PROJECTS,
        href: "#projects",
        gradient: Gradient.PROJECTS
    },
    {
        name: Section.SKILL,
        href: "#page-bottom",
        gradient: Gradient.SKILLS
    },
]