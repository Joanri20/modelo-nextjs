import prisma from '@lib/db';

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

export async function fetchGrupoBien() {
  const data = await prisma.grupoBien.findMany({
    distinct: ['descripcion'],
  });
  return data;
}

export async function fetchProveedorById(id: string | undefined) {
  const data = await prisma.proveedor.findMany({
    where: {
      id: id,
    },
  });

  return data;
}

export async function fetchProveedor(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const data = await prisma.proveedor.findMany({
    skip: offset,
    take: ITEMS_PER_PAGE,
    where: {
      OR: [
        {
          nombre: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          email: {
            contains: query,
            mode: 'insensitive',
          },
        },
        { nit: query },
      ],
    },
    orderBy: {
      nombre: 'asc',
    },
    include: {
      cotizaciones: true,
    },
  });
  return data;
}

export async function fetchProveedorPages(query: string) {
  const data = await prisma.proveedor.count({
    where: {
      OR: [
        {
          nombre: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          email: {
            contains: query,
            mode: 'insensitive',
          },
        },
        { nit: query },
      ],
    },
    orderBy: {
      nombre: 'asc',
    },
  });
  const totalPages = Math.ceil(data / ITEMS_PER_PAGE);
  return totalPages;
}

export async function fetchBienProveedor() {
  const data = await prisma.bienProveedor.findMany({
    select: {
      valor: true,
      bienCotizacionId: true,
      proveedorId: true,
    },
  });
  return data;
}

export async function fetchBienCotizacion() {
  const data = await prisma.bienCotizacion.findMany({
    select: {
      id: true,
      bienId: true,
      cantidad: true,
      cotizacionId: true,
    },
  });
  return data;
}

export async function fetchBienById(id: string) {
  const data = await prisma.bien.findUnique({
    where: {
      id: id,
    },
    include: {
      grupoBien: true,
    },
  });
  return data;
}

const ITEMS_PER_PAGE = 6;
export async function fetchBien(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const data = await prisma.bien.findMany({
    skip: offset,
    take: ITEMS_PER_PAGE,
    where: {
      descripcion: {
        contains: query,
        mode: 'insensitive',
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      grupoBien: true,
    },
  });
  return data;
}

export async function fetchBienPages(query: string) {
  const data = await prisma.bien.count({
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
  return totalPages;
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
  const data = await prisma.cicloContratacion.findMany();
  return data;
}
