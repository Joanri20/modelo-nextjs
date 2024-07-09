import { lusitana } from '@ui/fonts';
import { Suspense } from 'react';
import { RevenueChartSkeleton } from '@ui/skeletons';
import Search from '@ui/search';
import Pagination from '@ui/assets/pagination';
import { Metadata } from 'next';
import {
  fetchCicloDeContratatacion,
  fetchCicloDeContratatacionPages,
} from '@lib/data/data-hiringcycles';
import { CreateHiringCycles } from '@ui/hiringcycles/buttons';
import TableHiringCycles from '@ui/hiringcycles/table-hiringcycles';

export const metadata: Metadata = {
  title: 'CiclosDeContratatacion',
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

  const totalPages = await fetchCicloDeContratatacionPages(query);
  const HiringCycles = await fetchCicloDeContratatacion(query, currentPage);

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Ciclos De Contratatacion
      </h1>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar Ciclo de contratacion" />
        <CreateHiringCycles />
      </div>
      <div className="p-6">
        <Suspense key={query + currentPage} fallback={<RevenueChartSkeleton />}>
          <TableHiringCycles hiringcycles={HiringCycles} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </main>
  );
}
