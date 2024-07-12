import prisma from '@lib/db';
const ITEMS_PER_PAGE = 6;
export async function fetchPurchasePlan(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const data = await prisma.purchasePlan.findMany({
    skip: offset,
    take: ITEMS_PER_PAGE,
    where: {
      OR: [
        {
          department: {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
        },
        {
          user: {
            firstName: {
              contains: query,
              mode: 'insensitive',
            },
          },
        },
        {
          user: {
            middleName: {
              contains: query,
              mode: 'insensitive',
            },
          },
        },
        {
          user: {
            lastName: {
              contains: query,
              mode: 'insensitive',
            },
          },
        },
        {
          user: {
            secondLastName: {
              contains: query,
              mode: 'insensitive',
            },
          },
        },
        {
          department: {
            parentEntity: {
              name: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
        },
        {
          department: {
            parentEntity: {
              taxId: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
        },
      ],
    },
    include: {
      department: true,
      user: true,
      hiringCycle: true,
    },
    orderBy: {
      department: {
        name: 'asc',
      },
    },
  });
  return data as unknown as PurchasePlan[];
}

export async function fetchPurchasePlanPages(query: string) {
  const data = await prisma.purchasePlan.count({
    where: {
      OR: [
        {
          department: {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
        },
        {
          user: {
            firstName: {
              contains: query,
              mode: 'insensitive',
            },
          },
        },
        {
          user: {
            middleName: {
              contains: query,
              mode: 'insensitive',
            },
          },
        },
        {
          user: {
            lastName: {
              contains: query,
              mode: 'insensitive',
            },
          },
        },
        {
          user: {
            secondLastName: {
              contains: query,
              mode: 'insensitive',
            },
          },
        },
        {
          department: {
            parentEntity: {
              name: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
        },
        {
          department: {
            parentEntity: {
              taxId: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
        },
      ],
    },
    orderBy: {
      department: {
        name: 'asc',
      },
    },
  });
  const totalPages = Math.ceil(data / ITEMS_PER_PAGE);
  return totalPages;
}
