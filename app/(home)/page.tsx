"use client"

import { MotionConfig } from "motion/react"
import Navbar from "./components/Navbar"
import HeroSection from "./components/HeroSection"
import Sunset from "./components/Sunset"
import GridBackground from "./components/GridBackground"
import Stars from "./components/Stars"
import Cards from "./components/Cards"
import Experience from "./components/Experience"
import Projects from "./components/Projects"

import { Rajdhani } from "next/font/google";
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export default function Page() {
  return (
    <MotionConfig reducedMotion="user">
    <div className={`min-h-[200vh] bg-gradient-to-b from-synthBG to-black ${rajdhani.className}`}>
      <div>
        <Navbar />
        <Stars />
        <Sunset />
        <GridBackground />
        <HeroSection />
        <Experience />
        <Projects />

        <Cards />
        <div id="page-bottom" />
      </div>
    </div >
    </MotionConfig>
  )
}
