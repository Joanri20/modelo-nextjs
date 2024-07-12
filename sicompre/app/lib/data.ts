import prisma from '@lib/db';

export async function fetchUser(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const data = await prisma.user.findMany({
    skip: offset,
    take: ITEMS_PER_PAGE,
    where: {
      OR: [
        {
          id: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          firstName: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          middleName: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          lastName: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          secondLastName: {
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
        { document: query },
      ],
    },
    orderBy: {
      firstName: 'asc',
    },
  });
  return data as User[];
}

export async function fetchUserPages(query: string) {
  const data = await prisma.user.count({
    where: {
      id: {
        contains: query,
        mode: 'insensitive',
      },
    },
    orderBy: {
      id: 'asc',
    },
  });
  const totalPages = Math.ceil(data / ITEMS_PER_PAGE);
  return totalPages;
}

export async function fetchAssetGroup() {
  const data = await prisma.assetGroup.findMany({
    distinct: ['description'],
  });
  return data;
}

export async function fetchSupplierById(id: bigint | undefined) {
  const data = await prisma.supplier.findMany({
    where: {
      id: id,
    },
  });

  return data as unknown as Supplier;
}

export async function fetchSupplier(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const data = await prisma.supplier.findMany({
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
          email: {
            contains: query,
            mode: 'insensitive',
          },
        },
        { taxId: query },
      ],
    },
    orderBy: {
      name: 'asc',
    },
    include: {
      quotationSuppliers: true,
    },
  });
  return data as unknown as Supplier[];
}

export async function fetchSupplierPages(query: string) {
  const data = await prisma.supplier.count({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          email: {
            contains: query,
            mode: 'insensitive',
          },
        },
        { taxId: query },
      ],
    },
    orderBy: {
      name: 'asc',
    },
  });
  const totalPages = Math.ceil(data / ITEMS_PER_PAGE);
  return totalPages;
}

export async function fetchAssetSupplier() {
  const data = await prisma.assetSupplier.findMany({
    select: {
      value: true,
      assetQuantityId: true,
      supplierId: true,
    },
  });
  return data;
}

export async function fetchAssetQuotation() {
  const data = await prisma.assetQuantity.findMany({
    select: {
      id: true,
      assetId: true,
      quantity: true,
      quotationId: true,
    },
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

export async function fetchEntity() {
  const data = await prisma.entity.findMany({
    select: {
      id: true,
      name: true,
      taxId: true,
      address: true,
      phone: true,
      city: true,
      state: true,
      country: true,
      website: true,
      email: true,
      possessionResolution: true,
      possessionDate: true,
      status: true,
      availableBalance: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return data;
}

export async function fetchQuotation() {
  const data = await prisma.quotation.findMany({
    select: {
      id: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      userId: true,
    },
  });
  return data;
}

export async function fetchHiringCycle() {
  const data = await prisma.hiringCycle.findMany();
  return data;
}
