import { prisma } from './db.js';

export async function fetchUsuario() {
  const data = await prisma.usuario.findMany({
    select: {
      id: true,
      primerNombre: true,
      segundoNombre: true,
      primerApellido: true,
      segundoApellido: true,
      tipoDocumento: true,
      documento: true,
      telefono: true,
      celular: true,
      email: true,
      direccion: true,
      estado: true,
      tipo: true,
      createdAt: true,
      updatedAt: true,
      password: true,
    },
  });
  return data;
}

export async function fetchSeccion() {
  const data = await prisma.seccion.findMany({
    select: {
      id: true,
      nombre: true,
      nit: true,
      direccion: true,
      telefono: true,
      municipio: true,
      departamento: true,
      pais: true,
      web: true,
      email: true,
      resolucionPosesion: true,
      fechaPosesion: true,
      estado: true,
      saldoDisponible: true,
      createdAt: true,
      updatedAt: true,
      entidadId: true,
      usuarioId: true,
    },
  });
  return data;
}

export async function fetchRubro() {
  const data = await prisma.rubro.findMany({
    select: {
      id: true,
      descripcion: true,
    },
  });
  return data;
}

export async function fetchProveedor() {
  const data = await prisma.proveedor.findMany({
    select: {
      id: true,
      nombre: true,
      nit: true,
      direccion: true,
      email: true,
      telefono: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return data;
}

export async function fetchProductoProveedor() {
  const data = await prisma.productoproveedor.findMany({
    select: {
      valor: true,
      productoCotizacionId: true,
      proveedorId: true,
    },
  });
  return data;
}

export async function fetchProductoCotizacion() {
  const data = await prisma.productocotizacion.findMany({
    select: {
      id: true,
      productoId: true,
      cantidad: true,
      cotizacionId: true,
    },
  });
  return data;
}

const ITEMS_PER_PAGE = 6;
export async function fetchProducto(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const data = await prisma.producto.findMany({
    skip: offset,
    take: ITEMS_PER_PAGE,
    where: {
      descripcion: {
        contains: query,
        mode: 'insensitive',
      },
    },
    orderBy: {
      descripcion: 'asc',
    },
  });
  return data;
}

export async function fetchProductoPages(query: string) {
  const data = await prisma.producto.count({
    where: {
      descripcion: {
        contains: query,
        mode: 'insensitive',
      },
    },
    orderBy: {
      descripcion: 'asc',
    },
  });
  const totalPages = Math.ceil(data / ITEMS_PER_PAGE);
  return data;
}

export async function fetchEntidad() {
  const data = await prisma.entidad.findMany({
    select: {
      id: true,
      nombre: true,
      nit: true,
      direccion: true,
      telefono: true,
      municipio: true,
      departamento: true,
      pais: true,
      web: true,
      email: true,
      resolucionPosesion: true,
      fechaPosesion: true,
      estado: true,
      saldoDisponible: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return data;
}

export async function fetchCotizacion() {
  const data = await prisma.cotizacion.findMany({
    select: {
      id: true,
      fecha: true,
      estado: true,
      valorTotal: true,
      createdAt: true,
      updatedAt: true,
      seccionId: true,
      usuarioId: true,
      cicloContratacionId: true,
    },
  });
  return data;
}

export async function fetchCicloContratacion() {
  const data = await prisma.ciclocontratacion.findMany({
    select: {
      id: true,
      fecha: true,
      estado: true,
      valorTotal: true,
      createdAt: true,
      updatedAt: true,
      seccionId: true,
      usuarioId: true,
      cicloContratacionId: true,
    },
  });
  return data;
}
