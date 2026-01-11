export interface Navigation {
  id: number
  title: string
  slug: string
}

export interface Category {
  id: number
  title: string
  slug: string
  navigationId: number
}

export interface Product {
  id: number
  title: string
  price: number
  currency: string
  imageUrl?: string | null
}

export interface ProductDetail {
  description?: string | null
  specs?: Record<string, string>
  ratingsAvg?: number | null
  reviewsCount?: number | null
}

export interface ProductWithDetail extends Product {
  detail?: ProductDetail | null
}
