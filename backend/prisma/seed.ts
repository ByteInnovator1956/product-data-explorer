import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // --------------------
  // Navigation
  // --------------------
  const fiction = await prisma.navigation.upsert({
    where: { slug: 'fiction' },
    update: {},
    create: {
      title: 'Fiction',
      slug: 'fiction',
      sourceUrl: 'https://www.worldofbooks.com/en-gb/collections/fiction-books',
    },
  });

  const nonFiction = await prisma.navigation.upsert({
    where: { slug: 'non-fiction' },
    update: {},
    create: {
      title: 'Non-Fiction',
      slug: 'non-fiction',
      sourceUrl: 'https://www.worldofbooks.com/en-gb/collections/non-fiction-books',
    },
  });

  // --------------------
  // Categories
  // --------------------
  await prisma.category.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Classics',
        slug: 'classics',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/collections/classics-books',
        navigationId: fiction.id,
      },
      {
        title: 'Science',
        slug: 'science',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/collections/science-books',
        navigationId: nonFiction.id,
      },
    ],
  });

  console.log('✅ Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
