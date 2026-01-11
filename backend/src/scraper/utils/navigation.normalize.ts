const BASE_URL = 'https://www.worldofbooks.com';

export interface RawNavItem {
  title: string;
  slug: string;
}

export interface CleanNavItem {
  title: string;
  slug: string;
  sourceUrl: string;
}

export function normalizeNavigation(items: RawNavItem[]): CleanNavItem[] {
  const map = new Map<string, CleanNavItem>();

  for (const item of items) {
    const title = item.title.trim();
    const href = item.slug.trim();

    // ❌ ignore empty / anchor links
    if (!title || !href || href === '#' || href.endsWith('#')) {
      continue;
    }

    // 🌍 normalize URL
    const sourceUrl = href.startsWith('http') ? href : `${BASE_URL}${href}`;

    // 🧼 normalize slug (DB-safe & stable)
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // 🧠 dedupe by sourceUrl
    if (!map.has(sourceUrl)) {
      map.set(sourceUrl, {
        title,
        slug,
        sourceUrl,
      });
    }
  }

  return Array.from(map.values());
}
