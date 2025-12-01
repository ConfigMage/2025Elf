'use client'

import { useState } from 'react'
import Image from 'next/image'
import { formatPostDate, formatRelativeTime } from '@/lib/utils'

interface ElfPostCardProps {
  title: string
  message: string
  imageUrl?: string | null
  location?: string | null
  publishDate: Date
}

export default function ElfPostCard({
  title,
  message,
  imageUrl,
  location,
  publishDate,
}: ElfPostCardProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)

  return (
    <>
      <article className="elf-card bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        {/* Image */}
        {imageUrl && (
          <div
            className="relative bg-gray-100 cursor-pointer group"
            onClick={() => setLightboxOpen(true)}
          >
            {/* Larger image container with aspect ratio */}
            <div className="relative w-full" style={{ paddingBottom: '75%' }}>
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-contain bg-gray-50"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
              />
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 px-4 py-2 rounded-full text-sm font-medium text-gray-700">
                🔍 Click to view full size
              </span>
            </div>

            {location && (
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-elf-green">
                📍 {location}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Date */}
          <div className="flex items-center justify-between mb-3">
            <time className="text-sm text-gray-500" dateTime={publishDate.toISOString()}>
              {formatPostDate(publishDate)}
            </time>
            <span className="text-xs text-gray-400">
              {formatRelativeTime(publishDate)}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 font-festive">
            {title}
          </h2>

          {/* Location if no image */}
          {location && !imageUrl && (
            <div className="inline-block bg-elf-green/10 px-3 py-1 rounded-full text-sm font-medium text-elf-green mb-3">
              📍 Found in: {location}
            </div>
          )}

          {/* Message */}
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            {message}
          </p>

          {/* Elf signature */}
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🧝</span>
              <span className="text-sm font-medium text-elf-red">- Sprinkles</span>
            </div>
            <div className="flex space-x-1">
              <span>⭐</span>
              <span>🎄</span>
              <span>❄️</span>
            </div>
          </div>
        </div>
      </article>

      {/* Fullscreen Lightbox */}
      {lightboxOpen && imageUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Title */}
          <div className="absolute top-4 left-4 text-white">
            <h3 className="text-xl font-bold">{title}</h3>
            {location && <p className="text-gray-300">📍 {location}</p>}
          </div>

          {/* Full size image */}
          <div className="relative w-full h-full max-w-6xl max-h-[90vh]">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Instructions */}
          <p className="absolute bottom-4 text-gray-400 text-sm">
            Click anywhere to close
          </p>
        </div>
      )}
    </>
  )
}
