import React from "react";

import Navbar from "./components/Navbar"
import Intro from "./components/Intro";

export default function page() {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7x1 mx-auto">
        <Navbar />
        <Intro />
      </div>
    </div>
  )
}