import { fetchProducto } from '@/app/lib/data';
import { Producto } from '@/app/lib/definitions';

export default async function TablaProductos({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const productos = await fetchProducto(query, currentPage);
  return (
    <>
      <div className="relative flex-col shadow-md sm:rounded-lg">
        <table className="w-full text-center text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Código
              </th>
              <th scope="col" className="px-6 py-3">
                Descripción del producto
              </th>
              <th scope="col" className="px-6 py-3">
                Rubro
              </th>
              <th scope="col" className="px-6 py-3">
                Valor Vigente
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {productos.map((product: Producto) => {
              return (
                <tr
                  key={product.id}
                  className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    {product.id}
                  </th>
                  <td className="px-6 py-4">{product.descripcion}</td>
                  <td className="px-6 py-4">{product.rubroId}</td>
                  <td className="px-6 py-4">$ {product.valorVigente}</td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
