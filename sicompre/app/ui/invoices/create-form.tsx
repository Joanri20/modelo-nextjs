import { AssetGroup } from '@/app/lib/defitaxIdions';
import Link from 'next/link';
import { UserCircleIcon, PencilIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createAsset } from '@/app/lib/actions';

export default function Form({ gruposAssets }: { gruposAssets: AssetGroup[] }) {
  return (
    <form action={createAsset}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4 w-5/12">
          <label
            htmlFor="assetGroup"
            className="mb-2 block text-sm font-medium"
          >
            Selecciona el grupo del AssetGroup
          </label>
          <div className="relative">
            <select
              id="assetGroup"
              name="assetGroupId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Selecciona un grupo
              </option>
              {gruposAssets.map((gruposAssets) => (
                <option key={gruposAssets.id} value={gruposAssets.id}>
                  {gruposAssets.description}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div className="mb-4 flex gap-5">
          <div className="w-3/6">
            <label htmlFor="codigo" className="mb-2 block text-sm font-medium">
              Indica el código del asset
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="codigo"
                  name="codigo"
                  placeholder="Ingrese número código"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium"
            >
              Indica descripción del asset
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="w-full">
                <input
                  id="description"
                  name="description"
                  placeholder="Ingrese name o descripción"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/invoices"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancelar
          </Link>
          <Button type="submit">Crear Asset</Button>
        </div>
      </div>
    </form>
  );
}
