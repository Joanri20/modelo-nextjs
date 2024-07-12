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
        <div className="mb-4 flex flex-wrap gap-5">
          <div className="w-full md:w-5/12">
            <label
              htmlFor="startDate"
              className="mb-2 block text-sm font-medium"
            >
              Fecha de Inicio*
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              required
              className="input-app"
            />
          </div>
          <div className="w-full md:w-5/12">
            <label htmlFor="endDate" className="mb-2 block text-sm font-medium">
              Fecha Final*
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              required
              className="input-app"
            />
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-5">
          <div className="w-full md:w-5/12">
            <label htmlFor="userId" className="mb-2 block text-sm font-medium">
              Usuario *
            </label>
            <input
              id="userId"
              name="userId"
              required
              className="input-app"
            ></input>
          </div>
          <div className="w-full md:w-5/12">
            <label
              htmlFor="entityId"
              className="mb-2 block text-sm font-medium"
            >
              Entidad*
            </label>
            <input
              id="entityId"
              name="entityId"
              required
              className="input-app"
            ></input>
          </div>
        </div>

        {/*
        <div className="mb-4">
          <label htmlFor="status" className="mb-2 block text-sm font-medium">
            Estado*
          </label>
          <select id="status" name="status" required className="input-app">
            <option value="" disabled selected>
              Selecciona un status
            </option>
            {statuss.map((status) => (
              <option key={status} value={status}>
                {status}
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
