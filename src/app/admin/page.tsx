import { redirect } from 'next/navigation'
import Link from 'next/link'
import { isAuthenticated } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

async function getStats() {
  try {
    const [postsCount, kidsCount, settings] = await Promise.all([
      prisma.elfPost.count(),
      prisma.kid.count(),
      prisma.settings.findUnique({ where: { id: 'main' } }),
    ])
    return { postsCount, kidsCount, settings }
  } catch {
    return { postsCount: 0, kidsCount: 0, settings: null }
  }
}

export default async function AdminDashboard() {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    redirect('/admin/login')
  }

  const { postsCount, kidsCount, settings } = await getStats()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500">Welcome back, Santa&apos;s helper!</p>
        </div>
        <form action="/api/admin/logout" method="POST">
          <button
            type="submit"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Logout
          </button>
        </form>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Posts</p>
              <p className="text-3xl font-bold text-gray-800">{postsCount}</p>
            </div>
            <span className="text-4xl">📝</span>
          </div>
          <Link
            href="/admin/posts"
            className="text-elf-red hover:underline text-sm mt-4 inline-block"
          >
            Manage posts →
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Kids Registered</p>
              <p className="text-3xl font-bold text-gray-800">{kidsCount}</p>
            </div>
            <span className="text-4xl">👧</span>
          </div>
          <Link
            href="/admin/kids"
            className="text-elf-red hover:underline text-sm mt-4 inline-block"
          >
            Manage kids →
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Elf Name</p>
              <p className="text-3xl font-bold text-gray-800">{settings?.elfName || 'Sprinkles'}</p>
            </div>
            <span className="text-4xl">🧝</span>
          </div>
          <Link
            href="/admin/settings"
            className="text-elf-red hover:underline text-sm mt-4 inline-block"
          >
            Edit settings →
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/admin/posts/new"
            className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-elf-green hover:bg-green-50 transition-colors"
          >
            <span className="text-3xl">➕</span>
            <div>
              <p className="font-semibold text-gray-800">Create New Post</p>
              <p className="text-sm text-gray-500">Add a new elf adventure</p>
            </div>
          </Link>

          <Link
            href="/"
            target="_blank"
            className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-elf-red hover:bg-red-50 transition-colors"
          >
            <span className="text-3xl">👀</span>
            <div>
              <p className="font-semibold text-gray-800">Preview Site</p>
              <p className="text-sm text-gray-500">See what the kids see</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-elf-green to-green-600 rounded-xl shadow-lg p-6 text-white">
        <h2 className="text-xl font-bold mb-4">🎄 Tips for Parents</h2>
        <ul className="space-y-2 text-green-100">
          <li>• Schedule posts ahead of time using the publish date feature</li>
          <li>• Update nice scores to encourage good behavior</li>
          <li>• Add photos of where you hide the elf each day</li>
          <li>• The countdown gate keeps the site hidden until reveal time</li>
        </ul>
      </div>
    </div>
  )
}
