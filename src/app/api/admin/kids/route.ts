import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'

export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    if (!data.name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const kid = await prisma.kid.create({
      data: {
        name: data.name,
        avatarUrl: data.avatarUrl || null,
        niceScore: data.niceScore ?? 100,
      },
    })

    return NextResponse.json(kid, { status: 201 })
  } catch (error) {
    console.error('Create kid error:', error)
    return NextResponse.json({ error: 'Failed to add kid' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const kids = await prisma.kid.findMany({
      orderBy: { name: 'asc' },
    })

    return NextResponse.json(kids)
  } catch (error) {
    console.error('Get kids error:', error)
    return NextResponse.json({ error: 'Failed to get kids' }, { status: 500 })
  }
}
