'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

type Star = {
  id: number
  x: number
  y: number
  size: number
  delay: number
}

export default function Stars() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const newStars = Array.from({ length: 200 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 2,
    })).filter(star => !(star.x > 40 && star.x < 60 && star.y > 5 && star.y < 30))
    setStars(newStars)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            clipPath: 'polygon(50% 0%, 75% 25%, 100% 50%, 75% 75%, 50% 100%, 25% 75%, 0% 50%, 25% 25%)',
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: star.delay,
          }}
        />
      ))}
    </div>
  )
}
