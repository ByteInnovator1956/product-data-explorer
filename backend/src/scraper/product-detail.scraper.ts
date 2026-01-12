import type { Page } from 'playwright';
import { createCrawler } from './index';

export interface RawProductDetail {
  description?: string;
  specs?: Record<string, string>;
  ratingsAvg?: number;
  reviewsCount?: number;
}

export async function scrapeProductDetail(
  productUrl: string,
): Promise<RawProductDetail | null> {
  let result: RawProductDetail = {};

  if (process.env.DISABLE_CRAWLER === 'true') {
    console.log('🚫 scrapeProductDetail skipped (crawler disabled)');
    return null;
  }

  const crawler = createCrawler(async ({ page }: { page: Page }) => {
    await page.goto(productUrl, {
      waitUntil: 'networkidle',
    });

    const description = await page
      .$eval('[data-testid="product-description"]', (el) =>
        el.textContent?.trim(),
      )
      .catch(() => undefined);

    const specs = await page
      .$$eval('[data-testid="product-specs"] li', (items) => {
        const data: Record<string, string> = {};
        items.forEach((item) => {
          const key = item.querySelector('strong')?.textContent?.trim();
          const value = item.querySelector('span')?.textContent?.trim();
          if (key && value) data[key] = value;
        });
        return data;
      })
      .catch(() => undefined);

    result = { description, specs };
  });

  await crawler.run([{ url: productUrl }]);
  return result;
}
