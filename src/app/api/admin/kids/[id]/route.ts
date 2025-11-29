import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const data = await request.json()

    const kid = await prisma.kid.update({
      where: { id },
      data: {
        name: data.name,
        avatarUrl: data.avatarUrl,
        niceScore: data.niceScore,
      },
    })

    return NextResponse.json(kid)
  } catch (error) {
    console.error('Update kid error:', error)
    return NextResponse.json({ error: 'Failed to update kid' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    await prisma.kid.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete kid error:', error)
    return NextResponse.json({ error: 'Failed to delete kid' }, { status: 500 })
  }
}
