"use client";
import React from "react";

import Navbar from "./components/Navbar"
import HeroSection from "./components/HeroSection";
import Sunset from "./components/Sunset";
import GridBackground from "./components/GridBackground";
import Stars from "./components/Stars";
import { Gradient } from "./components/Navbar";

import { useState } from "react";

export default function page() {
  const [bgGradient, setBgGradient] = useState<Gradient>('bg-gradientAbout')

  const handleSectionChange = (newGradient:Gradient) => {
    setBgGradient(newGradient)
  }


  return (
    <div className={`h-[200vh] ${bgGradient} transition-all duration-500`}>
      <div>
        <Stars />
        <Sunset />
        <GridBackground />
        <Navbar onChange={handleSectionChange}/>
        <HeroSection />
      </div>
    </div >
  )
}
