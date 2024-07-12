import prisma from '@lib/db';
const ITEMS_PER_PAGE = 6;
export async function fetchEntity(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const data = await prisma.entity.findMany({
    skip: offset,
    take: ITEMS_PER_PAGE,
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          taxId: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          address: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
    },
    orderBy: {
      name: 'asc',
    },
  });
  return data as unknown as Entity[];
}

export async function fetchEntityPages(query: string) {
  const data = await prisma.entity.count({
    where: {
      name: {
        contains: query,
        mode: 'insensitive',
      },
    },
    orderBy: {
      name: 'asc',
    },
  });
  const totalPages = Math.ceil(data / ITEMS_PER_PAGE);
  return totalPages;
}
