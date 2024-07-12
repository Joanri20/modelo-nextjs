'use client';
import { DeleteAsset, UpdateAsset, UpdateAssetT } from '@ui/assets/buttons';
import { DeleteQuotation, UpdateQuotation } from './buttons';

export default async function TableQuotations({
  quotations,
}: {
  quotations: Quotation[];
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
          {quotations.map((quotation) => (
            <tr
              key={quotation.id.toString()} // Convert bigint to string
              className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4">
                {quotation.startDate.toLocaleDateString()}
              </td>
              <td className="px-6 py-4">
                {quotation.endDate.toLocaleDateString()}
              </td>
              <td className="px-6 py-4">{quotation.user.firstName}</td>
              <td className="px-6 py-4">{quotation.entity.name}</td>
              <td className="px-6 py-4">{quotation.status}</td>
              <td className="sticky right-0 flex gap-2 bg-slate-100 px-3 py-2 dark:bg-gray-800">
                <UpdateQuotation id={quotation.id} />
                <DeleteQuotation id={quotation.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
