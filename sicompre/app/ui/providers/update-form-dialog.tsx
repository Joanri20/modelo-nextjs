'use client';

import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import { updateProvider } from '@lib/actions/actionsProviders';
import { MessageUpdate } from '@ui/common/toast-message';

interface UpdateProveedorDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  proveedor: Proveedor;
}

export default function UpdateProveedorDialog({
  open,
  setOpen,
  proveedor,
}: UpdateProveedorDialogProps) {
  const [error, setError] = useState('');
  const { id, nombre, email, direccion, telefono, nit } = proveedor || {};

  const handleSubmit = async (formData: FormData) => {
    try {
      const result = await updateProvider(id!, formData);
      const err = MessageUpdate({ result });
      if (err) {
        setError(err);
      } else {
        setOpen(false);
      }
    } catch (err) {
      setError('Error al actualizar el proveedor');
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
            <div className="mb-4 flex gap-5">
              <div className="w-3/6">
                <label
                  htmlFor="nombre"
                  className="mb-2 block text-sm font-medium"
                >
                  Indica el nombre del proveedor *
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  placeholder="Ingrese nombre"
                  required
                  className="input-app"
                  defaultValue={nombre}
                />
              </div>
              <div className="w-3/6">
                <label htmlFor="nit" className="mb-2 block text-sm font-medium">
                  Indica el NIT *
                </label>
                <input
                  id="nit"
                  name="nit"
                  placeholder="Ingrese nit con indicativo 8110000-6"
                  required
                  className="input-app"
                  defaultValue={nit}
                />
              </div>
            </div>
            <div className="mb-4 flex gap-5">
              <div className="w-3/6">
                <label
                  htmlFor="direccion"
                  className="mb-2 block text-sm font-medium"
                >
                  Indica la dirección *
                </label>
                <input
                  id="direccion"
                  name="direccion"
                  placeholder="Ingrese una dirección de contacto"
                  required
                  className="input-app"
                  defaultValue={direccion}
                />
              </div>
              <div className="w-3/6">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Indica el correo electronico *
                </label>
                <input
                  id="email"
                  name="email"
                  placeholder="Ingrese una dirección de correo"
                  required
                  className="input-app"
                  defaultValue={email}
                />
              </div>
            </div>
            <div className="mb-4 flex gap-5">
              <div className="w-3/6">
                <label
                  htmlFor="telefono"
                  className="mb-2 block text-sm font-medium"
                >
                  Indica un teléfono de contacto *
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  placeholder="Si tienes varios sepáralos por guión -"
                  required
                  className="input-app"
                  defaultValue={telefono}
                />
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
