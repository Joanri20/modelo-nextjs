import { fetchBien, fetchUsuario, fetchUsuarioPages } from '@lib/data';
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
import { fetchEntidad, fetchEntidadPages } from '@lib/data/data-entity';
import { CreateEntities } from '@ui/entities/buttons';
import TableEntities from '@ui/entities/table-entities';

export const metadata: Metadata = {
  title: 'Entidades',
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

  const totalPages = await fetchEntidadPages(query);
  const Entities = await fetchEntidad(query, currentPage);

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Entidades
      </h1>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar entidad" />
        <CreateEntities />
      </div>
      <div className="p-6">
        <Suspense key={query + currentPage} fallback={<RevenueChartSkeleton />}>
          <TableEntities entities={Entities} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </main>
  );
}
