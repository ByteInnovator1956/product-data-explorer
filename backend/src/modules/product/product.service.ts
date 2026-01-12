import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { scrapeProducts } from '../../scraper/product.scraper';
import { normalizeProducts } from '../../scraper/utils/product.normalize';
import { scrapeProductDetail } from '../../scraper/product-detail.scraper';

const PRODUCT_CACHE_TTL_HOURS = 24;
const PRODUCT_DETAIL_TTL_HOURS = 24;

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  /**
   * STEP 6.4 — Fetch products by category (grid scraping)
   */
  async findByCategory(categoryId: number) {
    const existing = await this.prisma.product.findMany({
      where: { categoryId },
    });

    const needsRefresh =
      existing.length === 0 ||
      existing.some(
        (p) =>
          !p.lastScrapedAt ||
          Date.now() - p.lastScrapedAt.getTime() >
            PRODUCT_CACHE_TTL_HOURS * 60 * 60 * 1000,
      );

    if (!needsRefresh) {
      return existing;
    }

    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) return [];

    const raw = await scrapeProducts(category.sourceUrl);
    const clean = normalizeProducts(raw);

    for (const product of clean) {
      await this.prisma.product.upsert({
        where: { sourceUrl: product.sourceUrl },
        update: {
          title: product.title,
          price: product.price,
          currency: product.currency,
          imageUrl: product.imageUrl,
          lastScrapedAt: new Date(),
        },
        create: {
          ...product,
          categoryId,
          lastScrapedAt: new Date(),
        },
      });
    }

    return this.prisma.product.findMany({
      where: { categoryId },
      orderBy: { id: 'asc' },
    });
  }

  /**
   * Fetch single product (used by controller)
   */
  async findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: { detail: true },
    });
  }

  /**
   * STEP 6.5 — Enrich product with detail page data
   */
  async enrichProduct(productId: number) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      include: { detail: true },
    });

    if (!product) return null;

    const needsRefresh =
      !product.detail ||
      !product.lastScrapedAt ||
      Date.now() - product.lastScrapedAt.getTime() >
        PRODUCT_DETAIL_TTL_HOURS * 60 * 60 * 1000;

    if (!needsRefresh) return product;

    const detail = await scrapeProductDetail(product.sourceUrl);

    if (!detail) {
      return product;
    }

    await this.prisma.productDetail.upsert({
      where: { productId },
      update: {
        description: detail.description ?? null,
        specs: detail.specs ?? {},
      },
      create: {
        productId,
        description: detail.description ?? null,
        specs: detail.specs ?? {},
      },
    });

    await this.prisma.product.update({
      where: { id: productId },
      data: { lastScrapedAt: new Date() },
    });

    return this.prisma.product.findUnique({
      where: { id: productId },
      include: { detail: true },
    });
  }
}
