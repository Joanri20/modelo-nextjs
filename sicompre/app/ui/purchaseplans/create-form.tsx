'use client';
import Link from 'next/link';
import { Button } from '@ui/button';
import { createAsset } from '@lib/actions/actionsAssets';
import { useState } from 'react';
import MessageCreate from '@ui/common/toast-message';

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
      <div className="rounded-md bg-gray-50 p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Campo Fecha */}
          <div className="mb-4">
            <label htmlFor="fecha" className="block text-sm font-medium">
              Fecha *
            </label>
            <input
              id="fecha"
              name="fecha"
              type="date"
              required
              className="input-app"
            />
          </div>

          {/* Campo Estado */}
          <div className="mb-4">
            <label htmlFor="estado" className="block text-sm font-medium">
              Estado *
            </label>
            <select id="estado" name="estado" required className="input-app">
              <option value="Abierto">Abierto</option>
              <option value="Cerrado">Cerrado</option>
              {/* Agregar más opciones según sea necesario */}
            </select>
          </div>

          {/* Campo Dependencia */}
          <div className="mb-4">
            <label
              htmlFor="dependenciaId"
              className="block text-sm font-medium"
            >
              Dependencia *
            </label>
            <input
              id="dependenciaId"
              name="dependenciaId"
              required
              className="input-app"
            ></input>
          </div>

          {/* Campo Usuario */}
          <div className="mb-4">
            <label htmlFor="usuarioId" className="block text-sm font-medium">
              Usuario *
            </label>
            <input
              id="usuarioId"
              name="usuarioId"
              required
              className="input-app"
            ></input>
          </div>

          {/* Campo Ciclo de Contratación */}
          <div className="mb-4">
            <label
              htmlFor="cicloContratacionId"
              className="block text-sm font-medium"
            >
              Ciclo de Contratación (opcional)
            </label>
            <input
              id="cicloContratacionId"
              name="cicloContratacionId"
              className="input-app"
            ></input>
          </div>

          {/* Campo Valor Total */}
          <div className="mb-4">
            <label htmlFor="valorTotal" className="block text-sm font-medium">
              Valor Total (opcional)
            </label>
            <input
              id="valorTotal"
              name="valorTotal"
              type="number"
              step="0.01"
              className="input-app"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/purchaseplans"
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
