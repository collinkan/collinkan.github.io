import React from "react";

import Navbar from "./components/Navbar"
import Intro from "./components/HeroSection";
import Sunset from "./components/Sunset";

export default function page() {
  return (
    <div className="min-h-screen bg-synthBG">
      <div className="max-w-7x1 mx-auto">
        <Sunset />
        <Navbar />
        <Intro />
      </div>
    </div>
  )
}