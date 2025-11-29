'use client'

import { useState } from 'react'

interface ElfIntroVideoProps {
  videoUrl?: string | null
  elfName?: string
}

export default function ElfIntroVideo({ videoUrl, elfName = 'Sprinkles' }: ElfIntroVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  if (!videoUrl) {
    return null
  }

  return (
    <div className="bg-gradient-to-r from-elf-green to-green-700 rounded-2xl overflow-hidden shadow-xl">
      <div className="p-6 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">🎬 Meet {elfName}!</h2>
        <p className="text-green-100">Watch the special introduction video</p>
      </div>

      <div className="relative bg-black aspect-video">
        {!isPlaying ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-green-900/80 to-red-900/80">
            <span className="text-6xl mb-4">🧝</span>
            <button
              onClick={() => setIsPlaying(true)}
              className="group flex items-center space-x-3 bg-white text-elf-red px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition-transform"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">▶️</span>
              <span>Play Video</span>
            </button>
          </div>
        ) : (
          <video
            src={videoUrl}
            controls
            autoPlay
            className="w-full h-full"
            onEnded={() => setIsPlaying(false)}
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      <div className="p-4 bg-green-800 text-center">
        <p className="text-green-100 text-sm">
          🎅 A special message from Santa&apos;s workshop!
        </p>
      </div>
    </div>
  )
}
