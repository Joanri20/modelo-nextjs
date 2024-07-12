import Form from 'ui/assets/edit-form';
import Breadcrumbs from '@ui/common/breadcrumbs';
import { fetchAssetById, fetchAssetGroup } from 'lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edición de Assets o Servicios',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [asset, gruposAssets] = await Promise.all([
    fetchAssetById(id),
    fetchAssetGroup(),
  ]);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Assets', href: '/dashboard/assets' },
          {
            label: 'Editar Assets o Servicios',
            href: `/dashboard/assets/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form asset={asset} gruposAssets={gruposAssets} />
    </main>
  );
}
