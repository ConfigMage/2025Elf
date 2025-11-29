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

    if (!data.title || !data.message || !data.publishDate) {
      return NextResponse.json({ error: 'Title, message, and publish date are required' }, { status: 400 })
    }

    const post = await prisma.elfPost.create({
      data: {
        title: data.title,
        message: data.message,
        location: data.location || null,
        imageUrl: data.imageUrl || null,
        publishDate: new Date(data.publishDate),
        isPublished: data.isPublished ?? true,
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Create post error:', error)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const posts = await prisma.elfPost.findMany({
      orderBy: { publishDate: 'desc' },
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Get posts error:', error)
    return NextResponse.json({ error: 'Failed to get posts' }, { status: 500 })
  }
}
