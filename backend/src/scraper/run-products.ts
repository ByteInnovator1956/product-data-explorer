import { PrismaClient } from '@prisma/client';
import { scrapeProducts } from './product.scraper';
import { normalizeProducts } from './utils/product.normalize';

const prisma = new PrismaClient();

async function run() {
  console.log('Seeding products...');

  const categories = await prisma.category.findMany({
    where: {
      sourceUrl: { not: null },
    },
  });

  for (const category of categories) {
    console.log(`Scraping category: ${category.title}`);

    const raw = await scrapeProducts(category.sourceUrl!);
    const clean = normalizeProducts(raw);

    console.log(`Found ${clean.length} products`);

    for (const product of clean) {
      await prisma.product.upsert({
        where: { sourceUrl: product.sourceUrl },
        update: product,
        create: {
          ...product,
          categoryId: category.id,
        },
      });
    }
  }

  console.log('Products seeded successfully');
  await prisma.$disconnect();
}

run().catch(console.error);
