import Form from 'ui/products/edit-form';
import Breadcrumbs from 'ui/products/breadcrumbs';
import { fetchProductoById, fetchRubro } from 'lib/data';

export default async function Page({ params }: { params: { id: string } }) {
  console.log;
  const id = params.id;
  const [product, rubros] = await Promise.all([
    fetchProductoById(id),
    fetchRubro(),
  ]);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Productos', href: '/dashboard/products' },
          {
            label: 'Editar Productos',
            href: `/dashboard/products/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form product={product} rubros={rubros} />
    </main>
  );
}
