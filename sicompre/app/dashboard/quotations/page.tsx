import { lusitana } from '@ui/fonts';
import { Suspense } from 'react';
import { RevenueChartSkeleton } from '@ui/skeletons';
import Search from '@ui/search';
import Pagination from '@ui/assets/pagination';
import { Metadata } from 'next';
import {
  fetchCotizacion,
  fetchCotizacionPages,
} from '@lib/data/data-quotation';
import { CreateQuotations } from '@ui/quotations/buttons';
import TableQuotations from '@ui/quotations/table-quotations';

export const metadata: Metadata = {
  title: 'Cotizaciones',
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

  const totalPages = await fetchCotizacionPages(query);
  const Quotations = await fetchCotizacion(query, currentPage);

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Cotizaciones
      </h1>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar cotizacion" />
        <CreateQuotations />
      </div>
      <div className="p-6">
        <Suspense key={query + currentPage} fallback={<RevenueChartSkeleton />}>
          <TableQuotations quotations={Quotations} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </main>
  );
}
