import { scrapeCategories } from './category.scraper';

async function run() {
  const data = await scrapeCategories(
    'https://www.worldofbooks.com/en-gb/collections/fiction-books',
  );
  console.log('TOTAL LINKS FOUND:', data.length);
}

run();
