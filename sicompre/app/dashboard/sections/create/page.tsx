import Form from '@ui/sections/create-form';
import Breadcrumbs from '@ui/common/breadcrumbs';
import { fetchGrupoBien } from '@lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creación de Secciones',
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Secciones', href: '/dashboard/sections' },
          {
            label: 'Crear Sección',
            href: '/dashboard/sections/create',
            active: true,
          },
        ]}
      />

      <Form />
    </main>
  );
}
