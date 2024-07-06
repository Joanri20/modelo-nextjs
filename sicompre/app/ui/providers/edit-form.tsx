'use client';

import { Bien, GrupoBien, Proveedor } from 'lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  PencilIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from 'ui/button';
import { updateProvider } from '@lib/actions/actionsProviders';
import { MessageUpdate } from './toast-message';

export default function EditProviderForm({
  provider,
}: {
  provider: Proveedor;
}) {
  const updateInvoiceWithId = updateProvider.bind(null, provider.id);
  return (
    <form
      action={async (formData: FormData) => {
        const result = await updateInvoiceWithId(formData);
        MessageUpdate({ result });
      }}
    >
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4 flex gap-5">
          <div className="w-3/6">
            <label htmlFor="nombre" className="mb-2 block text-sm font-medium">
              Indica el nombre del proveedor *
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="nombre"
                  name="nombre"
                  placeholder="Ingrese nombre"
                  defaultValue={provider.nombre}
                  disabled
                  required
                  className="peer block w-full cursor-not-allowed rounded-md border border-gray-200 bg-gray-300 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
          <div className="w-3/6">
            <label htmlFor="nit" className="mb-2 block text-sm font-medium">
              Indica el NIT *
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="nit"
                  name="nit"
                  placeholder="Ingrese nit con indicativo 8110000-6"
                  defaultValue={provider.nit}
                  disabled
                  required
                  className="peer block w-full cursor-not-allowed rounded-md border border-gray-200 bg-gray-300 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
          <div className="w-3/6">
            <label
              htmlFor="direccion"
              className="mb-2 block text-sm font-medium"
            >
              Indica la dirección *
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="direccion"
                  name="direccion"
                  placeholder="Ingrese una dirección de contacto"
                  defaultValue={provider.direccion}
                  disabled
                  required
                  className="peer block w-full cursor-not-allowed rounded-md border border-gray-200 bg-gray-300 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
          <div className="w-3/6">
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Indica el correo electronico *
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  placeholder="Ingrese una dirección de correo"
                  defaultValue={provider.email}
                  required
                  className="peer block w-full rounded-md border border-gray-200 bg-gray-300 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
          <div className="w-3/6">
            <label
              htmlFor="telefono"
              className="mb-2 block text-sm font-medium"
            >
              Indica un teléfono de contacto *
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="telefono"
                  name="telefono"
                  placeholder="Si tienes varios sepáralos por guío -"
                  defaultValue={provider.telefono}
                  required
                  className="peer block w-full cursor-not-allowed rounded-md border border-gray-200 bg-gray-300 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/providers"
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
