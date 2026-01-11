import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { scrapeCategories } from '../../scraper/category.scraper';
import { normalizeCategories } from '../../scraper/utils/category.normalize';

const CAT_CACHE_TTL_HOURS = 24;

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async findByNavigation(navigationId: number) {
    const existing = await this.prisma.category.findMany({
      where: { navigationId },
    });

    const needsRefresh =
      existing.length === 0 ||
      existing.some(
        (c) =>
          !c.lastScrapedAt ||
          Date.now() - c.lastScrapedAt.getTime() >
            CAT_CACHE_TTL_HOURS * 60 * 60 * 1000,
      );

    if (!needsRefresh) {
      return existing;
    }

    const navigation = await this.prisma.navigation.findUnique({
      where: { id: navigationId },
    });

    if (!navigation || !navigation.sourceUrl) {
      return [];
    }
    const { sourceUrl } = navigation;

    const raw = await scrapeCategories(sourceUrl);
    const clean = normalizeCategories(raw);

    for (const cat of clean) {
      await this.prisma.category.upsert({
        where: {
          slug_navigationId: {
            slug: cat.slug,
            navigationId,
          },
        },
        update: {
          title: cat.title,
          sourceUrl: cat.sourceUrl,
          lastScrapedAt: new Date(),
        },
        create: {
          title: cat.title,
          slug: cat.slug,
          sourceUrl: cat.sourceUrl,
          navigationId,
          lastScrapedAt: new Date(),
        },
      });
    }

    return this.prisma.category.findMany({
      where: { navigationId },
      orderBy: { id: 'asc' },
    });
  }
}
