import Form from 'ui/assets/edit-form';
import Breadcrumbs from '@ui/common/breadcrumbs';
import { fetchBienById, fetchGrupoBien } from 'lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edición de Bienes o Servicios',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [asset, gruposBienes] = await Promise.all([
    fetchBienById(id),
    fetchGrupoBien(),
  ]);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Bienes', href: '/dashboard/assets' },
          {
            label: 'Editar Bienes o Servicios',
            href: `/dashboard/assets/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form asset={asset} gruposBienes={gruposBienes} />
    </main>
  );
}
