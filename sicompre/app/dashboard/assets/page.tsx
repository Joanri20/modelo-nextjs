import { fetchBien, fetchBienPages } from '@lib/data/data-asset';
import TableAssets from '@ui/assets/table-assets';
import { lusitana } from '@ui/fonts';
import { Suspense } from 'react';
import { RevenueChartSkeleton } from '@ui/skeletons';
import Search from '@ui/search';
import Pagination from '@ui/assets/pagination';
import { CreateAsset } from '@ui/assets/buttons';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bienes y Servicios',
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

  const totalPages = await fetchBienPages(query);
  const assets = await fetchBien(query, currentPage);

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Bienes y Servicios
      </h1>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar bien o servicio" />
        <CreateAsset />
      </div>
      <div className="p-6">
        <Suspense key={query + currentPage} fallback={<RevenueChartSkeleton />}>
          <TableAssets assets={assets} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </main>
  );
}
