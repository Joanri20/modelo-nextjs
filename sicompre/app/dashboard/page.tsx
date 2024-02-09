import { fetchProducto, fetchProductoPages, fetchUsuario } from '../lib/data';
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import TablaProductos from '@/app/ui/dashboard/tabla-productos';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { RevenueChartSkeleton } from '../ui/skeletons';
import Search from '../ui/search';
import { CreateInvoice } from '../ui/invoices/buttons';
import Pagination from '../ui/invoices/pagination';

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

  const totalPages = await fetchProductoPages(query);
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Productos
      </h1>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar Producto" />
        <CreateInvoice />
      </div>
      <div>
        <Suspense key={query + currentPage} fallback={<RevenueChartSkeleton />}>
          <TablaProductos query={query} currentPage={currentPage} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </main>
  );
}
