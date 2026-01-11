const BASE_URL = 'https://www.worldofbooks.com';

export interface CleanCategory {
  title: string;
  slug: string;
  sourceUrl: string;
}

export function normalizeCategories(
  raw: { title: string; href: string }[],
): CleanCategory[] {
  const map = new Map<string, CleanCategory>();

  for (const item of raw) {
    const title = item.title.trim();
    const href = item.href.trim();

    if (!title || !href || href === '#' || href.endsWith('#')) {
      continue;
    }

    const sourceUrl = href.startsWith('http') ? href : `${BASE_URL}${href}`;

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    if (!map.has(sourceUrl)) {
      map.set(sourceUrl, { title, slug, sourceUrl });
    }
  }

  return Array.from(map.values());
}
