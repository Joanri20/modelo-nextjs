import Form from '@ui/quotations/create-form';
import Breadcrumbs from '@ui/common/breadcrumbs';
import { fetchGrupoBien } from '@lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creación de Cotizaciones',
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Cotizaciones', href: '/dashboard/quotations' },
          {
            label: 'Crear Cotizacion',
            href: '/dashboard/quotations/create',
            active: true,
          },
        ]}
      />

      <Form />
    </main>
  );
}
