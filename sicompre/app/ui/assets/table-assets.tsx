'use client';
import { Bien } from '@lib/definitions';
import { DeleteAsset, UpdateAsset, UpdateAssetT } from '@ui/assets/buttons';

export default async function TableAssets({ assets }: { assets: Bien[] }) {
  return (
    <div className="relative flex-col shadow-md sm:rounded-lg">
      <table className="w-full text-center text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Descripción del bien o servicio
            </th>
            <th scope="col" className="px-6 py-3">
              Grupo al que pertenece
            </th>
            <th scope="col" className="px-6 py-3">
              Valor Vigente
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Editar</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset: Bien) => {
            return (
              <tr
                key={Number(asset?.id)}
                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{asset?.descripcion}</td>
                <td className="px-6 py-4">{asset?.grupoBien?.descripcion}</td>
                <td className="px-6 py-4">$ {asset?.valorVigente}</td>
                <td className="flex w-full gap-3 px-6 py-4">
                  <UpdateAssetT id={asset?.id!} />
                  <DeleteAsset id={asset?.id!} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
