import Form from '@ui/assets/create-form';
import Breadcrumbs from '@ui/common/breadcrumbs';
import { fetchAssetGroup } from '@lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creación de Bienes y Servicios',
};

export default async function Page() {
  const gruposAssets = await fetchAssetGroup();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Bienes y Servicios', href: '/dashboard/assets' },
          {
            label: 'Crear Bienes y Servicios',
            href: '/dashboard/assets/create',
            active: true,
          },
        ]}
      />

      <Form gruposAssets={gruposAssets} />
    </main>
  );
}
