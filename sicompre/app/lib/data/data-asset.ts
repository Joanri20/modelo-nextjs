import prisma from '@lib/db';

export async function fetchAssetGroup() {
  const data = await prisma.assetGroup.findMany({
    distinct: ['description'],
  });
  return data;
}

export async function fetchAssetById(id: bigint) {
  const data = await prisma.asset.findUnique({
    where: {
      id: id,
    },
    include: {
      assetGroup: true,
    },
  });
  return data;
}

const ITEMS_PER_PAGE = 6;

export async function fetchAsset(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const data = await prisma.asset.findMany({
    skip: offset,
    take: ITEMS_PER_PAGE,
    where: {
      description: {
        contains: query,
        mode: 'insensitive',
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      assetGroup: true,
      assetQuantities: {
        include: {
          asset: true,
          assetSuppliers: true,
        },
      },
    },
  });
  const typedData = data as unknown as Asset[];
  return typedData;
}

export async function fetchAssetPages(query: string) {
  const data = await prisma.asset.count({
    where: {
      description: {
        contains: query,
        mode: 'insensitive',
      },
    },
    orderBy: {
      description: 'asc',
    },
  });
  const totalPages = Math.ceil(data / ITEMS_PER_PAGE);
  return totalPages;
}
