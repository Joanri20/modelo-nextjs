import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchAssetGroup } from '@/app/lib/data';

export default async function Page() {
  const gruposAssets = await fetchAssetGroup();
  console.log(gruposAssets);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Assets', href: '/dashboard/invoices' },
          {
            label: 'Crear Assets',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />

      <Form gruposAssets={gruposAssets} />
    </main>
  );
}
