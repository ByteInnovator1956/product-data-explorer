import { PrismaClient } from '@prisma/client'
import { scrapeProducts } from './product.scraper'
import { normalizeProducts } from './utils/product.normalize'

const prisma = new PrismaClient()

async function run() {
  console.log('Seeding products...')

  const category = await prisma.category.findFirst({
    where: { slug: 'classics' },
  })

  if (!category) {
    console.log(' Category not found')
    return
  }

  const raw = await scrapeProducts(category.sourceUrl)
  const products = normalizeProducts(raw)

  console.log(`Found ${products.length} products`)

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

  console.log(' Products seeded successfully')
}

run()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })
