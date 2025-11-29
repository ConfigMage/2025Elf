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
  return (
    <article className="elf-card bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      {/* Image */}
      {imageUrl && (
        <div className="relative h-64 md:h-80 bg-gray-100">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
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
  )
}
