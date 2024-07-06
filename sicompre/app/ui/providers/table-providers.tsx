'use client';

import { useEffect, useState } from 'react';
import { fetchProveedor, fetchProveedorById } from '@lib/data';
import { Proveedor } from '@lib/definitions';
import { DeleteProvider } from '@ui/providers/buttons';
import UpdateProveedorDialog from './update-form-dialog';
import { PencilIcon } from '@heroicons/react/20/solid';

export default function TableProviders({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const [providers, setProviders] = useState<Proveedor[]>([]);
  const [proveedorData, setProveedorData] = useState<Proveedor | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      const data = await fetchProveedor(query, currentPage);
      setProviders(data);
    };
    fetchProviders();
  }, [query, currentPage]);

  const handleEditarClick = async (id: string | undefined) => {
    if (!id) return;
    try {
      const result = await fetchProveedorById(id);
      setProveedorData(result); // Almacena los datos del proveedor
      setOpen(true);
    } catch (error) {
      console.error('Error al obtener los datos del proveedor:', error);
    }
  };

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
                <div>
                  <button
                    type="button"
                    onClick={() => handleEditarClick(provider?.id)}
                    className="rounded-md border p-2 hover:bg-gray-100"
                  >
                    <PencilIcon className="w-5" />
                  </button>
                  {proveedorData && (
                    <UpdateProveedorDialog
                      open={open}
                      setOpen={setOpen}
                      proveedor={proveedorData}
                    />
                  )}
                </div>
                <DeleteProvider id={provider?.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
