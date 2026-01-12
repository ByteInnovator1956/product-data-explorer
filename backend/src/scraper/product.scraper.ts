import type { Page } from 'playwright';
import { createCrawler } from './index';

export interface RawProduct {
  title: string;
  price: number;
  imageUrl: string | undefined;
  href: string;
}

export async function scrapeProducts(
  categoryUrl: string,
): Promise<RawProduct[]> {
  const results: RawProduct[] = [];
 if (process.env.DISABLE_CRAWLER === 'true') {
    console.log('🚫 scrapeCategories skipped (crawler disabled)');
    return [];
  }
  const crawler = createCrawler(async ({ page }: { page: Page }) => {
    await page.goto(categoryUrl, {
      waitUntil: 'networkidle',
    });

    await page.waitForSelector('a[href*="/products/"]', { timeout: 15000 });

    const products = await page.$$eval('article, li, div', (nodes) =>
      nodes
        .map((node) => {
          const link = node.querySelector('a[href*="/products/"]');
          if (!link) return null;
          if (link.getAttribute('href')?.includes('plus')) return null;

          return {
            title:
              link.querySelector('img')?.getAttribute('alt') ??
              link.textContent?.trim() ??
              '',
            imageUrl:
              link.querySelector('img')?.getAttribute('src') ?? undefined,
            href: link.getAttribute('href') || '',
            price: 0,
          };
        })
        .filter((p): p is RawProduct => p !== null),
    );

    results.push(...products);
  });

  await crawler.run([{ url: categoryUrl }]);
  return results;
}
