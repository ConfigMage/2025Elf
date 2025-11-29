'use client'

import { useState, useRef } from 'react'

interface ImageUploadProps {
  currentImageUrl?: string | null
  onImageUploaded: (url: string) => void
}

export default function ImageUpload({ currentImageUrl, onImageUploaded }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError('')
    setUploading(true)

    // Show local preview immediately
    const localPreview = URL.createObjectURL(file)
    setPreviewUrl(localPreview)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Upload failed')
      }

      const { url } = await response.json()
      setPreviewUrl(url)
      onImageUploaded(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
      setPreviewUrl(currentImageUrl || null)
    } finally {
      setUploading(false)
      // Clean up local preview URL
      URL.revokeObjectURL(localPreview)
    }
  }

  const handleRemoveImage = () => {
    setPreviewUrl(null)
    onImageUploaded('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-3">
      {/* Preview */}
      {previewUrl && (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border border-gray-200"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
            title="Remove image"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Upload area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          uploading ? 'border-gray-300 bg-gray-50' : 'border-gray-300 hover:border-elf-green'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={handleFileSelect}
          disabled={uploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />

        {uploading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elf-green mb-2" />
            <p className="text-gray-500">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-2">📷</span>
            <p className="text-gray-600 font-medium">
              {previewUrl ? 'Click to change image' : 'Click or drag to upload image'}
            </p>
            <p className="text-gray-400 text-sm mt-1">JPEG, PNG, GIF, or WebP (max 4.5MB)</p>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {/* Manual URL input as fallback */}
      <details className="text-sm">
        <summary className="text-gray-500 cursor-pointer hover:text-gray-700">
          Or enter image URL manually
        </summary>
        <input
          type="url"
          placeholder="https://example.com/image.jpg"
          value={previewUrl || ''}
          onChange={(e) => {
            setPreviewUrl(e.target.value || null)
            onImageUploaded(e.target.value)
          }}
          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-elf-green focus:border-transparent"
        />
      </details>
    </div>
  )
}
