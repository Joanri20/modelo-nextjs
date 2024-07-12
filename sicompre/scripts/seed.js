const { PrismaClient } = require('@prisma/client');
//Esto se ejecuta una vez con npm run seed
const {
  assetGroups,
  assets,
  assetQuantities,
  purchasePlans,
  assetSuppliers,
  suppliers,
  quotationSuppliers,
  quotations,
  hiringCycles,
  entities,
  departments,
  users,
} = require('../app/lib/placeholder-data.js');

const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  await prisma.assetGroup.createMany({ data: assetGroups });
  await prisma.asset.createMany({ data: assets });
  await prisma.user.createMany({ data: users });
  await prisma.supplier.createMany({ data: suppliers });
  await prisma.entity.createMany({ data: entities });
  await prisma.department.createMany({ data: departments });
  await prisma.hiringCycle.createMany({ data: hiringCycles });
  await prisma.quotation.createMany({ data: quotations });
  await prisma.purchasePlan.createMany({ data: purchasePlans });
  await prisma.assetQuantity.createMany({ data: assetQuantities });
  await prisma.assetSupplier.createMany({ data: assetSuppliers });
  await prisma.quotationSupplier.createMany({
    data: quotationSuppliers,
  });
}

main()
  .then(() => console.log('Seed data inserted successfully'))
  .catch((e) => console.error('Error inserting seed data:', e))
  .finally(async () => await prisma.$disconnect());
