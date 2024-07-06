import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchGrupoBien } from '@/app/lib/data';

export default async function Page() {
  const gruposBienes = await fetchGrupoBien();
  console.log(gruposBienes);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Bienes', href: '/dashboard/invoices' },
          {
            label: 'Crear Bienes',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />

      <Form gruposBienes={gruposBienes} />
    </main>
  );
}
