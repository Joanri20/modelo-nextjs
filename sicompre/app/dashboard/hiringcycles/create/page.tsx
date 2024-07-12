import Form from '@ui/hiringcycles/create-form';
import Breadcrumbs from '@ui/common/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creación de Ciclos De Contratatacion',
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'Ciclos De Contratatacion',
            href: '/dashboard/hiringcycles',
          },
          {
            label: 'Crear Ciclo De Contratatacion',
            href: '/dashboard/hiringcycles/create',
            active: true,
          },
        ]}
      />

      <Form />
    </main>
  );
}
