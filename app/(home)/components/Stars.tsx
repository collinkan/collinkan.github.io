'use client'

import { useState, useEffect } from 'react'
import { Star } from '../types/models/Star'

export default function Stars() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const newStars = Array.from({ length: 200 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 3,
      delay: Math.random() * 2,
    })).filter(star => !(star.x > 40 && star.x < 60 && star.y > 5 && star.y < 30))
    setStars(newStars)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none">
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            clipPath: 'polygon(50% 0%,68% 32%, 100% 50%, 68% 68%, 50% 100%, 32% 68%, 0% 50%, 32% 32%)',
            animation: `twinkle ${2 + (star.id % 10)}s infinite ${star.delay}s ease-in-out`
          }}
        />
      ))}
    </div>
  )
}
