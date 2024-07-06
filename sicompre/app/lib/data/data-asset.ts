import prisma from '@lib/db';

export async function fetchGrupoBien() {
  const data = await prisma.grupoBien.findMany({
    distinct: ['descripcion'],
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
      bienCantidad: {
        include: {
          bien: true,
          BienProveedor: true,
        },
      },
    },
  });
  const typedData = data as unknown as Bien[];
  return typedData;
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
