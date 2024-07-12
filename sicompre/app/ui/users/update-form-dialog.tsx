'use client';

import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import { CurrencyDollarIcon, PencilIcon } from '@heroicons/react/24/outline';
import { updateUser } from '@lib/actions/actionsUsers';
import { MessageUpdate } from '@ui/common/toast-message';
import { convertEnumToArray } from '@lib/conversEnums';
import {
  Enum_GeneralStatus,
  Enum_DocumentType,
  Enum_UserType,
} from '@prisma/client';

interface UpdateUsersDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  user: User;
}

export default function UpdateUserDialog({
  open,
  setOpen,
  user,
}: UpdateUsersDialogProps) {
  const [error, setError] = useState('');

  const handleSubmit = async (formData: FormData) => {
    try {
      const result = await updateUser(user?.id, formData);
      const err = MessageUpdate({ result });
      if (err) {
        setError(err);
      } else {
        setOpen(false);
      }
    } catch (err) {
      setError('Error al actualizar');
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>
        <h1 className="font-bold">Modificar información</h1>
      </DialogTitle>
      <DialogContent>
        <form
          onSubmit={(e: SyntheticEvent) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            handleSubmit(formData);
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
                  defaultValue={user.id}
                  required
                  disabled
                  className="input-app"
                />
                <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                Password *
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  defaultValue={user.password}
                  required
                  className="input-app"
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
                    defaultValue={user.firstName}
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
                    defaultValue={user.middleName ?? ''}
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
                    defaultValue={user.lastName}
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
                    defaultValue={user.secondLastName ?? ''}
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
                    defaultValue={user.documentType}
                    required
                    className="input-app"
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
                    defaultValue={user.document}
                    required
                    className="input-app"
                    placeholder="Ingrese el número de document"
                  />
                  <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
              <div className="mb-4 w-full">
                <label
                  htmlFor="mobile"
                  className="mb-2 block text-sm font-medium"
                >
                  Celular *
                </label>
                <div className="relative">
                  <input
                    id="mobile"
                    name="mobile"
                    defaultValue={user.mobile}
                    required
                    className="input-app"
                    placeholder="Ingrese el mobile"
                  />
                  <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
              <div className="mb-4 w-full">
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium"
                >
                  Teléfono
                </label>
                <div className="relative">
                  <input
                    id="phone"
                    name="phone"
                    defaultValue={user.phone ?? ''}
                    className="input-app"
                    placeholder="Ingrese el teléfono"
                  />
                  <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
            </div>

            <div className="mb-4 flex gap-5">
              <div className="w-full">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email *
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    defaultValue={user.email}
                    required
                    className="input-app"
                    placeholder="Ingrese el email"
                  />
                  <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
              <div className="mb-4 w-full">
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm font-medium"
                >
                  Dirección de Residencia *
                </label>
                <div className="relative">
                  <input
                    id="address"
                    name="address"
                    defaultValue={user.address ?? ''}
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
                <label
                  htmlFor="type"
                  className="mb-2 block text-sm font-medium"
                >
                  Tipo de usuario *
                </label>
                <div className="relative">
                  <select
                    id="type"
                    name="type"
                    required
                    className="input-app"
                    defaultValue={user.type}
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
                <label
                  htmlFor="status"
                  className="mb-2 block text-sm font-medium"
                >
                  Estado del usuario *
                </label>
                <div className="relative">
                  <select
                    id="status"
                    name="status"
                    required
                    className="input-app"
                    defaultValue={user.status}
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
            {error && <p className="text-red-500">{error}</p>}
            <div className="mt-6 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-10 items-center rounded-lg bg-gray-200 px-4 text-sm text-gray-700 hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm text-white hover:bg-blue-700"
              >
                Actualizar
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
