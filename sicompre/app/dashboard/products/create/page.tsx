import Form from '@ui/products/create-form';
import Breadcrumbs from '@ui/products/breadcrumbs';
import { fetchRubro } from '@lib/data';

export default async function Page() {
  const rubros = await fetchRubro();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Productos', href: '/dashboard/invoices' },
          {
            label: 'Crear Productos',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />

      <Form rubros={rubros} />
    </main>
  );
}
