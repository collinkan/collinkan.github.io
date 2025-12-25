"use client"

import { useState } from "react"

import Navbar from "./components/Navbar"
import HeroSection from "./components/HeroSection"
import Sunset from "./components/Sunset"
import GridBackground from "./components/GridBackground"
import Stars from "./components/Stars"
import Cards from "./components/Cards"
import { Section } from "./types/enums/Section"
import { Gradient } from "./types/enums/Gradient"

export default function Page() {
  const [bgGradient, setBgGradient] = useState(Gradient.ABOUT)
  const [activeSection, setActiveSection] = useState(Section.ABOUT)

  const handleSectionChange = (newGradient: Gradient, newSection: Section) => {
    setBgGradient(newGradient)
    setActiveSection(newSection)
  }

  return (
    <div className={`h-[200vh] ${bgGradient} transition-all duration-500`}>
      <div>
        <Navbar onChange={handleSectionChange}/>
        <Stars />
        <Sunset />

        {activeSection === Section.ABOUT && <GridBackground />}
        {activeSection === Section.ABOUT && <HeroSection />}

        <Cards />
      </div>
    </div >
  )
}
