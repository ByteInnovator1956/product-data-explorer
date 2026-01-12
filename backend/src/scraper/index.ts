import { PlaywrightCrawler } from 'crawlee';

export function createCrawler(handler: (context: any) => Promise<void>) {
  return new PlaywrightCrawler({
    requestHandler: handler,

    
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
