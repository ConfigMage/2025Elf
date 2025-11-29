'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ImageUpload from '@/components/ImageUpload'

export default function NewPostPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get('title'),
      message: formData.get('message'),
      location: formData.get('location') || null,
      imageUrl: imageUrl || null,
      publishDate: formData.get('publishDate'),
      isPublished: formData.get('isPublished') === 'on',
    }

    try {
      const res = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        router.push('/admin/posts')
        router.refresh()
      } else {
        const result = await res.json()
        setError(result.error || 'Failed to create post')
      }
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/admin/posts" className="text-gray-500 hover:text-gray-700">
          ← Back to Posts
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">New Elf Post</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              placeholder="e.g., Sprinkles in the Kitchen!"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elf-red focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Write the elf's message to the kids..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elf-red focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location (where was the elf found?)
            </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="e.g., Kitchen counter, Christmas tree, etc."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elf-red focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photo of Sprinkles
            </label>
            <ImageUpload
              onImageUploaded={(url) => setImageUrl(url)}
            />
          </div>

          <div>
            <label htmlFor="publishDate" className="block text-sm font-medium text-gray-700 mb-2">
              Publish Date *
            </label>
            <input
              type="date"
              id="publishDate"
              name="publishDate"
              required
              defaultValue={today}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elf-red focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">
              Post will appear on this date (after reveal time)
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="isPublished"
              name="isPublished"
              defaultChecked
              className="w-5 h-5 text-elf-red border-gray-300 rounded focus:ring-elf-red"
            />
            <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
              Publish immediately (or save as draft)
            </label>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-elf-green text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Post'}
            </button>
            <Link
              href="/admin/posts"
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
