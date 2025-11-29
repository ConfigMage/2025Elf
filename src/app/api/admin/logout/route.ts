import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'
import { getSessionFromCookie, deleteSession, SESSION_COOKIE_NAME } from '@/lib/auth'

export async function POST() {
  try {
    const token = await getSessionFromCookie()
    if (token) {
      await deleteSession(token)
    }

    const cookieStore = await cookies()
    cookieStore.delete(SESSION_COOKIE_NAME)

    return NextResponse.redirect(new URL('/admin/login', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'))
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.redirect(new URL('/admin/login', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'))
  }
}
