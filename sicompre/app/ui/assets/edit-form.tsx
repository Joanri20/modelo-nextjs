'use client';

import { Bien, GrupoBien } from 'lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  PencilIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from 'ui/button';
import { updateAsset } from '@lib/actions/actionsAssets';
import { MessageUpdate } from './toast-message';

export default function EditAssetForm({
  asset,
  gruposBienes,
}: {
  asset: Bien;
  gruposBienes: GrupoBien[];
}) {
  const updateInvoiceWithId = updateAsset.bind(null, asset.id);
  return (
    <form
      action={async (formData: FormData) => {
        const result = await updateInvoiceWithId(formData);
        MessageUpdate({ result });
      }}
    >
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4 w-5/12">
          <label htmlFor="grupoBien" className="mb-2 block text-sm font-medium">
            Selecciona el grupo del bien o servicio *
          </label>
          <div className="relative">
            <select
              id="grupoBien"
              name="grupoBienId"
              required
              className="input-app"
              defaultValue={asset.grupoBien?.descripcion}
            >
              <option value="" disabled>
                Selecciona un grupo
              </option>
              {gruposBienes.map((gruposBienes) => (
                <option
                  key={Number(gruposBienes.id)}
                  value={Number(gruposBienes.id)}
                >
                  {gruposBienes.descripcion}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div className="mb-4 flex gap-5">
          <div className="w-full">
            <label
              htmlFor="descripcion"
              className="mb-2 block text-sm font-medium"
            >
              Indica una descripción del bien o servicio *
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="w-full">
                <input
                  id="descripcion"
                  name="descripcion"
                  defaultValue={asset.descripcion}
                  placeholder="Ingrese nombre o descripción"
                  required
                  className="input-app"
                />
                <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
          <div className="w-3/6">
            <label
              htmlFor="valorvigente"
              className="mb-2 block text-sm font-medium"
            >
              Valor Bien
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="w-full">
                <input
                  id="valorVigente"
                  name="valorVigente"
                  defaultValue={asset.valorVigente ? asset.valorVigente : 0}
                  placeholder="Ingresa un valor sin signos"
                  required
                  className="input-app"
                />
                <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/assets"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancelar
          </Link>
          <Button type="submit">Actualizar Bien</Button>
        </div>
      </div>
    </form>
  );
}
