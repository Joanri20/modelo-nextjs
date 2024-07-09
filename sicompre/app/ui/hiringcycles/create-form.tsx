'use client';
import Link from 'next/link';
import { Button } from '@ui/button';
import { createAsset } from '@lib/actions/actionsAssets';
import { useState } from 'react';
import MessageCreate from '@ui/common/toast-message';
import { Enum_EstadoGeneral } from '@prisma/client';
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
      <div className="flex flex-col gap-8">
        <div className="mb-4 w-full">
          <label
            htmlFor="fechaInicio"
            className="mb-2 block text-sm font-medium"
          >
            Fecha de Inicio *
          </label>
          <div className="relative">
            <input
              id="fechaInicio"
              name="fechaInicio"
              type="date"
              required
              className="input-app"
            />
          </div>
        </div>

        <div className="mb-4 w-full">
          <label
            htmlFor="fechaFinal"
            className="mb-2 block text-sm font-medium"
          >
            Fecha Final *
          </label>
          <div className="relative">
            <input
              id="fechaFinal"
              name="fechaFinal"
              type="date"
              required
              className="input-app"
            />
          </div>
        </div>

        <div className="mb-4 w-full">
          <label htmlFor="usuarioId" className="mb-2 block text-sm font-medium">
            Usuario *
          </label>
          <div className="relative">
            <input
              id="usuarioId"
              name="usuarioId"
              required
              placeholder="Ingrese el ID del usuario"
              className="input-app"
            />
          </div>
        </div>

        <div className="mb-4 w-full">
          <label htmlFor="entidadId" className="mb-2 block text-sm font-medium">
            Entidad *
          </label>
          <div className="relative">
            <input
              id="entidadId"
              name="entidadId"
              required
              placeholder="Ingrese el ID de la entidad"
              className="input-app"
            />
          </div>
        </div>

        <div className="mb-4 w-full">
          <label htmlFor="estado" className="mb-2 block text-sm font-medium">
            Estado *
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
              {/* Reemplaza con las opciones reales de Enum_EstadoProceso */}
              <option value="Abierto">Abierto</option>
              <option value="Cerrado">Cerrado</option>
            </select>
          </div>
        </div>

        <div className="mb-4 w-full">
          <label
            htmlFor="cotizacionId"
            className="mb-2 block text-sm font-medium"
          >
            Cotización (opcional)
          </label>
          <div className="relative">
            <input
              id="cotizacionId"
              name="cotizacionId"
              placeholder="Ingrese el ID de la cotización"
              className="input-app"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/hiringcycles"
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
