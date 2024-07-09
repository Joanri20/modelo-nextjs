import prisma from '@lib/db';
const ITEMS_PER_PAGE = 6;
export async function fetchCotizacion(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const data = await prisma.cotizacion.findMany({
    skip: offset,
    take: ITEMS_PER_PAGE,
    where: {
      OR: [
        {
          entidad: {
            OR: [
              {
                nit: {
                  contains: query,
                  mode: 'insensitive',
                },
                nombre: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
            ],
          },
        },
        {
          id: Number(query),
        },
        {
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
      ],
    },
    include: {
      entidad: true,
      usuario: true,
    },
    orderBy: {
      id: 'asc',
    },
  });
  return data as unknown as Cotizacion[];
}

export async function fetchCotizacionPages(query: string) {
  const data = await prisma.cotizacion.count({
    where: {
      OR: [
        {
          entidad: {
            OR: [
              {
                nit: {
                  contains: query,
                  mode: 'insensitive',
                },
                nombre: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
            ],
          },
        },
        {
          id: Number(query),
        },
        {
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
      ],
    },
    orderBy: {
      id: 'asc',
    },
  });
  const totalPages = Math.ceil(data / ITEMS_PER_PAGE);
  return totalPages;
}
