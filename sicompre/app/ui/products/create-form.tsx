'use client';
import { Rubro } from '@lib/definitions';
import Link from 'next/link';
import {
  UserCircleIcon,
  PencilIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@ui/button';
import { createProduct } from '@lib/actions';
import CreateRubroDialog from './create-rubro-dialog';
import { useState } from 'react';
import MessageCreate from './toast-message';

export default function Form({ rubros }: { rubros: Rubro[] }) {
  const [error, setError] = useState('');

  return (
    <form
      action={async (formData: FormData) => {
        const result = await createProduct(formData);
        const err = MessageCreate({ result });
        if (err) {
          setError(err);
        }
      }}
    >
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="flex items-center gap-8">
          <div className="mb-4 w-5/12">
            <label htmlFor="rubro" className="mb-2 block text-sm font-medium">
              Selecciona el grupo del Rubro *
            </label>
            <div className="relative">
              <select
                id="rubro"
                name="rubroId"
                required
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
              >
                <option value="" disabled>
                  Selecciona un grupo
                </option>
                {rubros.map((rubros) => (
                  <option key={rubros.id} value={rubros.id}>
                    {rubros.descripcion}
                  </option>
                ))}
              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <CreateRubroDialog />
        </div>

        <div className="mb-4 flex gap-5">
          <div className="w-3/6">
            <label htmlFor="codigo" className="mb-2 block text-sm font-medium">
              Indica el código del producto *
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="codigo"
                  name="codigoid"
                  required
                  placeholder="Ingrese número código"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="descripcion"
              className="mb-2 block text-sm font-medium"
            >
              Indica descripción del producto *
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="w-full">
                <input
                  id="descripcion"
                  name="descripcion"
                  required
                  placeholder="Ingrese nombre o descripción"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
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
              Valor Producto
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="w-full">
                <input
                  id="valorVigente"
                  name="valorVigente"
                  defaultValue="0"
                  required
                  placeholder="Ingresa un valor sin signos"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/products"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancelar
          </Link>
          <Button type="submit" onClick={() => setError('')}>
            Crear Producto
          </Button>
        </div>
        <div className="flex justify-end">
          {error && <p className="text-red-500">{error} </p>}
        </div>
      </div>
    </form>
  );
}
