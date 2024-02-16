const { PrismaClient } = require('@prisma/client');
//Esto se ejecuta una vez con npm run seed
const {
  rubros,
  productos,
  proveedores,
  usuarios,
  productoProveedores,
  cotizaciones,
  cicloContrataciones,
  secciones,
  entidades,
  productoCotizaciones,
} = require('../app/lib/placeholder-data.js');

const bcrypt = require('bcrypt');

async function seedRubro(prisma) {
  try {
    // Insert data into the "Rubro" table
    const insertedRubros = await Promise.all(
      rubros.map(async (rubro) => {
        return prisma.rubro.create({
          data: {
            id: rubro.id,
            descripcion: rubro.descripcion,
          },
        });
      }),
    );

    console.log(`Seeded ${insertedRubros.length} rubros`);

    return {
      rubros: insertedRubros,
    };
  } catch (error) {
    console.error('Error seeding Rubros:', error);
    throw error;
  }
}

async function seedProducto(prisma) {
  try {
    // Insert data into the "Producto" table
    const insertedProductos = await Promise.all(
      productos.map(async (producto) => {
        return prisma.producto.create({
          data: {
            id: producto.id,
            descripcion: producto.descripcion,
            rubroId: producto.rubroId,
            valorVigente: producto.valorVigente,
          },
        });
      }),
    );

    console.log(`Seeded ${insertedProductos.length} productos`);

    return {
      productos: insertedProductos,
    };
  } catch (error) {
    console.error('Error seeding producto:', error);
    throw error;
  }
}

async function seedProveedor(prisma) {
  try {
    // Insert data into the "Proveedor" table
    const insertedProveedores = await Promise.all(
      proveedores.map(async (proveedor) => {
        return prisma.proveedor.create({
          data: {
            id: proveedor.id,
            nombre: proveedor.nombre,
            nit: proveedor.nit,
            direccion: proveedor.direccion,
            email: proveedor.email,
            telefono: proveedor.telefono,
          },
        });
      }),
    );

    console.log(`Seeded ${insertedProveedores.length} proveedores`);

    return {
      proveedores: insertedProveedores,
    };
  } catch (error) {
    console.error('Error seeding proveedor:', error);
    throw error;
  }
}

async function seedEntidad(prisma) {
  try {
    // Insert data into the "Entidad" table
    const insertedEntidades = await Promise.all(
      entidades.map(async (entidad) => {
        return prisma.entidad.create({
          data: {
            id: entidad.id,
            nombre: entidad.nombre,
            nit: entidad.nit,
            direccion: entidad.direccion,
            telefono: entidad.telefono,
            municipio: entidad.municipio,
            departamento: entidad.departamento,
            pais: entidad.pais,
            web: entidad.web,
            email: entidad.email,
            resolucionPosesion: entidad.resolucionPosesion,
            fechaPosesion: entidad.fechaPosesion,
            estado: entidad.estado,
            saldoDisponible: entidad.saldoDisponible,
          },
        });
      }),
    );

    console.log(`Seeded ${insertedEntidades.length} entidades`);

    return {
      entidades: insertedEntidades,
    };
  } catch (error) {
    console.error('Error seeding entidad:', error);
    throw error;
  }
}

async function seedSeccion(prisma) {
  try {
    // Insert data into the "Seccion" table
    const insertedSecciones = await Promise.all(
      secciones.map(async (seccion) => {
        return prisma.seccion.create({
          data: {
            id: seccion.id,
            nombre: seccion.nombre,
            nit: seccion.nit,
            direccion: seccion.direccion,
            telefono: seccion.telefono,
            municipio: seccion.municipio,
            departamento: seccion.departamento,
            pais: seccion.pais,
            web: seccion.web,
            email: seccion.email,
            resolucionPosesion: seccion.resolucionPosesion,
            fechaPosesion: seccion.fechaPosesion,
            estado: seccion.estado,
            entidadId: seccion.entidadId,
            saldoDisponible: seccion.saldoDisponible,
            usuarioId: seccion.usuarioId,
          },
        });
      }),
    );

    console.log(`Seeded ${insertedSecciones.length} secciones`);

    return {
      secciones: insertedSecciones,
    };
  } catch (error) {
    console.error('Error seeding seccion:', error);
    throw error;
  }
}

async function seedUsuario(prisma) {
  try {
    // Insert data into the "Usuario" table
    const insertedUsuarios = await Promise.all(
      usuarios.map(async (usuario) => {
        const hashedPassword = await bcrypt.hash(usuario.password, 10);
        return prisma.usuario.create({
          data: {
            id: usuario.id,
            primerNombre: usuario.primerNombre,
            segundoNombre: usuario.segundoNombre,
            primerApellido: usuario.primerApellido,
            segundoApellido: usuario.segundoApellido,
            tipoDocumento: usuario.tipoDocumento,
            documento: usuario.documento,
            telefono: usuario.telefono,
            celular: usuario.celular,
            email: usuario.email,
            direccion: usuario.direccion,
            estado: usuario.estado,
            tipo: usuario.tipo,
            password: hashedPassword,
          },
        });
      }),
    );

    console.log(`Seeded ${insertedUsuarios.length} usuarios`);

    return {
      usuarios: insertedUsuarios,
    };
  } catch (error) {
    console.error('Error seeding usuario:', error);
    throw error;
  }
}

async function seedCicloContratacion(prisma) {
  try {
    // Insert data into the "CicloContratacion" table
    const insertedCicloContrataciones = await Promise.all(
      cicloContrataciones.map(async (cicloContratacion) => {
        return prisma.cicloContratacion.create({
          data: {
            id: cicloContratacion.id,
            fechaInicio: cicloContratacion.fechaInicio,
            fechaFinal: cicloContratacion.fechaFinal,
            usuarioId: cicloContratacion.usuarioId,
            entidadId: cicloContratacion.entidadId,
          },
        });
      }),
    );

    console.log(
      `Seeded ${insertedCicloContrataciones.length} cicloContrataciones`,
    );

    return {
      cicloContrataciones: insertedCicloContrataciones,
    };
  } catch (error) {
    console.error('Error seeding ciclo contratacion:', error);
    throw error;
  }
}

async function seedCotizacion(prisma) {
  try {
    // Insert data into the "Cotizacion" table
    const insertedCotizaciones = await Promise.all(
      cotizaciones.map(async (cotizacion) => {
        return prisma.cotizacion.create({
          data: {
            id: cotizacion.id,
            fecha: cotizacion.fecha,
            estado: cotizacion.estado,
            valorTotal: cotizacion.valorTotal,
            seccionId: cotizacion.seccionId,
            usuarioId: cotizacion.usuarioId,
            cicloContratacionId: cotizacion.cicloContratacionId,
          },
        });
      }),
    );

    console.log(`Seeded ${insertedCotizaciones.length} cotizaciones`);

    return {
      cotizaciones: insertedCotizaciones,
    };
  } catch (error) {
    console.error('Error seeding cotizacion:', error);
    throw error;
  }
}
async function seedProductoProveedor(prisma) {
  try {
    // Insert data into the "ProductoProveedor" table
    const insertedProductoProveedores = await Promise.all(
      productoProveedores.map(async (productoProveedor) => {
        return prisma.productoProveedor.create({
          data: {
            productoCotizacionId: productoProveedor.productoCotizacionId,
            proveedorId: productoProveedor.proveedorId,
            valor: productoProveedor.valor,
          },
        });
      }),
    );

    console.log(
      `Seeded ${insertedProductoProveedores.length} productoProveedores`,
    );

    return {
      productoProveedores: insertedProductoProveedores,
    };
  } catch (error) {
    console.error('Error seeding producto proveedor:', error);
    throw error;
  }
}

async function seedProductoCotizacion(prisma) {
  try {
    // Insert data into the "ProductoCotizacion" table
    const insertedProductoCotizaciones = await Promise.all(
      productoCotizaciones.map(async (productoCotizacion) => {
        return prisma.productoCotizacion.create({
          data: {
            id: productoCotizacion.id,
            productoId: productoCotizacion.productoId,
            cantidad: productoCotizacion.cantidad,
            cotizacionId: productoCotizacion.cotizacionId,
          },
        });
      }),
    );

    console.log(
      `Seeded ${insertedProductoCotizaciones.length} productoCotizaciones`,
    );

    return {
      productoCotizaciones: insertedProductoCotizaciones,
    };
  } catch (error) {
    console.error('Error seeding producto por cotizacion:', error);
    throw error;
  }
}

async function main() {
  const client = await new PrismaClient();

  await seedRubro(client);
  // await seedProducto(client);
  // await seedProveedor(client);
  // await seedUsuario(client);
  // await seedEntidad(client);
  // await seedSeccion(client);
  // await seedCicloContratacion(client);
  // await seedCotizacion(client);
  // await seedProductoCotizacion(client);
  // await seedProductoProveedor(client);

  await client.$disconnect;
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
