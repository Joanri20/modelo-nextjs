import Breadcrumbs from '@ui/suppliers/breadcrumbs';
import Form from '@ui/suppliers/create-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creación de Proveedor',
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Proveedores', href: '/dashboard/suppliers' },
          {
            label: 'Crear Proveedor',
            href: '/dashboard/suppliers/create',
            active: true,
          },
        ]}
      />

      <Form />
    </main>
  );
}
