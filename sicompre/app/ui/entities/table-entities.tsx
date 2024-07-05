'use client';
import { Bien, Entidad, Usuario } from '@lib/definitions';
import { DeleteAsset, UpdateAsset, UpdateAssetT } from '@ui/assets/buttons';
import { DeleteEntity, UpdateEntity } from './buttons';

export default async function TableEntities({
  entities,
}: {
  entities: Entidad[];
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
              <span className="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {entities.map((entity) => (
            <tr
              key={entity.id.toString()}
              className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <td className="px-6 py-4">{entity.nombre}</td>
              <td className="px-6 py-4">{entity.nit}</td>
              <td className="px-6 py-4">{entity.direccion}</td>
              <td className="px-6 py-4">{entity.telefono}</td>
              <td className="px-6 py-4">{entity.municipio}</td>
              <td className="px-6 py-4">{entity.departamento}</td>
              <td className="px-6 py-4">{entity.pais}</td>
              <td className="px-6 py-4">{entity.web}</td>
              <td className="px-6 py-4">{entity.email}</td>
              <td className="px-6 py-4">{entity.resolucionPosesion}</td>
              <td className="px-6 py-4">
                {entity.fechaPosesion
                  ? entity.fechaPosesion.toISOString()
                  : 'No disponible'}
              </td>
              <td className="px-6 py-4">{entity.estado}</td>
              <td className="px-6 py-4">{entity.saldoDisponible}</td>
              <td className="sticky right-0 flex gap-2 bg-slate-100 px-3 py-2 dark:bg-gray-800">
                <UpdateEntity id={entity.id} />
                <DeleteEntity id={entity.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
