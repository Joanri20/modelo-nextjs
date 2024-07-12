'use client';
import { DeleteAsset, UpdateAsset, UpdateAssetT } from '@ui/assets/buttons';
import { DeleteDepartment, UpdateDepartment } from './buttons';

export default async function TableDepartments({
  departments,
}: {
  departments: Department[];
}) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full min-w-max text-center text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3">
              NIT
            </th>
            <th scope="col" className="px-6 py-3">
              Dirección
            </th>
            <th scope="col" className="px-6 py-3">
              Teléfono
            </th>
            <th scope="col" className="px-6 py-3">
              Municipio
            </th>
            <th scope="col" className="px-6 py-3">
              Departamento
            </th>
            <th scope="col" className="px-6 py-3">
              País
            </th>
            <th scope="col" className="px-6 py-3">
              Web
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Resolución de Posesión
            </th>
            <th scope="col" className="px-6 py-3">
              Fecha de Posesión
            </th>
            <th scope="col" className="px-6 py-3">
              Estado
            </th>
            <th scope="col" className="px-6 py-3">
              Saldo Disponible
            </th>
            <th scope="col" className="px-6 py-3">
              Entity Padre
            </th>
            <th scope="col" className="px-6 py-3">
              Estado
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr
              key={department.id.toString()}
              className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <td className="px-6 py-4">{department.name}</td>
              <td className="px-6 py-4">{department.taxId}</td>
              <td className="px-6 py-4">{department.address}</td>
              <td className="px-6 py-4">{department.phone}</td>
              <td className="px-6 py-4">{department.city}</td>
              <td className="px-6 py-4">{department.state}</td>
              <td className="px-6 py-4">{department.country}</td>
              <td className="px-6 py-4">{department.website}</td>
              <td className="px-6 py-4">{department.email}</td>
              <td className="px-6 py-4">{department.possessionResolution}</td>
              <td className="px-6 py-4">
                {department.possessionDate
                  ? department.possessionDate.toISOString()
                  : 'No disponible'}
              </td>
              <td className="px-6 py-4">{department.status}</td>
              <td className="px-6 py-4">{department.availableBalance}</td>
              <td className="px-6 py-4">{department.entityId.toString()}</td>
              <td className="px-6 py-4">{department.status}</td>
              <td className="sticky right-0 flex gap-2 bg-slate-100 px-3 py-2 dark:bg-gray-800">
                <UpdateDepartment id={department.id} />
                <DeleteDepartment id={department.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
