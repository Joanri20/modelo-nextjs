'use client';

import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import { CurrencyDollarIcon, PencilIcon } from '@heroicons/react/24/outline';
import { updateUser } from '@lib/actions/actionsUsers';
import { MessageUpdate } from '@ui/common/toast-message';
import { convertEnumToArray } from '@lib/conversEnums';
import {
  Enum_EstadoGeneral,
  Enum_TipoDocumento,
  Enum_TipoUsuario,
} from '@prisma/client';

interface UpdateUsersDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  usuario: Usuario;
}

export default function UpdateUserDialog({
  open,
  setOpen,
  usuario,
}: UpdateUsersDialogProps) {
  const [error, setError] = useState('');

  const handleSubmit = async (formData: FormData) => {
    try {
      const result = await updateUser(usuario?.id, formData);
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
                  defaultValue={usuario.id}
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
                  defaultValue={usuario.password}
                  required
                  className="input-app"
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
                    defaultValue={usuario.primerNombre}
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
                    defaultValue={usuario.segundoNombre ?? ''}
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
                    defaultValue={usuario.primerApellido}
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
                    defaultValue={usuario.segundoApellido ?? ''}
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
                    defaultValue={usuario.tipoDocumento}
                    required
                    className="input-app"
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
                    defaultValue={usuario.documento}
                    required
                    className="input-app"
                    placeholder="Ingrese el número de documento"
                  />
                  <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
              <div className="mb-4 w-full">
                <label
                  htmlFor="celular"
                  className="mb-2 block text-sm font-medium"
                >
                  Celular *
                </label>
                <div className="relative">
                  <input
                    id="celular"
                    name="celular"
                    defaultValue={usuario.celular}
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
                    defaultValue={usuario.telefono ?? ''}
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
                    defaultValue={usuario.email}
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
                    defaultValue={usuario.direccion ?? ''}
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
                  htmlFor="tipo"
                  className="mb-2 block text-sm font-medium"
                >
                  Tipo de usuario *
                </label>
                <div className="relative">
                  <select
                    id="tipo"
                    name="tipo"
                    required
                    className="input-app"
                    defaultValue={usuario.tipo}
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
                <label
                  htmlFor="estado"
                  className="mb-2 block text-sm font-medium"
                >
                  Estado del usuario *
                </label>
                <div className="relative">
                  <select
                    id="estado"
                    name="estado"
                    required
                    className="input-app"
                    defaultValue={usuario.estado}
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
