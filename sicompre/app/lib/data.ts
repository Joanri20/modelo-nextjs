import prisma from '@lib/db';

export async function fetchUsuario(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const data = await prisma.usuario.findMany({
    skip: offset,
    take: ITEMS_PER_PAGE,
    where: {
      OR: [
        {
          id: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          primerNombre: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          segundoNombre: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          primerApellido: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          segundoApellido: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          direccion: {
            contains: query,
            mode: 'insensitive',
          },
        },
        { documento: query },
      ],
    },
    orderBy: {
      primerNombre: 'asc',
    },
  });
  return data;
}

export async function fetchUsuarioPages(query: string) {
  const data = await prisma.usuario.count({
    where: {
      id: {
        contains: query,
        mode: 'insensitive',
      },
    },
    orderBy: {
      id: 'asc',
    },
  });
  const totalPages = Math.ceil(data / ITEMS_PER_PAGE);
  return totalPages;
}

export async function fetchSeccion() {
  const data = await prisma.dependecia.findMany({
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

export async function fetchProveedorById(id: bigint | undefined) {
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
  return data as unknown as Proveedor[];
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
      bienCantidadId: true,
      proveedorId: true,
    },
  });
  return data;
}

export async function fetchBienCotizacion() {
  const data = await prisma.bienCantidad.findMany({
    select: {
      id: true,
      bienId: true,
      cantidad: true,
      cotizacionId: true,
    },
  });
  return data;
}

export async function fetchBienById(id: bigint) {
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
export async function fetchBien(
  query: string,
  currentPage: number,
): Promise<Bien[]> {
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
  return data.map((asset) => ({
    ...asset,
    id: BigInt(asset.id),
  }));
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
