import React from "react";

import Navbar from "./components/Navbar"
import HeroSection from "./components/HeroSection";
import Sunset from "./components/Sunset";
import GridBackground from "./components/GridBackground";
import Stars from "./components/Stars";

export default function page() {
  return (
    <div className="h-[500vh] bg-synthBG">
      <div>
        <Stars />
        <Sunset />
        <GridBackground />
        <Navbar />
        <HeroSection />
      </div>
    </div>
  )
}
