'use client';
import Link from 'next/link';
import { Button } from '@ui/button';
import { createAsset } from '@lib/actions/actionsAssets';
import { useState } from 'react';
import MessageCreate from '@ui/common/toast-message';
import { Enum_GeneralStatus } from '@prisma/client';
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
          <label htmlFor="startDate" className="mb-2 block text-sm font-medium">
            Fecha de Inicio *
          </label>
          <div className="relative">
            <input
              id="startDate"
              name="startDate"
              type="date"
              required
              className="input-app"
            />
          </div>
        </div>

        <div className="mb-4 w-full">
          <label htmlFor="endDate" className="mb-2 block text-sm font-medium">
            Fecha Final *
          </label>
          <div className="relative">
            <input
              id="endDate"
              name="endDate"
              type="date"
              required
              className="input-app"
            />
          </div>
        </div>

        <div className="mb-4 w-full">
          <label htmlFor="userId" className="mb-2 block text-sm font-medium">
            Usuario *
          </label>
          <div className="relative">
            <input
              id="userId"
              name="userId"
              required
              placeholder="Ingrese el ID del usuario"
              className="input-app"
            />
          </div>
        </div>

        <div className="mb-4 w-full">
          <label htmlFor="entityId" className="mb-2 block text-sm font-medium">
            Entidad *
          </label>
          <div className="relative">
            <input
              id="entityId"
              name="entityId"
              required
              placeholder="Ingrese el ID de la Entidad"
              className="input-app"
            />
          </div>
        </div>

        <div className="mb-4 w-full">
          <label htmlFor="status" className="mb-2 block text-sm font-medium">
            Estado *
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
              {/* Reemplaza con las opciones reales de Enum_ProcessStatus */}
              <option value="Abierto">Abierto</option>
              <option value="Cerrado">Cerrado</option>
            </select>
          </div>
        </div>

        <div className="mb-4 w-full">
          <label
            htmlFor="quotationId"
            className="mb-2 block text-sm font-medium"
          >
            Cotización (opcional)
          </label>
          <div className="relative">
            <input
              id="quotationId"
              name="quotationId"
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
