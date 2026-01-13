
import { scrapeProducts } from '../scraper/product.scraper'
import { normalizeProducts } from '../scraper/utils/product.normalize'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function run() {
  const category = await prisma.category.findFirst({
    where: { slug: 'classics' },
  })

  if (!category) {
    console.log('Category not found')
    return
  }

  const raw = await scrapeProducts(category.sourceUrl)
  const products = normalizeProducts(raw)

  for (const product of products) {
    await prisma.product.upsert({
      where: { sourceUrl: product.sourceUrl },
      update: product,
      create: {
        ...product,
        categoryId: category.id,
      },
    })
  }

  console.log('✅ Products seeded')
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
