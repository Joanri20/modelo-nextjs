'use client';
import Link from 'next/link';
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
        <div className="mb-4 flex flex-wrap gap-5">
          <div className="w-full md:w-5/12">
            <label
              htmlFor="fechaInicio"
              className="mb-2 block text-sm font-medium"
            >
              Fecha de Inicio*
            </label>
            <input
              type="date"
              id="fechaInicio"
              name="fechaInicio"
              required
              className="input-app"
            />
          </div>
          <div className="w-full md:w-5/12">
            <label
              htmlFor="fechaFinal"
              className="mb-2 block text-sm font-medium"
            >
              Fecha Final*
            </label>
            <input
              type="date"
              id="fechaFinal"
              name="fechaFinal"
              required
              className="input-app"
            />
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-5">
          <div className="w-full md:w-5/12">
            <label
              htmlFor="usuarioId"
              className="mb-2 block text-sm font-medium"
            >
              Usuario*
            </label>
            <input
              id="usuarioId"
              name="usuarioId"
              required
              className="input-app"
            ></input>
          </div>
          <div className="w-full md:w-5/12">
            <label
              htmlFor="entidadId"
              className="mb-2 block text-sm font-medium"
            >
              Entidad*
            </label>
            <input
              id="entidadId"
              name="entidadId"
              required
              className="input-app"
            ></input>
          </div>
        </div>

        {/*
        <div className="mb-4">
          <label htmlFor="estado" className="mb-2 block text-sm font-medium">
            Estado*
          </label>
          <select id="estado" name="estado" required className="input-app">
            <option value="" disabled selected>
              Selecciona un estado
            </option>
            {estados.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
        </div>
        */}
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/quotations"
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
