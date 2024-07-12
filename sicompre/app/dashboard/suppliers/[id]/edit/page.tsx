import Form from 'ui/suppliers/edit-form';
import Breadcrumbs from 'ui/suppliers/breadcrumbs';
import { fetchAssetById, fetchAssetGroup } from 'lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edición de Assets o Servicios',
};

export default async function Page({ params }: { params: { id: string } }) {
  console.log;
  const id = params.id;
  const [supplier, gruposAssets] = await Promise.all([
    fetchAssetById(id),
    fetchAssetGroup(),
  ]);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Suppliers', href: '/dashboard/suppliers' },
          {
            label: 'Editar Suppliers',
            href: `/dashboard/suppliers/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form supplier={supplier} gruposAssets={gruposAssets} />
    </main>
  );
}
