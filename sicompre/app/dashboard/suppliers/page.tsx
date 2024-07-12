import { fetchSupplier, fetchSupplierPages } from '@lib/data';
import { lusitana } from '@ui/fonts';
import { Suspense } from 'react';
import { RevenueChartSkeleton } from '@ui/skeletons';
import Search from '@ui/search';
import { Metadata } from 'next';
import { CreateSupplier } from '@ui/suppliers/buttons';
import TableSuppliersClient from '@ui/suppliers/TableProvidersClient';
import Pagination from '@ui/suppliers/pagination';

export const metadata: Metadata = {
  title: 'Proveedores',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchSupplierPages(query);
  const suppliers = await fetchSupplier(query, currentPage);
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Proveedores
      </h1>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar Proveedor" />
        <CreateSupplier />
      </div>
      <div className="p-6">
        <Suspense key={query + currentPage} fallback={<RevenueChartSkeleton />}>
          <TableSuppliersClient suppliers={suppliers} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </main>
  );
}
