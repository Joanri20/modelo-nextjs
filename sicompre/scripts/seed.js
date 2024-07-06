const { PrismaClient } = require('@prisma/client');
//Esto se ejecuta una vez con npm run seed
const {
  gruposBienes,
  bienes,
  usuarios,
  proveedores,
  entidades,
  dependencias,
  ciclosContratacion,
  cotizaciones,
  bienCantidades,
  planesDeCompras,
  bienProveedores,
  cotizacionesProveedores,
} = require('../app/lib/placeholder-data.js');

const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  await prisma.grupoBien.createMany({ data: gruposBienes });
  await prisma.bien.createMany({ data: bienes });
  await prisma.usuario.createMany({ data: usuarios });
  await prisma.proveedor.createMany({ data: proveedores });
  await prisma.entidad.createMany({ data: entidades });
  await prisma.dependencia.createMany({ data: dependencias });
  await prisma.cicloContratacion.createMany({ data: ciclosContratacion });
  await prisma.cotizacion.createMany({ data: cotizaciones });
  await prisma.bienCantidad.createMany({ data: bienCantidades });
  await prisma.planDeCompras.createMany({ data: planesDeCompras });
  await prisma.bienProveedor.createMany({ data: bienProveedores });
  await prisma.cotizacionProveedor.createMany({
    data: cotizacionesProveedores,
  });
}

main()
  .then(() => console.log('Seed data inserted successfully'))
  .catch((e) => console.error('Error inserting seed data:', e))
  .finally(async () => await prisma.$disconnect());
