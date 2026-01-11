import { fetcher } from '@/lib/api'
import { ProductWithDetail } from '@/types/index'

interface Props {
  params: Promise<{
    productId: string
  }>
}

export default async function ProductDetailPage({ params }: Props) {
  const { productId } = await params

  const product = await fetcher<ProductWithDetail>(
    `/api/products/${productId}`,
  )

  if (!product) {
    return (
      <main className="p-6">
        <p className="text-gray-500">Product not found.</p>
      </main>
    )
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>

      {/* Price */}
      <p className="text-lg text-gray-700 mb-4">
        {product.price > 0
          ? `£${product.price}`
          : 'Price varies by condition'}
      </p>

      {/* Description */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Description</h2>
        <p className="text-gray-700">
          {product.detail?.description || 'No description available.'}
        </p>
      </section>

      {/* Specs */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Details</h2>

        {product.detail?.specs &&
        Object.keys(product.detail.specs).length > 0 ? (
          <ul className="space-y-1 text-gray-700">
            {Object.entries(product.detail.specs).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No additional details.</p>
        )}
      </section>
    </main>
  )
}
