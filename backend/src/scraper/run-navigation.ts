import { scrapeNavigation } from './navigation.scraper';

async function main() {
  if (process.env.DISABLE_CRAWLER === 'true') {
    console.log('🚫 Navigation scraper disabled');
    return;
  }

  const nav = await scrapeNavigation();
  console.log('Navigation items:', nav);
}

main().catch(console.error);
