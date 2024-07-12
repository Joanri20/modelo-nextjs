'use client';
import Link from 'next/link';
import { Button } from '@ui/button';
import { createAsset } from '@lib/actions/actionsAssets';
import { useState } from 'react';
import MessageCreate from '@ui/common/toast-message';
import {
  Enum_GeneralStatus,
  Enum_DocumentType,
  Enum_UserType,
} from '@prisma/client';
import { convertEnumToArray } from '@lib/conversEnums';

export default function Form() {
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
        <div className="mb-4 flex gap-5">
          <div className="mb-4 w-full md:w-5/12">
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Nombre Entidad/organización*
            </label>
            <div className="relative">
              <input
                id="name"
                name="name"
                required
                placeholder="Ingrese el nombre"
                className="input-app"
              />
            </div>
          </div>
          <div className="mb-4 w-full md:w-5/12">
            <label htmlFor="taxId" className="mb-2 block text-sm font-medium">
              NIT *
            </label>
            <div className="relative">
              <input
                id="taxId"
                name="taxId"
                required
                placeholder="Ingrese el NIT"
                className="input-app"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <label htmlFor="phone" className="mb-2 block text-sm font-medium">
              Teléfono *
            </label>
            <div className="relative">
              <input
                id="phone"
                name="phone"
                required
                placeholder="Ingrese el teléfono"
                className="input-app"
              />
            </div>
          </div>
        </div>
        <div className="mb-4 flex gap-5">
          <div className="w-full md:w-1/2">
            <label htmlFor="address" className="mb-2 block text-sm font-medium">
              Dirección *
            </label>
            <div className="relative">
              <input
                id="address"
                name="address"
                required
                placeholder="Ingrese la dirección"
                className="input-app"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <label htmlFor="city" className="mb-2 block text-sm font-medium">
              Municipio *
            </label>
            <div className="relative">
              <input
                id="city"
                name="city"
                required
                placeholder="Ingrese el municipio"
                className="input-app"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <label htmlFor="state" className="mb-2 block text-sm font-medium">
              Departamento *
            </label>
            <div className="relative">
              <input
                id="state"
                name="state"
                required
                placeholder="Ingrese el departamento"
                className="input-app"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <label htmlFor="country" className="mb-2 block text-sm font-medium">
              País *
            </label>
            <div className="relative">
              <input
                id="country"
                name="country"
                required
                placeholder="Ingrese el país"
                className="input-app"
              />
            </div>
          </div>
        </div>

        <div className="mb-4 flex gap-5">
          <div className="w-full md:w-1/2">
            <label htmlFor="website" className="mb-2 block text-sm font-medium">
              Web
            </label>
            <div className="relative">
              <input
                id="website"
                name="website"
                placeholder="Ingrese el sitio website"
                className="input-app"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email *
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                required
                placeholder="Ingrese el email"
                className="input-app"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <label
              htmlFor="possessionResolution"
              className="mb-2 block text-sm font-medium"
            >
              Resolución de Posesión
            </label>
            <div className="relative">
              <input
                id="possessionResolution"
                name="possessionResolution"
                placeholder="Ingrese la resolución de posesión"
                className="input-app"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <label
              htmlFor="possessionDate"
              className="mb-2 block text-sm font-medium"
            >
              Fecha de Posesión
            </label>
            <div className="relative">
              <input
                id="possessionDate"
                name="possessionDate"
                placeholder="Ingrese la date de posesión"
                className="input-app"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-5">
          <div className="mb-4">
            <label htmlFor="status" className="mb-2 block text-sm font-medium">
              Estado de Entidad *
            </label>
            <div className="relative">
              <select id="status" name="status" required className="input-app">
                <option value="" disabled>
                  Selecciona un status
                </option>
                {convertEnumToArray(Enum_GeneralStatus).map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.description}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="availableBalance"
              className="mb-2 block text-sm font-medium"
            >
              Saldo Disponible
            </label>
            <div className="relative">
              <input
                id="availableBalance"
                name="availableBalance"
                placeholder="Ingrese el saldo disponible"
                className="input-app"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/entities"
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
