const BASE_URL = 'https://www.worldofbooks.com';

export interface CleanProduct {
  sourceId: string;
  title: string;
  price: number;
  currency: string;
  imageUrl?: string;
  sourceUrl: string;
}

export function normalizeProducts(
  raw: { title: string; price: number; imageUrl?: string; href: string }[],
): CleanProduct[] {
  const map = new Map<string, CleanProduct>();

  for (const item of raw) {
    if (!item.title || !item.href) continue;

    const sourceUrl = item.href.startsWith('http')
      ? item.href
      : `${BASE_URL}${item.href}`;

    const sourceId = sourceUrl.split('/').pop() || sourceUrl;

    if (!map.has(sourceUrl)) {
      map.set(sourceUrl, {
        sourceId,
        title: item.title,
        price: item.price ?? 0,
        currency: 'GBP',
        imageUrl: item.imageUrl,
        sourceUrl,
      });
    }
  }

  return Array.from(map.values());
}
