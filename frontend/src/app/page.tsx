import { fetcher } from '@/lib/api'
import { Navigation } from '@/types/index'

export default async function HomePage() {
  const navigation = await fetcher<Navigation[]>('/api/navigation')

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Browse</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {navigation.map((nav) => (
          <a
            key={nav.id}
            href={`/categories/${nav.id}`}
            className="bg-white border rounded-lg p-4 hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <h2 className="font-medium text-gray-900">{nav.title}</h2>
          </a>
        ))}
      </div>
    </>
  )
}
