import Breadcrumbs from '@ui/common/breadcrumbs';
import Form from '@ui/departments/create-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creación de Dependencia',
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Dependencia', href: '/dashboard/departments' },
          {
            label: 'Crear Dependencia',
            href: '/dashboard/departments/create',
            active: true,
          },
        ]}
      />

      <Form />
    </main>
  );
}
