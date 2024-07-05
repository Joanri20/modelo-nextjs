'use client';
import { Bien, Seccion, Usuario } from '@lib/definitions';
import { DeleteAsset, UpdateAsset, UpdateAssetT } from '@ui/assets/buttons';
import { DeleteSection, UpdateSection } from './buttons';

export default async function TableSections({
  sections,
}: {
  sections: Seccion[];
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
          {sections.map((section) => (
            <tr
              key={section.id.toString()}
              className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <td className="px-6 py-4">{section.nombre}</td>
              <td className="px-6 py-4">{section.nit}</td>
              <td className="px-6 py-4">{section.direccion}</td>
              <td className="px-6 py-4">{section.telefono}</td>
              <td className="px-6 py-4">{section.municipio}</td>
              <td className="px-6 py-4">{section.departamento}</td>
              <td className="px-6 py-4">{section.pais}</td>
              <td className="px-6 py-4">{section.web}</td>
              <td className="px-6 py-4">{section.email}</td>
              <td className="px-6 py-4">{section.resolucionPosesion}</td>
              <td className="px-6 py-4">
                {section.fechaPosesion
                  ? section.fechaPosesion.toISOString()
                  : 'No disponible'}
              </td>
              <td className="px-6 py-4">{section.estado}</td>
              <td className="px-6 py-4">{section.saldoDisponible}</td>
              <td className="px-6 py-4">{section.entidadId.toString()}</td>
              <td className="px-6 py-4">{section.estado}</td>
              <td className="sticky right-0 flex gap-2 bg-slate-100 px-3 py-2 dark:bg-gray-800">
                <UpdateSection id={section.id} />
                <DeleteSection id={section.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
