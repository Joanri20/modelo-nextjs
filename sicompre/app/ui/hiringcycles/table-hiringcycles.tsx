'use client';
import { DeleteAsset, UpdateAsset, UpdateAssetT } from '@ui/assets/buttons';
import { DeleteHiringCycle, UpdateHiringCycle } from './buttons';

export default async function TableHiringCycles({
  hiringcycles,
}: {
  hiringcycles: HiringCycle[];
}) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full min-w-max text-center text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
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
              Estado
            </th>
            <th scope="col" className="px-6 py-3">
              Entidad
            </th>
            <th scope="col" className="px-6 py-3">
              Cotización
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {hiringcycles.map((ciclo) => (
            <tr
              key={ciclo.id.toString()}
              className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4">{ciclo.id.toString()}</td>
              <td className="px-6 py-4">
                {new Date(ciclo.startDate).toISOString().split('T')[0]}
              </td>
              <td className="px-6 py-4">
                {new Date(ciclo.endDate).toISOString().split('T')[0]}
              </td>
              <td className="px-6 py-4">{ciclo.user.firstName}</td>
              <td className="px-6 py-4">{ciclo.status}</td>
              <td className="px-6 py-4">{ciclo.entity.name}</td>
              <td className="px-6 py-4">
                {ciclo.quotationId ? ciclo.quotationId.toString() : 'N/A'}
              </td>
              <td className="sticky right-0 flex gap-2 bg-slate-100 px-3 py-2 dark:bg-gray-800">
                <UpdateHiringCycle id={ciclo.id} />
                <DeleteHiringCycle id={ciclo.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
