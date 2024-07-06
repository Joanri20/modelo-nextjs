'use client';
import { GrupoBien } from '@lib/definitions';
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
  Enum_EstadoGeneral,
  Enum_TipoDocumento,
  Enum_TipoUsuario,
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
              htmlFor="primerNombre"
              className="mb-2 block text-sm font-medium"
            >
              Primer Nombre *
            </label>
            <div className="relative">
              <input
                id="primerNombre"
                name="primerNombre"
                required
                className="input-app"
                placeholder="Ingrese el primer nombre"
              />
              <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="segundoNombre"
              className="mb-2 block text-sm font-medium"
            >
              Segundo Nombre
            </label>
            <div className="relative">
              <input
                id="segundoNombre"
                name="segundoNombre"
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
              htmlFor="primerApellido"
              className="mb-2 block text-sm font-medium"
            >
              Primer Apellido *
            </label>
            <div className="relative">
              <input
                id="primerApellido"
                name="primerApellido"
                required
                className="input-app"
                placeholder="Ingrese el primer apellido"
              />
              <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="segundoApellido"
              className="mb-2 block text-sm font-medium"
            >
              Segundo Apellido
            </label>
            <div className="relative">
              <input
                id="segundoApellido"
                name="segundoApellido"
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
              htmlFor="tipoDocumento"
              className="mb-2 block text-sm font-medium"
            >
              Tipo de Documento *
            </label>
            <div className="relative">
              <select
                id="tipoDocumento"
                name="tipoDocumento"
                required
                className="input-app"
                defaultValue="CC"
              >
                <option value="" disabled>
                  Selecciona un tipo de documento
                </option>
                {convertEnumToArray(Enum_TipoDocumento).map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.descripcion}
                  </option>
                ))}
              </select>
              <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mb-4 w-full">
            <label
              htmlFor="documento"
              className="mb-2 block text-sm font-medium"
            >
              Documento *
            </label>
            <div className="relative">
              <input
                id="documento"
                name="documento"
                required
                className="input-app"
                placeholder="Ingrese el número de documento"
              />
              <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="celular" className="mb-2 block text-sm font-medium">
              Celular *
            </label>
            <div className="relative">
              <input
                id="celular"
                name="celular"
                required
                className="input-app"
                placeholder="Ingrese el celular"
              />
              <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mb-4 w-full">
            <label
              htmlFor="telefono"
              className="mb-2 block text-sm font-medium"
            >
              Teléfono
            </label>
            <div className="relative">
              <input
                id="telefono"
                name="telefono"
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
            <label
              htmlFor="direccion"
              className="mb-2 block text-sm font-medium"
            >
              Dirección de Residencia *
            </label>
            <div className="relative">
              <input
                id="direccion"
                name="direccion"
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
            <label htmlFor="tipo" className="mb-2 block text-sm font-medium">
              Tipo de usuario *
            </label>
            <div className="relative">
              <select
                id="tipo"
                name="tipo"
                required
                className="input-app"
                defaultValue=""
              >
                <option value="" disabled>
                  Selecciona un tipo de usuario
                </option>
                {convertEnumToArray(Enum_TipoUsuario).map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.descripcion}
                  </option>
                ))}
              </select>
              <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="estado" className="mb-2 block text-sm font-medium">
              Estado del usuario *
            </label>
            <div className="relative">
              <select
                id="estado"
                name="estado"
                required
                className="input-app"
                defaultValue=""
              >
                <option value="" disabled>
                  Selecciona un estado
                </option>
                {convertEnumToArray(Enum_EstadoGeneral).map((estado) => (
                  <option key={estado.id} value={estado.id}>
                    {estado.descripcion}
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
