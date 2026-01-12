import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1️⃣ Navigation
  const fiction = await prisma.navigation.upsert({
    where: { title: 'Fiction' },
    update: {},
    create: {
      title: 'Fiction',
      sourceUrl: 'https://www.worldofbooks.com/en-gb/collections/fiction-books',
    },
  });

  const nonFiction = await prisma.navigation.upsert({
    where: { title: 'Non-Fiction' },
    update: {},
    create: {
      title: 'Non-Fiction',
      sourceUrl: 'https://www.worldofbooks.com/en-gb/collections/non-fiction-books',
    },
  });

  // 2️⃣ Categories
  await prisma.category.createMany({
    data: [
      {
        title: 'Classics',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/collections/classics',
        navigationId: fiction.id,
      },
      {
        title: 'Science',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/collections/science-books',
        navigationId: nonFiction.id,
      },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
