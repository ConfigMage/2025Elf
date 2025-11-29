'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Kid } from '@prisma/client'

interface KidsManagerProps {
  initialKids: Kid[]
}

export default function KidsManager({ initialKids }: KidsManagerProps) {
  const router = useRouter()
  const [kids, setKids] = useState(initialKids)
  const [newKidName, setNewKidName] = useState('')
  const [loading, setLoading] = useState<string | null>(null)

  const handleAddKid = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newKidName.trim()) return

    setLoading('add')
    try {
      const res = await fetch('/api/admin/kids', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newKidName.trim() }),
      })

      if (res.ok) {
        setNewKidName('')
        router.refresh()
        const data = await res.json()
        setKids([...kids, data])
      }
    } catch {
      alert('Failed to add kid')
    } finally {
      setLoading(null)
    }
  }

  const handleUpdateScore = async (kidId: string, newScore: number) => {
    setLoading(kidId)
    try {
      const res = await fetch(`/api/admin/kids/${kidId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niceScore: newScore }),
      })

      if (res.ok) {
        setKids(kids.map((k) => (k.id === kidId ? { ...k, niceScore: newScore } : k)))
        router.refresh()
      }
    } catch {
      alert('Failed to update score')
    } finally {
      setLoading(null)
    }
  }

  const handleDeleteKid = async (kidId: string) => {
    if (!confirm('Are you sure you want to remove this kid?')) return

    setLoading(kidId)
    try {
      const res = await fetch(`/api/admin/kids/${kidId}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setKids(kids.filter((k) => k.id !== kidId))
        router.refresh()
      }
    } catch {
      alert('Failed to delete kid')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Add Kid Form */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Add a Kid</h2>
        <form onSubmit={handleAddKid} className="flex space-x-4">
          <input
            type="text"
            value={newKidName}
            onChange={(e) => setNewKidName(e.target.value)}
            placeholder="Enter kid's name"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elf-red focus:border-transparent"
          />
          <button
            type="submit"
            disabled={loading === 'add'}
            className="px-6 py-3 bg-elf-green text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {loading === 'add' ? 'Adding...' : 'Add Kid'}
          </button>
        </form>
      </div>

      {/* Kids List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {kids.length === 0 ? (
          <div className="p-8 text-center">
            <span className="text-6xl block mb-4">👧</span>
            <p className="text-gray-600">No kids added yet. Add the first one above!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {kids.map((kid) => (
              <div key={kid.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-elf-red/10 rounded-full flex items-center justify-center text-2xl">
                      👧
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{kid.name}</h3>
                      <p className="text-sm text-gray-500">Nice Score: {kid.niceScore}%</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteKid(kid.id)}
                    disabled={loading === kid.id}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>

                {/* Score Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Naughty</span>
                    <span className="font-medium text-elf-green">{kid.niceScore}%</span>
                    <span>Nice</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={kid.niceScore}
                    onChange={(e) => handleUpdateScore(kid.id, parseInt(e.target.value))}
                    disabled={loading === kid.id}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-elf-green"
                  />
                </div>

                {/* Quick Actions */}
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => handleUpdateScore(kid.id, Math.max(0, kid.niceScore - 5))}
                    disabled={loading === kid.id}
                    className="px-3 py-1 bg-red-100 text-red-600 rounded text-sm hover:bg-red-200"
                  >
                    -5 (Oops!)
                  </button>
                  <button
                    onClick={() => handleUpdateScore(kid.id, Math.min(100, kid.niceScore + 5))}
                    disabled={loading === kid.id}
                    className="px-3 py-1 bg-green-100 text-green-600 rounded text-sm hover:bg-green-200"
                  >
                    +5 (Good job!)
                  </button>
                  <button
                    onClick={() => handleUpdateScore(kid.id, 100)}
                    disabled={loading === kid.id}
                    className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded text-sm hover:bg-yellow-200"
                  >
                    Reset to 100
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
