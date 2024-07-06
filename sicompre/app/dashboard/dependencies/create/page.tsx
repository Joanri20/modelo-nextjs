import Form from '@ui/dependencies/create-form';
import Breadcrumbs from '@ui/common/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creación de Dependencias',
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Dependencias', href: '/dashboard/dependencies' },
          {
            label: 'Crear Sección',
            href: '/dashboard/dependencies/create',
            active: true,
          },
        ]}
      />

      <Form />
    </main>
  );
}
