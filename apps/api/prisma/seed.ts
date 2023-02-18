import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const assets = await prisma.accounting_types.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, name: '資産', side_id: 1, }
  });
  const expenses = await prisma.accounting_types.upsert({
    where: { id: 2 },
    update: {},
    create: { id: 2, name: '費用', side_id: 1, }
  });
  const liabilities = await prisma.accounting_types.upsert({
    where: { id: 3 },
    update: {},
    create: { id: 3, name: '負債', side_id: 2, }
  });
  const capital = await prisma.accounting_types.upsert({
    where: { id: 4 },
    update: {},
    create: { id: 4, name: '資本', side_id: 2, }
  });
  const income = await prisma.accounting_types.upsert({
    where: { id: 5 },
    update: {},
    create: { id: 5, name: '収益', side_id: 2, }
  });
  console.log({ assets, expenses, liabilities, capital, income });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })