import { createCrawler } from './index';
import type { Page } from 'playwright';
import type { PlaywrightCrawlingContext } from 'crawlee';

export interface RawCategory {
  title: string;
  href: string;
}

export async function scrapeCategories(
  categoryPageUrl: string,
): Promise<RawCategory[]> {
  const results: RawCategory[] = [];
 if (process.env.DISABLE_CRAWLER === 'true') {
    console.log('🚫 scrapeCategories skipped (crawler disabled)');
    return [];
  }
  const crawler = createCrawler(
    async ({ page }: PlaywrightCrawlingContext<{ page: Page }>) => {
      await page.goto(categoryPageUrl, {
        waitUntil: 'domcontentloaded',
      });

      const categories = await page.$$eval(
        'a[href*="/collections/"]',
        (links: HTMLAnchorElement[]) =>
          links
            .map((link) => ({
              title: link.textContent?.trim() || '',
              href: link.getAttribute('href') || '',
            }))
            .filter((c) => c.title && c.href),
      );

      results.push(...categories);
    },
  );

  await crawler.run([{ url: categoryPageUrl }]);
  return results;
}
