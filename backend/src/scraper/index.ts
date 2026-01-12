import { PlaywrightCrawler } from 'crawlee';

export function createCrawler(handler: (context: any) => Promise<void>) {
  return new PlaywrightCrawler({
    requestHandler: handler,
    maxConcurrency: 1,
    requestHandlerTimeoutSecs: 60,
    launchContext: {
      launchOptions: {
        headless: true,
      },
    },
  });
}
