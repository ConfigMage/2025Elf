import { redirect, notFound } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import EditPostForm from './EditPostForm'

export const dynamic = 'force-dynamic'

async function getPost(id: string) {
  try {
    return await prisma.elfPost.findUnique({ where: { id } })
  } catch {
    return null
  }
}

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    redirect('/admin/login')
  }

  const { id } = await params
  const post = await getPost(id)

  if (!post) {
    notFound()
  }

  return <EditPostForm post={post} />
}
