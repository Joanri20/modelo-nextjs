import Form from 'ui/providers/edit-form';
import Breadcrumbs from 'ui/providers/breadcrumbs';
import { fetchBienById, fetchGrupoBien } from 'lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edición de Bienes o Servicios',
};

export default async function Page({ params }: { params: { id: string } }) {
  console.log;
  const id = params.id;
  const [provider, gruposBienes] = await Promise.all([
    fetchBienById(id),
    fetchGrupoBien(),
  ]);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Proveedores', href: '/dashboard/providers' },
          {
            label: 'Editar Proveedores',
            href: `/dashboard/providers/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form provider={provider} gruposBienes={gruposBienes} />
    </main>
  );
}
