import { createCrawler } from './index';
import { normalizeNavigation } from './utils/navigation.normalize';
import type { Page } from 'playwright';
import type { PlaywrightCrawlingContext } from 'crawlee';

export async function scrapeNavigation() {
  const raw: { title: string; slug: string }[] = [];
 if (process.env.DISABLE_CRAWLER === 'true') {
    console.log('🚫 scrapeCategories skipped (crawler disabled)');
    return [];
  }
  const crawler = createCrawler(
    async ({ page }: PlaywrightCrawlingContext<{ page: Page }>) => {
      const navItems = await page.$$eval(
        'nav a',
        (links: HTMLAnchorElement[]) =>
          links.map((link) => ({
            title: link.textContent?.trim() || '',
            slug: link.getAttribute('href') || '',
          })),
      );

      raw.push(...navItems);
    },
  );

  await crawler.run([{ url: 'https://www.worldofbooks.com/en-gb' }]);

  return normalizeNavigation(raw);
}
