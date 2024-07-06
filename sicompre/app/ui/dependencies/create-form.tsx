'use client';
import Link from 'next/link';
import {
  UserCircleIcon,
  PencilIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@ui/button';
import { useState } from 'react';
import MessageCreate from '@ui/common/toast-message';
import {
  Enum_EstadoGeneral,
  Enum_TipoDocumento,
  Enum_TipoUsuario,
} from '@prisma/client';
import { convertEnumToArray } from '@lib/conversEnums';
import { createDependence } from '@lib/actions/actionsDependencies';

export default function Form() {
  const [error, setError] = useState('');

  return (
    <form
      action={async (formData: FormData) => {
        const result = await createDependence(formData);
        const err = MessageCreate({ result });
        if (err) {
          setError(err);
        }
      }}
    >
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4 flex gap-5">
          <div className="mb-4 w-full md:w-5/12">
            <label htmlFor="nombre" className="mb-2 block text-sm font-medium">
              Nombre dependencia/organización*
            </label>
            <div className="relative">
              <input
                id="nombre"
                name="nombre"
                required
                placeholder="Ingrese el nombre"
                className="input-app"
              />
            </div>
          </div>
          <div className="mb-4 w-full md:w-5/12">
            <label htmlFor="nit" className="mb-2 block text-sm font-medium">
              NIT *
            </label>
            <div className="relative">
              <input
                id="nit"
                name="nit"
                required
                placeholder="Ingrese el NIT"
                className="input-app"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <label
              htmlFor="telefono"
              className="mb-2 block text-sm font-medium"
            >
              Teléfono *
            </label>
            <div className="relative">
              <input
                id="telefono"
                name="telefono"
                required
                placeholder="Ingrese el teléfono"
                className="input-app"
              />
            </div>
          </div>
        </div>
        <div className="mb-4 flex gap-5">
          <div className="w-full md:w-1/2">
            <label
              htmlFor="direccion"
              className="mb-2 block text-sm font-medium"
            >
              Dirección *
            </label>
            <div className="relative">
              <input
                id="direccion"
                name="direccion"
                required
                placeholder="Ingrese la dirección"
                className="input-app"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <label
              htmlFor="municipio"
              className="mb-2 block text-sm font-medium"
            >
              Municipio *
            </label>
            <div className="relative">
              <input
                id="municipio"
                name="municipio"
                required
                placeholder="Ingrese el municipio"
                className="input-app"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <label
              htmlFor="departamento"
              className="mb-2 block text-sm font-medium"
            >
              Departamento *
            </label>
            <div className="relative">
              <input
                id="departamento"
                name="departamento"
                required
                placeholder="Ingrese el departamento"
                className="input-app"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <label htmlFor="pais" className="mb-2 block text-sm font-medium">
              País *
            </label>
            <div className="relative">
              <input
                id="pais"
                name="pais"
                required
                placeholder="Ingrese el país"
                className="input-app"
              />
            </div>
          </div>
        </div>

        <div className="mb-4 flex gap-5">
          <div className="w-full md:w-1/2">
            <label htmlFor="web" className="mb-2 block text-sm font-medium">
              Web
            </label>
            <div className="relative">
              <input
                id="web"
                name="web"
                placeholder="Ingrese el sitio web"
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
              htmlFor="resolucionPosesion"
              className="mb-2 block text-sm font-medium"
            >
              Resolución de Posesión
            </label>
            <div className="relative">
              <input
                id="resolucionPosesion"
                name="resolucionPosesion"
                placeholder="Ingrese la resolución de posesión"
                className="input-app"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <label
              htmlFor="fechaPosesion"
              className="mb-2 block text-sm font-medium"
            >
              Fecha de Posesión
            </label>
            <div className="relative">
              <input
                id="fechaPosesion"
                name="fechaPosesion"
                placeholder="Ingrese la fecha de posesión"
                className="input-app"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-5">
          <div className="mb-4">
            <label htmlFor="estado" className="mb-2 block text-sm font-medium">
              Estado de Dependencia *
            </label>
            <div className="relative">
              <select id="estado" name="estado" required className="input-app">
                <option value="" disabled>
                  Selecciona un estado
                </option>
                {convertEnumToArray(Enum_EstadoGeneral).map((estado) => (
                  <option key={estado.id} value={estado.id}>
                    {estado.descripcion}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="saldoDisponible"
              className="mb-2 block text-sm font-medium"
            >
              Saldo Disponible
            </label>
            <div className="relative">
              <input
                id="saldoDisponible"
                name="saldoDisponible"
                placeholder="Ingrese el saldo disponible"
                className="input-app"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="entidadId"
              className="mb-2 block text-sm font-medium"
            >
              Entidad Padre
            </label>
            <div className="relative">
              <input
                id="entidadId"
                name="entidadId"
                placeholder="Ingrese el id de la Entidad Padre"
                className="input-app"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <label htmlFor="estado" className="mb-2 block text-sm font-medium">
              Estado de Dependencia *
            </label>
            <div className="relative">
              <select
                id="estado"
                name="estado"
                required
                className="input-app"
                defaultValue="Activo"
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
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/dependencies"
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
