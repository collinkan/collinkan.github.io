"use client"

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
    <div className={`min-h-[200vh] bg-gradient-to-b from-synthBG to-black ${rajdhani.className}`}>
      <div>
        <Navbar />
        <Stars />
        <Sunset />
        <GridBackground />
        <HeroSection />
        <Experience />
        <Projects />

        <div className="w-full px-6 sm:px-12 md:px-20 text-synthText pointer-events-none z-20 relative">
          <div className="max-w-7xl pt-10">
            <h2 className="text-3xl md:text-5xl font-semibold text-synthText">Skills</h2>
          </div>
        </div>

        <Cards />
        <div id="page-bottom" />
      </div>
    </div >
  )
}
