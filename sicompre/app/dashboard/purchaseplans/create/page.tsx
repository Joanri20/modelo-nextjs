import Breadcrumbs from '@ui/common/breadcrumbs';
import { fetchAssetGroup } from '@lib/data';
import { Metadata } from 'next';
import Form from '@ui/purchaseplans/create-form';

export const metadata: Metadata = {
  title: 'Creación de Planes De Compras',
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Planes De Compras', href: '/dashboard/purchaseplans' },
          {
            label: 'Crear Planes De Compras',
            href: '/dashboard/purchaseplans/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
