import Link from 'next/link'

interface HeaderProps {
  elfName?: string
}

export default function Header({ elfName = 'Sprinkles' }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-elf-red to-red-700 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            <span className="text-4xl">🧝</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-festive">
                {elfName}&apos;s Corner
              </h1>
              <p className="text-red-200 text-sm">Santa&apos;s Official Scout Elf</p>
            </div>
          </Link>

          <nav className="flex items-center space-x-4">
            <Link
              href="/"
              className="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              Home
            </Link>
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
              <span>🎄</span>
              <span className="hidden md:inline">Happy Holidays!</span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
