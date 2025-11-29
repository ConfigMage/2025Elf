import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create or update settings
  await prisma.settings.upsert({
    where: { id: 'main' },
    update: {},
    create: {
      id: 'main',
      elfName: 'Sprinkles',
      welcomeMessage: "Ho ho ho! Welcome to Sprinkles' magical corner! I'm Santa's special scout elf, here to watch over Ellie and Aniyah this holiday season!",
    },
  })

  // Create the kids
  await prisma.kid.upsert({
    where: { id: 'ellie' },
    update: {},
    create: {
      id: 'ellie',
      name: 'Ellie',
      niceScore: 100,
    },
  })

  await prisma.kid.upsert({
    where: { id: 'aniyah' },
    update: {},
    create: {
      id: 'aniyah',
      name: 'Aniyah',
      niceScore: 100,
    },
  })

  // Create some sample elf posts
  const today = new Date()

  await prisma.elfPost.upsert({
    where: { id: 'welcome-post' },
    update: {},
    create: {
      id: 'welcome-post',
      title: 'Sprinkles Has Arrived!',
      message: "Hello Ellie and Aniyah! I'm Sprinkles, your scout elf from the North Pole! Santa sent me to watch over you this Christmas season. I'll be hiding in different spots around your house - can you find me each morning? Remember, no touching! If you touch me, I might lose my magic! Be good, and I'll report wonderful things to Santa!",
      location: 'Living Room',
      publishDate: today,
      isPublished: true,
    },
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
