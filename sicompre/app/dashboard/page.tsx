import { Card } from '@ui/dashboard/cards';
import RevenueChart from '@ui/dashboard/revenue-chart';
import TableAssets from '@ui/assets/table-assets';
import { lusitana } from '@ui/fonts';
import { Suspense } from 'react';
import { RevenueChartSkeleton } from '../ui/skeletons';
import Search from '../ui/search';
import { CreateAsset } from '@ui/assets/buttons';
import Pagination from '../ui/invoices/pagination';
import { Metadata } from 'next';
import { fetchAsset, fetchAssetPages } from '@lib/data/data-asset';

export const metadata: Metadata = {
  title: 'Tablero Principal',
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

  const totalPages = await fetchAssetPages(query);
  const assets = await fetchAsset(query, currentPage);
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Assets y Servicios
      </h1>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar asset o servicio" />
        <CreateAsset />
      </div>
      <div>
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
