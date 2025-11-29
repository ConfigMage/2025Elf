import Link from 'next/link'

export const metadata = {
  title: 'Admin Portal | Sprinkles the Elf',
  description: 'Parent admin portal for managing elf content',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🔧</span>
              <div>
                <h1 className="text-xl font-bold">Admin Portal</h1>
                <p className="text-gray-400 text-sm">Parent Controls</p>
              </div>
            </div>

            <nav className="flex items-center space-x-4">
              <Link
                href="/admin"
                className="px-3 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/posts"
                className="px-3 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                Posts
              </Link>
              <Link
                href="/admin/kids"
                className="px-3 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                Kids
              </Link>
              <Link
                href="/admin/settings"
                className="px-3 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                Settings
              </Link>
              <Link
                href="/"
                className="px-3 py-2 bg-elf-green rounded hover:bg-green-700 transition-colors"
              >
                View Site
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
