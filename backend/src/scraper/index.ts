import { PlaywrightCrawler } from 'crawlee';

export function createCrawler(handler: (context: any) => Promise<void>) {
  return new PlaywrightCrawler({
    requestHandler: handler,
    maxConcurrency: 2,
    requestHandlerTimeoutSecs: 60,

    autoscaledPoolOptions: {
      systemInfoIntervalMillis: 0, // ✅ FIXES `spawn ps ENOENT`
    },

    launchContext: {
      launchOptions: {
        headless: true,
      },
    },
  });
}
