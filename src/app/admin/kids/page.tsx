import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import KidsManager from './KidsManager'

export const dynamic = 'force-dynamic'

async function getKids() {
  try {
    return await prisma.kid.findMany({
      orderBy: { name: 'asc' },
    })
  } catch {
    return []
  }
}

export default async function AdminKidsPage() {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    redirect('/admin/login')
  }

  const kids = await getKids()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Kids</h1>
        <p className="text-gray-500">Manage the kids and their nice scores</p>
      </div>

      <KidsManager initialKids={kids} />
    </div>
  )
}
