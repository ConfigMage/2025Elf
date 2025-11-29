import { prisma } from '@/lib/prisma'
import CountdownGate from '@/components/CountdownGate'
import Header from '@/components/Header'
import ElfPostCard from '@/components/ElfPostCard'
import ElfIntroVideo from '@/components/ElfIntroVideo'
import NiceScoreCard from '@/components/NiceScoreCard'
import Snowflakes from '@/components/Snowflakes'

export const dynamic = 'force-dynamic'

async function getSettings() {
  try {
    const settings = await prisma.settings.findUnique({
      where: { id: 'main' },
    })
    return settings
  } catch {
    return null
  }
}

async function getPosts() {
  try {
    const now = new Date()
    const posts = await prisma.elfPost.findMany({
      where: {
        isPublished: true,
        publishDate: { lte: now },
      },
      orderBy: { publishDate: 'desc' },
    })
    return posts
  } catch {
    return []
  }
}

async function getKids() {
  try {
    const kids = await prisma.kid.findMany({
      orderBy: { name: 'asc' },
    })
    return kids
  } catch {
    return []
  }
}

export default async function HomePage() {
  const [settings, posts, kids] = await Promise.all([
    getSettings(),
    getPosts(),
    getKids(),
  ])

  const elfName = settings?.elfName || 'Sprinkles'
  const videoUrl = settings?.elfIntroVideoUrl || process.env.NEXT_PUBLIC_ELF_INTRO_VIDEO_URL
  const welcomeMessage = settings?.welcomeMessage

  return (
    <CountdownGate>
      <div className="min-h-screen bg-gradient-to-b from-snow to-blue-50">
        <Snowflakes />
        <Header elfName={elfName} />

        <main className="max-w-6xl mx-auto px-4 py-8">
          {/* Welcome Banner */}
          <section className="bg-gradient-to-r from-elf-red to-elf-green rounded-2xl p-8 mb-8 text-white text-center shadow-xl">
            <div className="text-6xl mb-4">🧝✨🎄</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-festive">
              Welcome to {elfName}&apos;s Magical Corner!
            </h1>
            {welcomeMessage && (
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                {welcomeMessage}
              </p>
            )}
          </section>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content - Posts Feed */}
            <div className="lg:col-span-2 space-y-6">
              {/* Intro Video */}
              {videoUrl && (
                <ElfIntroVideo videoUrl={videoUrl} elfName={elfName} />
              )}

              {/* Posts */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                  <span>📝</span>
                  <span>{elfName}&apos;s Adventures</span>
                </h2>

                {posts.length === 0 ? (
                  <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
                    <span className="text-6xl block mb-4">🧝</span>
                    <p className="text-gray-600 text-lg">
                      {elfName} is getting ready for the first adventure!
                      <br />
                      Check back soon!
                    </p>
                  </div>
                ) : (
                  posts.map((post) => (
                    <ElfPostCard
                      key={post.id}
                      title={post.title}
                      message={post.message}
                      imageUrl={post.imageUrl}
                      location={post.location}
                      publishDate={post.publishDate}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Nice Score */}
              {kids.length > 0 && <NiceScoreCard kids={kids} />}

              {/* Fun Facts */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-center">
                  <h2 className="text-xl font-bold text-white">
                    ❄️ Elf Fun Facts ❄️
                  </h2>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">🔮</span>
                    <p className="text-gray-600 text-sm">
                      Scout elves get their magic from Santa&apos;s belief in Christmas spirit!
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">✈️</span>
                    <p className="text-gray-600 text-sm">
                      Every night, scout elves fly back to the North Pole to report to Santa.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">⚠️</span>
                    <p className="text-gray-600 text-sm">
                      Remember: Don&apos;t touch your elf! They might lose their magic!
                    </p>
                  </div>
                </div>
              </div>

              {/* Rules */}
              <div className="bg-gradient-to-b from-elf-red to-red-700 rounded-2xl p-6 text-white shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-center">
                  🎅 Elf Rules 🎅
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-2">
                    <span>1️⃣</span>
                    <span>No touching the elf!</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span>2️⃣</span>
                    <span>Look for me each morning</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span>3️⃣</span>
                    <span>Be kind to each other</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span>4️⃣</span>
                    <span>Have fun this season!</span>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-elf-green to-green-700 text-white py-8 mt-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-2xl mb-2">🎄 🧝 ❄️ 🎁 🎅</p>
            <p className="text-green-100">
              Made with magic from the North Pole
            </p>
            <p className="text-green-200 text-sm mt-2">
              © {new Date().getFullYear()} {elfName}&apos;s Corner
            </p>
          </div>
        </footer>
      </div>
    </CountdownGate>
  )
}
