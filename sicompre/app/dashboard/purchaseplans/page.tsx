import { lusitana } from '@ui/fonts';
import { Suspense } from 'react';
import { RevenueChartSkeleton } from '@ui/skeletons';
import Search from '@ui/search';
import Pagination from '@ui/assets/pagination';
import { Metadata } from 'next';
import {
  fetchPurchasePlan,
  fetchPurchasePlanPages,
} from '@lib/data/data-purchaseplan';
import { CreatePurchasePlans } from '@ui/purchaseplans/buttons';
import TablePurchasePlans from '@ui/purchaseplans/table-purchaseplans';

export const metadata: Metadata = {
  title: 'Planes De Compras',
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

  const totalPages = await fetchPurchasePlanPages(query);
  const purchaseplans = await fetchPurchasePlan(query, currentPage);

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Planes De Compras
      </h1>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar Plan De Compras" />
        <CreatePurchasePlans />
      </div>
      <div className="p-6">
        <Suspense key={query + currentPage} fallback={<RevenueChartSkeleton />}>
          <TablePurchasePlans purchaseplans={purchaseplans} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </main>
  );
}
