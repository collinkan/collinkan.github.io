"use client"

import Navbar from "./components/Navbar"
import HeroSection from "./components/HeroSection"
import Sunset from "./components/Sunset"
import GridBackground from "./components/GridBackground"
import Stars from "./components/Stars"
import Cards from "./components/Cards"
import Experience from "./components/Experience"

export default function Page() {
  return (
    <div className="min-h-[200vh] bg-gradient-to-b from-synthBG to-black">
      <div>
        <Navbar />
        <Stars />
        <Sunset />
        <GridBackground />
        <HeroSection />
        <Experience />
        
        <div className="w-full font-sans px-20 text-synthText pointer-events-none z-20 relative">
          <div className="max-w-7xl pt-10">
            <h2 className="text-5xl font-semibold text-synthText">Skills</h2>
          </div>
        </div>

        <Cards />
        
        {/* Anchor to force scrolling to the absolute bottom */}
        <div id="page-bottom" />
      </div>
    </div >
  )
}
