'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Settings } from '@prisma/client'

interface SettingsFormProps {
  settings: Settings
}

export default function SettingsForm({ settings }: SettingsFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    const formData = new FormData(e.currentTarget)
    const data = {
      elfName: formData.get('elfName'),
      welcomeMessage: formData.get('welcomeMessage'),
      elfIntroVideoUrl: formData.get('elfIntroVideoUrl') || null,
    }

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setSuccess(true)
        router.refresh()
        setTimeout(() => setSuccess(false), 3000)
      } else {
        const result = await res.json()
        setError(result.error || 'Failed to save settings')
      }
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-6">
          Settings saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="elfName" className="block text-sm font-medium text-gray-700 mb-2">
            Elf Name
          </label>
          <input
            type="text"
            id="elfName"
            name="elfName"
            defaultValue={settings.elfName}
            placeholder="Sprinkles"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elf-red focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="welcomeMessage" className="block text-sm font-medium text-gray-700 mb-2">
            Welcome Message
          </label>
          <textarea
            id="welcomeMessage"
            name="welcomeMessage"
            rows={4}
            defaultValue={settings.welcomeMessage}
            placeholder="Write a welcome message for the kids..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elf-red focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="elfIntroVideoUrl" className="block text-sm font-medium text-gray-700 mb-2">
            Elf Intro Video URL
          </label>
          <input
            type="url"
            id="elfIntroVideoUrl"
            name="elfIntroVideoUrl"
            defaultValue={settings.elfIntroVideoUrl || ''}
            placeholder="https://example.com/elf-intro.mp4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elf-red focus:border-transparent"
          />
          <p className="text-sm text-gray-500 mt-1">
            URL to an MP4 video introducing the elf
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-elf-green text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  )
}
