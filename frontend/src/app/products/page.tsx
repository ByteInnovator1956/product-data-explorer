import { fetcher } from '@/lib/api'
import { Product } from '@/types/index'
import Link from 'next/link'

interface Props {
  searchParams: Promise<{
    categoryId?: string
  }>
}

export default async function ProductsPage({ searchParams }: Props) {
  const { categoryId } = await searchParams

  if (!categoryId) {
    return <p className="text-gray-500">No category selected.</p>
  }

  const products = await fetcher<Product[]>(
    `/api/products?categoryId=${categoryId}`,
  )

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="bg-white border rounded-lg p-3 hover:shadow-lg transition flex flex-col"
            >
              <div className="aspect-[3/4] bg-gray-100 mb-2 flex items-center justify-center">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="object-cover h-full w-full"
                  />
                ) : (
                  <span className="text-sm text-gray-400">No Image</span>
                )}
              </div>

              <h2 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
                {product.title}
              </h2>

              <p className="text-sm text-gray-600">
                {product.price > 0
                  ? `£${product.price}`
                  : 'Price varies by condition'}
              </p>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
