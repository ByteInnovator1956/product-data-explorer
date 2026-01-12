import { PlaywrightCrawler } from 'crawlee';

export function createCrawler(handler: (context: any) => Promise<void>) {
  return new PlaywrightCrawler({
    requestHandler: handler,

    // 🔒 HARD DISABLE autoscaling system info
    autoscaledPoolOptions: {
      systemInfoIntervalMillis: 0,
    },

    maxConcurrency: 1,
    requestHandlerTimeoutSecs: 60,

    launchContext: {
      launchOptions: {
        headless: true,
      },
    },
  });
}
