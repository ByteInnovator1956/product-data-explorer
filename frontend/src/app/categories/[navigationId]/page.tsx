import { fetcher } from '@/lib/api'
import { Category } from '@/types/index'

interface Props {
  params: Promise<{
    navigationId: string
  }>
}

export default async function CategoriesPage({ params }: Props) {
  const { navigationId } = await params

  const categories = await fetcher<Category[]>(
    `/api/categories/${navigationId}`,
  )

  return (
    <>
      <h2 className="font-medium text-gray-900">Categories</h2>

      {categories.length === 0 ? (
        <p className="text-gray-500">No categories found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/products?categoryId=${cat.id}`}
              className="bg-white border rounded-lg p-4 hover:shadow-md transition"
            >
              <span className="text-gray-900">
              {cat.title}
              </span>

            </a>
          ))}
        </div>
      )}
    </>
  )
}
