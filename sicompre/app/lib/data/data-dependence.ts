import prisma from '@lib/db';
const ITEMS_PER_PAGE = 6;
export async function fetchDependencia(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const data = await prisma.dependencia.findMany({
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
          nit: {
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
      ],
    },
    orderBy: {
      nombre: 'asc',
    },
  });
  return data as unknown as Dependencia[];
}

export async function fetchDependenciaPages(query: string) {
  const data = await prisma.dependencia.count({
    where: {
      nombre: {
        contains: query,
        mode: 'insensitive',
      },
    },
    orderBy: {
      nombre: 'asc',
    },
  });
  const totalPages = Math.ceil(data / ITEMS_PER_PAGE);
  return totalPages;
}
