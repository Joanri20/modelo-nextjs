import prisma from '@lib/db';
const ITEMS_PER_PAGE = 6;
export async function fetchPlanDeCompras(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const data = await prisma.planDeCompras.findMany({
    skip: offset,
    take: ITEMS_PER_PAGE,
    where: {
      OR: [
        {
          dependencia: {
            nombre: {
              contains: query,
              mode: 'insensitive',
            },
          },
        },
        {
          usuario: {
            primerNombre: {
              contains: query,
              mode: 'insensitive',
            },
          },
        },
        {
          usuario: {
            segundoNombre: {
              contains: query,
              mode: 'insensitive',
            },
          },
        },
        {
          usuario: {
            primerApellido: {
              contains: query,
              mode: 'insensitive',
            },
          },
        },
        {
          usuario: {
            segundoApellido: {
              contains: query,
              mode: 'insensitive',
            },
          },
        },
        {
          dependencia: {
            entidadPadre: {
              nombre: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
        },
        {
          dependencia: {
            entidadPadre: {
              nit: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
        },
      ],
    },
    include: {
      dependencia: true,
      usuario: true,
      cicloContratacion: true,
    },
    orderBy: {
      dependencia: {
        nombre: 'asc',
      },
    },
  });
  return data as unknown as PlanDeCompras[];
}

export async function fetchPlanDeComprasPages(query: string) {
  const data = await prisma.planDeCompras.count({
    where: {
      OR: [
        {
          dependencia: {
            nombre: {
              contains: query,
              mode: 'insensitive',
            },
          },
        },
        {
          usuario: {
            primerNombre: {
              contains: query,
              mode: 'insensitive',
            },
          },
        },
        {
          usuario: {
            segundoNombre: {
              contains: query,
              mode: 'insensitive',
            },
          },
        },
        {
          usuario: {
            primerApellido: {
              contains: query,
              mode: 'insensitive',
            },
          },
        },
        {
          usuario: {
            segundoApellido: {
              contains: query,
              mode: 'insensitive',
            },
          },
        },
        {
          dependencia: {
            entidadPadre: {
              nombre: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
        },
        {
          dependencia: {
            entidadPadre: {
              nit: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
        },
      ],
    },
    orderBy: {
      dependencia: {
        nombre: 'asc',
      },
    },
  });
  const totalPages = Math.ceil(data / ITEMS_PER_PAGE);
  return totalPages;
}
