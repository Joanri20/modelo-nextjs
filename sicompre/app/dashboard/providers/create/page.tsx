import Form from '@ui/providers/create-form';
import Breadcrumbs from '@ui/providers/breadcrumbs';
import { fetchGrupoBien } from '@lib/data';
import { Metadata } from 'next';
import { Proveedor } from '@lib/definitions';
import { string } from 'zod';

export const metadata: Metadata = {
  title: 'Creación de Bienes y Servicios',
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Proveedores', href: '/dashboard/providers' },
          {
            label: 'Crear Proveedor',
            href: '/dashboard/providers/create',
            active: true,
          },
        ]}
      />

      <Form />
    </main>
  );
}
