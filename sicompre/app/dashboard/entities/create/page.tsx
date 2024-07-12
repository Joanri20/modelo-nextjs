import Form from '@ui/entities/create-form';
import Breadcrumbs from '@ui/common/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creación de Entidad',
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Entidad', href: '/dashboard/entities' },
          {
            label: 'Crear Entidad',
            href: '/dashboard/entities/create',
            active: true,
          },
        ]}
      />

      <Form />
    </main>
  );
}
