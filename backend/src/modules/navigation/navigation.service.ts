import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { scrapeNavigation } from '../../scraper/navigation.scraper';

const NAV_CACHE_TTL_HOURS = 24;

@Injectable()
export class NavigationService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const existing = await this.prisma.navigation.findMany();

    const oldestScrape = existing.reduce<Date | null>(
      (oldest, nav) =>
        !nav.lastScrapedAt
          ? null
          : !oldest || nav.lastScrapedAt < oldest
            ? nav.lastScrapedAt
            : oldest,
      null,
    );

    const needsRefresh =
      existing.length === 0 ||
      !oldestScrape ||
      Date.now() - oldestScrape.getTime() >
        NAV_CACHE_TTL_HOURS * 60 * 60 * 1000;

    if (!needsRefresh) {
      return existing;
    }

    const scraped = await scrapeNavigation();
    const now = new Date();

    await this.prisma.$transaction(
      scraped.map((nav) =>
        this.prisma.navigation.upsert({
          where: { slug: nav.slug },
          update: {
            title: nav.title,
            lastScrapedAt: now,
            sourceUrl: nav.sourceUrl,
          },
          create: {
            title: nav.title,
            slug: nav.slug,
            lastScrapedAt: now,
            sourceUrl: nav.sourceUrl,
          },
        }),
      ),
    );

    return this.prisma.navigation.findMany({
      orderBy: { id: 'asc' },
    });
  }
}
