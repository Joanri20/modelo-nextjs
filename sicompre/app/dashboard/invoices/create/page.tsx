import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchRubro } from '@/app/lib/data';

export default async function Page() {
  const rubros = await fetchRubro();
  console.log(rubros);
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
