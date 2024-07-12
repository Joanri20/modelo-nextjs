'use client';
import Link from 'next/link';
import {
  UserCircleIcon,
  PencilIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@ui/button';
import { createAsset } from '@lib/actions/actionsAssets';
import { useState } from 'react';
import MessageCreate from '@ui/common/toast-message';
import CreateAssetGroupDialog from './create-grupoBien-dialog';

export default function Form({ gruposAssets }: { gruposAssets: AssetGroup[] }) {
  const [error, setError] = useState('');

  return (
    <form
      action={async (formData: FormData) => {
        const result = await createAsset(formData);
        const err = MessageCreate({ result });
        if (err) {
          setError(err);
        }
      }}
    >
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="flex items-center gap-8">
          <div className="mb-4 w-5/12">
            <label
              htmlFor="assetGroup"
              className="mb-2 block text-sm font-medium"
            >
              Selecciona el grupo del bien o servicio *
            </label>
            <div className="relative">
              <select
                id="assetGroup"
                name="assetGroupId"
                required
                className="input-app"
                defaultValue=""
              >
                <option value="" disabled>
                  Selecciona un grupo
                </option>
                {gruposAssets.map((gruposAssets) => (
                  <option
                    key={Number(gruposAssets.id)}
                    value={Number(gruposAssets.id)}
                  >
                    {gruposAssets.description}
                  </option>
                ))}
              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <CreateAssetGroupDialog />
        </div>

        <div className="mb-4 flex gap-5">
          <div className="w-full">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium"
            >
              Indica una descripción del bien o servicio *
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="w-full">
                <input
                  id="description"
                  name="description"
                  required
                  placeholder="Ingrese nombre o descripción"
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
              Valor (opcional)
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="w-full">
                <input
                  id="currentValue"
                  name="currentValue"
                  defaultValue="0"
                  required
                  placeholder="Ingresa un valor sin signos"
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
          <Button type="submit" onClick={() => setError('')}>
            Crear
          </Button>
        </div>
        <div className="flex justify-end">
          {error && <p className="text-red-500">{error} </p>}
        </div>
      </div>
    </form>
  );
}
