import TableAssets from '@ui/assets/table-assets';
import { lusitana } from '@ui/fonts';
import { Suspense } from 'react';
import { RevenueChartSkeleton } from '@ui/skeletons';
import Search from '@ui/search';
import Pagination from '@ui/assets/pagination';
import { CreateAsset } from '@ui/assets/buttons';
import { Metadata } from 'next';
import { CreateUsers } from '@ui/users/buttons';
import TableUsers from '@ui/users/table-users';

import { CreateDependencies } from '@ui/dependencies/buttons';
import TableDependencies from '@ui/dependencies/table-dependencies';
import {
  fetchDependencia,
  fetchDependenciaPages,
} from '@lib/data/data-dependence';

export const metadata: Metadata = {
  title: 'Dependencias',
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

  const totalPages = await fetchDependenciaPages(query);
  const dependencies = await fetchDependencia(query, currentPage);

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dependencias
      </h1>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar sección" />
        <CreateDependencies />
      </div>
      <div className="p-6">
        <Suspense key={query + currentPage} fallback={<RevenueChartSkeleton />}>
          <TableDependencies dependencies={dependencies} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </main>
  );
}
