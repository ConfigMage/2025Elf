import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
import { isAuthenticated } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    const settings = await prisma.settings.upsert({
      where: { id: 'main' },
      update: {
        elfName: data.elfName || 'Sprinkles',
        welcomeMessage: data.welcomeMessage || '',
        elfIntroVideoUrl: data.elfIntroVideoUrl || null,
      },
      create: {
        id: 'main',
        elfName: data.elfName || 'Sprinkles',
        welcomeMessage: data.welcomeMessage || '',
        elfIntroVideoUrl: data.elfIntroVideoUrl || null,
      },
    })

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Update settings error:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const settings = await prisma.settings.findUnique({
      where: { id: 'main' },
    })

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Get settings error:', error)
    return NextResponse.json({ error: 'Failed to get settings' }, { status: 500 })
  }
}
