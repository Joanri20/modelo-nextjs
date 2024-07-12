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
import {
  Enum_GeneralStatus,
  Enum_DocumentType,
  Enum_UserType,
} from '@prisma/client';
import { convertEnumToArray } from '@lib/conversEnums';
import { createUser } from '@lib/actions/actionsUsers';

export default function Form() {
  const [error, setError] = useState('');

  return (
    <form
      action={async (formData: FormData) => {
        const result = await createUser(formData);
        const err = MessageCreate({ result });
        if (err) {
          setError(err);
        }
      }}
    >
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4 w-full">
          <label htmlFor="id" className="mb-2 block text-sm font-medium">
            ID *
          </label>
          <div className="relative">
            <input
              id="id"
              name="id"
              required
              className="input-app"
              placeholder="Ingrese el ID"
            />
            <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
        <div className="mb-4 flex gap-5">
          <div className="w-full">
            <label
              htmlFor="firstName"
              className="mb-2 block text-sm font-medium"
            >
              Primer Nombre *
            </label>
            <div className="relative">
              <input
                id="firstName"
                name="firstName"
                required
                className="input-app"
                placeholder="Ingrese el primer nombre"
              />
              <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="middleName"
              className="mb-2 block text-sm font-medium"
            >
              Segundo Nombre
            </label>
            <div className="relative">
              <input
                id="middleName"
                name="middleName"
                className="input-app"
                placeholder="Ingrese el segundo nombre"
              />
              <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mb-4 flex gap-5">
          <div className="w-full">
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium"
            >
              Primer Apellido *
            </label>
            <div className="relative">
              <input
                id="lastName"
                name="lastName"
                required
                className="input-app"
                placeholder="Ingrese el primer apellido"
              />
              <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="secondLastName"
              className="mb-2 block text-sm font-medium"
            >
              Segundo Apellido
            </label>
            <div className="relative">
              <input
                id="secondLastName"
                name="secondLastName"
                className="input-app"
                placeholder="Ingrese el segundo apellido"
              />
              <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mb-4 flex gap-5">
          <div className="mb-4 w-full">
            <label
              htmlFor="documentType"
              className="mb-2 block text-sm font-medium"
            >
              Tipo de Documento *
            </label>
            <div className="relative">
              <select
                id="documentType"
                name="documentType"
                required
                className="input-app"
                defaultValue="CC"
              >
                <option value="" disabled>
                  Selecciona un type de document
                </option>
                {convertEnumToArray(Enum_DocumentType).map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.description}
                  </option>
                ))}
              </select>
              <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mb-4 w-full">
            <label
              htmlFor="document"
              className="mb-2 block text-sm font-medium"
            >
              Documento *
            </label>
            <div className="relative">
              <input
                id="document"
                name="document"
                required
                className="input-app"
                placeholder="Ingrese el número de document"
              />
              <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="mobile" className="mb-2 block text-sm font-medium">
              Celular *
            </label>
            <div className="relative">
              <input
                id="mobile"
                name="mobile"
                required
                className="input-app"
                placeholder="Ingrese el mobile"
              />
              <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="phone" className="mb-2 block text-sm font-medium">
              Teléfono
            </label>
            <div className="relative">
              <input
                id="phone"
                name="phone"
                className="input-app"
                placeholder="Ingrese el teléfono"
              />
              <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        <div className="mb-4 flex gap-5">
          <div className="w-full">
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email *
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                required
                className="input-app"
                placeholder="Ingrese el email"
              />
              <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="address" className="mb-2 block text-sm font-medium">
              Dirección de Residencia *
            </label>
            <div className="relative">
              <input
                id="address"
                name="address"
                required
                className="input-app"
                placeholder="Ingrese la dirección"
              />
              <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        <div className="mb-4 flex gap-5">
          <div className="mb-4 w-full">
            <label htmlFor="type" className="mb-2 block text-sm font-medium">
              Tipo de usuario *
            </label>
            <div className="relative">
              <select
                id="type"
                name="type"
                required
                className="input-app"
                defaultValue=""
              >
                <option value="" disabled>
                  Selecciona un tipo de usuario
                </option>
                {convertEnumToArray(Enum_UserType).map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.description}
                  </option>
                ))}
              </select>
              <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="status" className="mb-2 block text-sm font-medium">
              Estado del usuario *
            </label>
            <div className="relative">
              <select
                id="status"
                name="status"
                required
                className="input-app"
                defaultValue=""
              >
                <option value="" disabled>
                  Selecciona un estado
                </option>
                {convertEnumToArray(Enum_GeneralStatus).map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.description}
                  </option>
                ))}
              </select>
              <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/users"
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
