import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import SettingsForm from './SettingsForm'

export const dynamic = 'force-dynamic'

async function getSettings() {
  try {
    let settings = await prisma.settings.findUnique({ where: { id: 'main' } })
    if (!settings) {
      settings = await prisma.settings.create({
        data: { id: 'main' },
      })
    }
    return settings
  } catch {
    return null
  }
}

export default async function AdminSettingsPage() {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    redirect('/admin/login')
  }

  const settings = await getSettings()

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500">Configure the elf site</p>
      </div>

      {settings ? (
        <SettingsForm settings={settings} />
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-red-600">Failed to load settings. Please check your database connection.</p>
        </div>
      )}

      {/* Environment Variables Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-blue-800 mb-4">Environment Variables</h2>
        <p className="text-blue-700 text-sm mb-4">
          Some settings are configured via environment variables in Vercel:
        </p>
        <ul className="text-sm text-blue-600 space-y-2">
          <li>
            <code className="bg-blue-100 px-2 py-1 rounded">NEXT_PUBLIC_REVEAL_AT</code> - When the site reveals (ISO date)
          </li>
          <li>
            <code className="bg-blue-100 px-2 py-1 rounded">NEXT_PUBLIC_ELF_INTRO_VIDEO_URL</code> - Elf intro video URL
          </li>
          <li>
            <code className="bg-blue-100 px-2 py-1 rounded">ADMIN_PASSWORD</code> - Admin portal password
          </li>
        </ul>
      </div>
    </div>
  )
}
