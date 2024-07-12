import prisma from '@lib/db';
const ITEMS_PER_PAGE = 6;
export async function fetchHiringCycle(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const data = await prisma.hiringCycle.findMany({
    skip: offset,
    take: ITEMS_PER_PAGE,
    where: {
      entity: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
            taxId: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
      user: {
        OR: [
          {
            firstName: {
              contains: query,
              mode: 'insensitive',
            },
            middleName: {
              contains: query,
              mode: 'insensitive',
            },
            lastName: {
              contains: query,
              mode: 'insensitive',
            },
            secondLastName: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
    },
    include: {
      entity: true,
      user: true,
      quotation: true,
    },
    orderBy: {
      entity: {
        name: 'asc',
      },
    },
  });
  return data as unknown as HiringCycle[];
}

export async function fetchHiringCyclePages(query: string) {
  const data = await prisma.hiringCycle.count({
    where: {
      entity: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
            taxId: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
      user: {
        OR: [
          {
            firstName: {
              contains: query,
              mode: 'insensitive',
            },
            middleName: {
              contains: query,
              mode: 'insensitive',
            },
            lastName: {
              contains: query,
              mode: 'insensitive',
            },
            secondLastName: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
    },
    orderBy: {
      entity: {
        name: 'asc',
      },
    },
  });
  const totalPages = Math.ceil(data / ITEMS_PER_PAGE);
  return totalPages;
}
