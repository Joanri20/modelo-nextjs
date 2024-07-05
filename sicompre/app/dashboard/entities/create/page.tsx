import Form from '@ui/entities/create-form';
import Breadcrumbs from '@ui/common/breadcrumbs';
import { fetchGrupoBien } from '@lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creación de Entidades',
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Entidades', href: '/dashboard/entities' },
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
