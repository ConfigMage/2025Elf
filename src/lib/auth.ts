import { cookies } from 'next/headers'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

const SESSION_COOKIE_NAME = 'elf_admin_session'
const SESSION_EXPIRY_HOURS = 24

export async function createSession(): Promise<string> {
  const token = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + SESSION_EXPIRY_HOURS * 60 * 60 * 1000)

  await prisma.adminSession.create({
    data: {
      token: await bcrypt.hash(token, 10),
      expiresAt,
    },
  })

  // Clean up expired sessions
  await prisma.adminSession.deleteMany({
    where: { expiresAt: { lt: new Date() } },
  })

  return token
}

export async function validateSession(token: string): Promise<boolean> {
  const sessions = await prisma.adminSession.findMany({
    where: { expiresAt: { gt: new Date() } },
  })

  for (const session of sessions) {
    if (await bcrypt.compare(token, session.token)) {
      return true
    }
  }

  return false
}

export async function getSessionFromCookie(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get(SESSION_COOKIE_NAME)?.value || null
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await getSessionFromCookie()
  if (!token) return false
  return validateSession(token)
}

export async function deleteSession(token: string): Promise<void> {
  const sessions = await prisma.adminSession.findMany()
  for (const session of sessions) {
    if (await bcrypt.compare(token, session.token)) {
      await prisma.adminSession.delete({ where: { id: session.id } })
      break
    }
  }
}

export function verifyPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) {
    console.error('ADMIN_PASSWORD environment variable is not set')
    return false
  }
  return password === adminPassword
}

export { SESSION_COOKIE_NAME }
