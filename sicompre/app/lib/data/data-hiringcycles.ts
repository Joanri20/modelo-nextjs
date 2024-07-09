import prisma from '@lib/db';
const ITEMS_PER_PAGE = 6;
export async function fetchCicloDeContratatacion(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const data = await prisma.cicloContratacion.findMany({
    skip: offset,
    take: ITEMS_PER_PAGE,
    where: {
      entidad: {
        OR: [
          {
            nombre: {
              contains: query,
              mode: 'insensitive',
            },
            nit: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
      usuario: {
        OR: [
          {
            primerNombre: {
              contains: query,
              mode: 'insensitive',
            },
            segundoNombre: {
              contains: query,
              mode: 'insensitive',
            },
            primerApellido: {
              contains: query,
              mode: 'insensitive',
            },
            segundoApellido: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
    },
    include: {
      entidad: true,
      usuario: true,
      Cotizacion: true,
    },
    orderBy: {
      entidad: {
        nombre: 'asc',
      },
    },
  });
  return data as unknown as CicloContratacion[];
}

export async function fetchCicloDeContratatacionPages(query: string) {
  const data = await prisma.cicloContratacion.count({
    where: {
      entidad: {
        OR: [
          {
            nombre: {
              contains: query,
              mode: 'insensitive',
            },
            nit: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
      usuario: {
        OR: [
          {
            primerNombre: {
              contains: query,
              mode: 'insensitive',
            },
            segundoNombre: {
              contains: query,
              mode: 'insensitive',
            },
            primerApellido: {
              contains: query,
              mode: 'insensitive',
            },
            segundoApellido: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
    },
    orderBy: {
      entidad: {
        nombre: 'asc',
      },
    },
  });
  const totalPages = Math.ceil(data / ITEMS_PER_PAGE);
  return totalPages;
}
