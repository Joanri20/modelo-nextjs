// components/TableProvidersClient.tsx
'use client';

import { Proveedor } from '@lib/definitions';
import { DeleteProvider, UpdateProviderT } from '@ui/providers/buttons';

export default function TableProvidersClient({
  providers,
}: {
  providers: Proveedor[];
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
          {providers.map((provider: Proveedor) => (
            <tr
              key={provider?.id}
              className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4">{provider?.nombre}</td>
              <td className="px-6 py-4">{provider?.nit}</td>
              <td className="px-6 py-4">{provider?.direccion}</td>
              <td className="px-6 py-4">{provider?.email}</td>
              <td className="px-6 py-4">{provider?.telefono}</td>
              <td className="flex w-full gap-3 px-6 py-4">
                <UpdateProviderT id={provider?.id} />
                <DeleteProvider id={provider?.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
