import { redirect } from 'next/navigation'
import Link from 'next/link'
import { isAuthenticated } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatPostDate } from '@/lib/utils'
import DeletePostButton from './DeletePostButton'

export const dynamic = 'force-dynamic'

async function getPosts() {
  try {
    return await prisma.elfPost.findMany({
      orderBy: { publishDate: 'desc' },
    })
  } catch {
    return []
  }
}

export default async function AdminPostsPage() {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    redirect('/admin/login')
  }

  const posts = await getPosts()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Elf Posts</h1>
          <p className="text-gray-500">Manage Sprinkles&apos; adventures</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="px-4 py-2 bg-elf-green text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          + New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <span className="text-6xl block mb-4">📝</span>
          <p className="text-gray-600 mb-4">No posts yet. Create your first elf adventure!</p>
          <Link
            href="/admin/posts/new"
            className="inline-block px-6 py-3 bg-elf-red text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Create First Post
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-800">{post.title}</p>
                      {post.location && (
                        <p className="text-sm text-gray-500">📍 {post.location}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatPostDate(post.publishDate)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        post.isPublished
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {post.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link
                      href={`/admin/posts/${post.id}`}
                      className="text-elf-red hover:underline text-sm"
                    >
                      Edit
                    </Link>
                    <DeletePostButton postId={post.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
