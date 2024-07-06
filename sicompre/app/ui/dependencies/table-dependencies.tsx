'use client';
import { DeleteAsset, UpdateAsset, UpdateAssetT } from '@ui/assets/buttons';
import { DeleteDependence, UpdateDependence } from './buttons';

export default async function TableDependencies({
  dependencies,
}: {
  dependencies: Dependencia[];
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
              Entidad Padre
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
          {dependencies.map((dependence) => (
            <tr
              key={dependence.id.toString()}
              className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <td className="px-6 py-4">{dependence.nombre}</td>
              <td className="px-6 py-4">{dependence.nit}</td>
              <td className="px-6 py-4">{dependence.direccion}</td>
              <td className="px-6 py-4">{dependence.telefono}</td>
              <td className="px-6 py-4">{dependence.municipio}</td>
              <td className="px-6 py-4">{dependence.departamento}</td>
              <td className="px-6 py-4">{dependence.pais}</td>
              <td className="px-6 py-4">{dependence.web}</td>
              <td className="px-6 py-4">{dependence.email}</td>
              <td className="px-6 py-4">{dependence.resolucionPosesion}</td>
              <td className="px-6 py-4">
                {dependence.fechaPosesion
                  ? dependence.fechaPosesion.toISOString()
                  : 'No disponible'}
              </td>
              <td className="px-6 py-4">{dependence.estado}</td>
              <td className="px-6 py-4">{dependence.saldoDisponible}</td>
              <td className="px-6 py-4">{dependence.entidadId.toString()}</td>
              <td className="px-6 py-4">{dependence.estado}</td>
              <td className="sticky right-0 flex gap-2 bg-slate-100 px-3 py-2 dark:bg-gray-800">
                <UpdateDependence id={dependence.id} />
                <DeleteDependence id={dependence.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
