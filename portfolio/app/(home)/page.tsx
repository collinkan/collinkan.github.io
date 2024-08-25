import React from "react";

import Navbar from "./components/Navbar"
import HeroSection from "./components/HeroSection";
import Sunset from "./components/Sunset";
import GridBackground from "./components/GridBackground";

export default function page() {
  return (
    <div className="h-screen bg-synthBG">
      <div>
        <Sunset />
        <GridBackground />
        <Navbar />
        <HeroSection />
      </div>
    </div>
  )
}