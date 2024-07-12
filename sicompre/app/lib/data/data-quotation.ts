import prisma from '@lib/db';
const ITEMS_PER_PAGE = 6;
export async function fetchQuotation(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const data = await prisma.quotation.findMany({
    skip: offset,
    take: ITEMS_PER_PAGE,
    where: {
      OR: [
        {
          entity: {
            OR: [
              {
                taxId: {
                  contains: query,
                  mode: 'insensitive',
                },
                name: {
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
      ],
    },
    include: {
      entity: true,
      user: true,
    },
    orderBy: {
      id: 'asc',
    },
  });
  return data as unknown as Quotation[];
}

export async function fetchQuotationPages(query: string) {
  const data = await prisma.quotation.count({
    where: {
      OR: [
        {
          entity: {
            OR: [
              {
                taxId: {
                  contains: query,
                  mode: 'insensitive',
                },
                name: {
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
      ],
    },
    orderBy: {
      id: 'asc',
    },
  });
  const totalPages = Math.ceil(data / ITEMS_PER_PAGE);
  return totalPages;
}
