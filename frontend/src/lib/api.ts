const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('API error')
  }

  return res.json()
}
