'use client';
import { DeleteAsset, UpdateAsset, UpdateAssetT } from '@ui/assets/buttons';
import { DeleteUser, UpdateUser } from './buttons';

export default async function TableUsers({ users }: { users: Usuario[] }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-center text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Primer Nombre
            </th>
            <th scope="col" className="px-6 py-3">
              Segundo Nombre
            </th>
            <th scope="col" className="px-6 py-3">
              Primer Apellido
            </th>
            <th scope="col" className="px-6 py-3">
              Segundo Apellido
            </th>
            <th scope="col" className="px-6 py-3">
              Tipo de Documento
            </th>
            <th scope="col" className="px-6 py-3">
              Documento
            </th>
            <th scope="col" className="px-6 py-3">
              Teléfono
            </th>
            <th scope="col" className="px-6 py-3">
              Celular
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Dirección
            </th>
            <th scope="col" className="px-6 py-3">
              Estado
            </th>
            <th scope="col" className="px-6 py-3">
              Tipo
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Editar</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4">{user.id}</td>
              <td className="px-6 py-4">{user.primerNombre}</td>
              <td className="px-6 py-4">{user.segundoNombre}</td>
              <td className="px-6 py-4">{user.primerApellido}</td>
              <td className="px-6 py-4">{user.segundoApellido}</td>
              <td className="px-6 py-4">{user.tipoDocumento}</td>
              <td className="px-6 py-4">{user.documento}</td>
              <td className="px-6 py-4">{user.telefono}</td>
              <td className="px-6 py-4">{user.celular}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.direccion}</td>
              <td className="px-6 py-4">{user.estado}</td>
              <td className="px-6 py-4">{user.tipo}</td>
              <td className="sticky right-0 flex gap-2 bg-slate-100 px-3 py-2 dark:bg-gray-800">
                <UpdateUser id={user.id} />
                <DeleteUser id={user.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
