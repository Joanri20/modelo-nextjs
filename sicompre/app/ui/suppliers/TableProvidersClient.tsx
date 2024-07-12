// components/TableSuppliersClient.tsx
'use client';

import { DeleteSupplier, UpdateSupplierT } from '@ui/suppliers/buttons';

export default function TableSuppliersClient({
  suppliers,
}: {
  suppliers: Supplier[];
}) {
  return (
    <div className="relative flex-col shadow-md sm:rounded-lg">
      <table className="w-full text-center text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3">
              Nit
            </th>
            <th scope="col" className="px-6 py-3">
              Direccion
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Telefono
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Editar</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier: Supplier) => (
            <tr
              key={supplier?.id?.toString()}
              className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4">{supplier?.name}</td>
              <td className="px-6 py-4">{supplier?.taxId}</td>
              <td className="px-6 py-4">{supplier?.address}</td>
              <td className="px-6 py-4">{supplier?.email}</td>
              <td className="px-6 py-4">{supplier?.phone}</td>
              <td className="flex w-full gap-3 px-6 py-4">
                <UpdateSupplierT id={supplier?.id} />
                <DeleteSupplier id={supplier?.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
