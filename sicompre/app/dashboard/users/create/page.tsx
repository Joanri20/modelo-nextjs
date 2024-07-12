import Form from '@ui/users/create-form';
import Breadcrumbs from '@ui/common/breadcrumbs';
import { fetchAssetGroup } from '@lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creación de Usuarios',
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Usuarios', href: '/dashboard/users' },
          {
            label: 'Crear Usuario',
            href: '/dashboard/users/create',
            active: true,
          },
        ]}
      />

      <Form />
    </main>
  );
}
