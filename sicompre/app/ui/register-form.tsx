'use client';
import { PencilIcon } from '@heroicons/react/24/outline';
import { Button } from '@ui/button';
import { createSupplier } from '@lib/actions/actionsSuppliers';
import { useState } from 'react';
import MessageCreate from '@ui/common/toast-message';

export default function Form() {
  const [error, setError] = useState('');

  return (
    <form
      action={async (formData: FormData) => {
        const result = await createSupplier(formData);
        const err = MessageCreate({ result });
        if (err) {
          setError(err);
        }
      }}
    >
      <div className="w-full rounded-md bg-gray-100 p-5">
        <h2 className="p-2 text-2xl font-medium">
          Si eres proveedor registrate aquí
        </h2>
        <div className="mb-4 flex flex-col lg:flex-row lg:items-center">
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium lg:mb-0 lg:mr-4"
          >
            Indica el nombre de la empresa *
          </label>
          <div className="relative flex-1">
            <input
              id="name"
              name="name"
              placeholder="Ingrese nombre de la empresa"
              required
              className="input-app w-full"
            />
            <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>

        <div className="mb-4 flex flex-col lg:flex-row lg:items-center">
          <label
            htmlFor="taxId"
            className="mb-2 block text-sm font-medium lg:mb-0 lg:mr-4"
          >
            Indica el NIT *
          </label>
          <div className="relative flex-1">
            <input
              id="taxId"
              name="taxId"
              placeholder="Ingrese el NIT con indicativo ejm 8110000-6"
              required
              className="input-app w-full"
            />
            <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>

        <div className="mb-4 flex flex-col lg:flex-row lg:items-center">
          <label
            htmlFor="address"
            className="mb-2 block text-sm font-medium lg:mb-0 lg:mr-4"
          >
            Indica la dirección *
          </label>
          <div className="relative flex-1">
            <input
              id="address"
              name="address"
              placeholder="Ingrese una dirección de contacto"
              required
              className="input-app w-full"
            />
            <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>

        <div className="mb-4 flex flex-col lg:flex-row lg:items-center">
          <label
            htmlFor="namePersonResponsible"
            className="mb-2 block text-sm font-medium lg:mb-0 lg:mr-4"
          >
            Indica nombre de un responsable *
          </label>
          <div className="relative flex-1">
            <input
              id="namePersonResponsible"
              name="namePersonResponsible"
              placeholder="Ingrese un responsable"
              required
              className="input-app w-full"
            />
            <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>

        <div className="mb-4 flex flex-col lg:flex-row lg:items-center">
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-medium lg:mb-0 lg:mr-4"
          >
            Indica un teléfono de contacto *
          </label>
          <div className="relative flex-1">
            <input
              id="phone"
              name="phone"
              placeholder="Si tienes varios sepáralos por guión -"
              required
              className="input-app w-full"
            />
            <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
        <div className="mb-4 flex flex-col lg:flex-row lg:items-center">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium lg:mb-0 lg:mr-4"
          >
            Indica un correo electronico *
          </label>
          <div className="relative flex-1">
            <input
              id="email"
              name="email"
              placeholder="Ingrese una dirección de correo"
              required
              className="input-app w-full"
            />
            <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
        <div className="mb-4 flex flex-col lg:flex-row lg:items-center">
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium lg:mb-0 lg:mr-4"
          >
            Indica una contraseña *
          </label>
          <div className="relative flex-1">
            <input
              id="password"
              name="password"
              placeholder="Ingrese una contraseña"
              required
              className="input-app w-full"
            />
            <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button type="submit">Registrarse</Button>
        </div>
        <div className="flex justify-end">
          {error && <p className="text-red-500">{error} </p>}
        </div>
      </div>
    </form>
  );
}
