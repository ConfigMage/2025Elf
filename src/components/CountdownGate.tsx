'use client'

import { useState, useEffect } from 'react'
import { getTimeUntilReveal, isRevealed } from '@/lib/utils'
import Snowflakes from './Snowflakes'

interface CountdownGateProps {
  children: React.ReactNode
}

export default function CountdownGate({ children }: CountdownGateProps) {
  const [revealed, setRevealed] = useState(false)
  const [countdown, setCountdown] = useState(getTimeUntilReveal())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setRevealed(isRevealed())

    const interval = setInterval(() => {
      const newCountdown = getTimeUntilReveal()
      setCountdown(newCountdown)

      if (newCountdown.total <= 0) {
        setRevealed(true)
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-900 to-green-900">
        <div className="animate-pulse text-white text-2xl">Loading...</div>
      </div>
    )
  }

  if (revealed) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-red-900 via-red-800 to-green-900 relative overflow-hidden">
      <Snowflakes />

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-6xl animate-bounce-slow">🎄</div>
      <div className="absolute top-10 right-10 text-6xl animate-bounce-slow" style={{ animationDelay: '0.5s' }}>🎄</div>
      <div className="absolute bottom-10 left-1/4 text-4xl">🎁</div>
      <div className="absolute bottom-10 right-1/4 text-4xl">🎁</div>

      {/* Main content */}
      <div className="text-center z-10 px-4">
        {/* Lock icon */}
        <div className="text-8xl mb-6 animate-pulse-glow">🔒</div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-festive">
          Something Magical is Coming!
        </h1>

        <p className="text-xl md:text-2xl text-red-100 mb-8">
          Sprinkles the Elf is preparing a special surprise for Ellie &amp; Aniyah!
        </p>

        {/* Countdown */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20">
          <h2 className="text-white text-xl mb-6 uppercase tracking-wider">
            The Magic Reveals In...
          </h2>

          <div className="grid grid-cols-4 gap-4 md:gap-8">
            <div className="text-center">
              <div className="bg-elf-red rounded-xl p-4 md:p-6 shadow-lg">
                <span className="countdown-number">{countdown.days}</span>
              </div>
              <p className="countdown-label text-white mt-2">Days</p>
            </div>

            <div className="text-center">
              <div className="bg-elf-green rounded-xl p-4 md:p-6 shadow-lg">
                <span className="countdown-number">{countdown.hours.toString().padStart(2, '0')}</span>
              </div>
              <p className="countdown-label text-white mt-2">Hours</p>
            </div>

            <div className="text-center">
              <div className="bg-elf-red rounded-xl p-4 md:p-6 shadow-lg">
                <span className="countdown-number">{countdown.minutes.toString().padStart(2, '0')}</span>
              </div>
              <p className="countdown-label text-white mt-2">Minutes</p>
            </div>

            <div className="text-center">
              <div className="bg-elf-green rounded-xl p-4 md:p-6 shadow-lg">
                <span className="countdown-number">{countdown.seconds.toString().padStart(2, '0')}</span>
              </div>
              <p className="countdown-label text-white mt-2">Seconds</p>
            </div>
          </div>
        </div>

        {/* Elf message */}
        <div className="bg-white/90 rounded-xl p-6 max-w-md mx-auto shadow-xl">
          <p className="text-elf-green font-semibold text-lg">
            🧝 &quot;Ho ho ho! I&apos;m getting ready for my big arrival! See you soon!&quot;
          </p>
          <p className="text-gray-600 mt-2">- Sprinkles 🎅</p>
        </div>
      </div>
    </div>
  )
}
