import { PlaywrightCrawler } from 'crawlee';

export function createCrawler(handler: any) {
  return new PlaywrightCrawler({
    requestHandler: handler,

    // 🔥 CRITICAL FIX FOR RAILWAY
    useSessionPool: false,
    maxConcurrency: 1,

    launchContext: {
      launchOptions: {
        headless: true,
      },
    },
  });
}
