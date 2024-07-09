'use client';
import { DeleteAsset, UpdateAsset, UpdateAssetT } from '@ui/assets/buttons';
import { DeleteQuotation, UpdateQuotation } from './buttons';

export default async function TableQuotations({
  quotations,
}: {
  quotations: Cotizacion[];
}) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Fecha de Inicio
            </th>
            <th scope="col" className="px-6 py-3">
              Fecha Final
            </th>
            <th scope="col" className="px-6 py-3">
              Usuario
            </th>
            <th scope="col" className="px-6 py-3">
              Entidad
            </th>
            <th scope="col" className="px-6 py-3">
              Estado
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Editar</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {quotations.map((cotizacion) => (
            <tr
              key={cotizacion.id.toString()} // Convert bigint to string
              className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4">
                {cotizacion.fechaInicio.toLocaleDateString()}
              </td>
              <td className="px-6 py-4">
                {cotizacion.fechaFinal.toLocaleDateString()}
              </td>
              <td className="px-6 py-4">{cotizacion.usuario.primerNombre}</td>
              <td className="px-6 py-4">{cotizacion.entidad.nombre}</td>
              <td className="px-6 py-4">{cotizacion.estado}</td>
              <td className="sticky right-0 flex gap-2 bg-slate-100 px-3 py-2 dark:bg-gray-800">
                <UpdateQuotation id={cotizacion.id} />
                <DeleteQuotation id={cotizacion.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
