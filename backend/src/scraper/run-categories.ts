import { scrapeCategories } from './category.scraper';

async function run() {
async function run() {
  if (process.env.DISABLE_CRAWLER === 'true') {
    console.log('🚫 Crawler disabled in production');
    return;
  }

  const data = await scrapeCategories(
    'https://www.worldofbooks.com/en-gb/collections/fiction-books',
  );
}
}

run();
