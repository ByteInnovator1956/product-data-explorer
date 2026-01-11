import { scrapeNavigation } from './navigation.scraper';

async function main() {
  const nav = await scrapeNavigation();
  console.log('Navigation items:', nav);
}

main().catch(console.error);
