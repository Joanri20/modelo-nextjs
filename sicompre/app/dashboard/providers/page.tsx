import { fetchBienPages, fetchProveedor, fetchProveedorPages } from '@lib/data';
import TableProviders from 'ui/providers/table-providers';
import { lusitana } from '@ui/fonts';
import { Suspense } from 'react';
import { RevenueChartSkeleton } from '@ui/skeletons';
import Search from '@ui/search';
import Pagination from 'ui/providers/pagination';
import { CreateProvider } from 'ui/providers/buttons';
import { Metadata } from 'next';
import TableProvidersClient from '@ui/providers/TableProvidersClient';

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

  const totalPages = await fetchProveedorPages(query);
  const providers = await fetchProveedor(query, currentPage);
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Proveedores
      </h1>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar proveedor" />
        <CreateProvider />
      </div>
      <div className="p-6">
        <Suspense key={query + currentPage} fallback={<RevenueChartSkeleton />}>
          <TableProvidersClient providers={providers} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </main>
  );
}
