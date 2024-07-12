'use client';

import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import { MessageUpdate } from '@ui/common/toast-message';
import { convertEnumToArray } from '@lib/conversEnums';
import { Enum_GeneralStatus } from '@prisma/client';
import { updateQuotation } from '@lib/actions/actionsQuotations';

interface UpdateQuotationsDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  quotation: Quotation;
}

export default function UpdateQuotationDialog({
  open,
  setOpen,
  quotation,
}: UpdateQuotationsDialogProps) {
  const [error, setError] = useState('');

  const handleSubmit = async (formData: FormData) => {
    try {
      const result = await updateQuotation(quotation.id, formData);
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
      <DialogContent className="mb-2 p-10">
        <form
          onSubmit={(e: SyntheticEvent) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            handleSubmit(formData);
          }}
        >
          <div className="w-full rounded-md bg-gray-50 p-2 md:p-3">
            <div className="mb-2 flex w-full gap-3">
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de Inicio
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={quotation.startDate.toISOString().split('T')[0]}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  required
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha Final
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={quotation.endDate.toISOString().split('T')[0]}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="col-span-1">
                <label
                  htmlFor="userId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Usuario
                </label>
                <input
                  type="text"
                  id="userId"
                  name="userId"
                  defaultValue={quotation.userId}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  required
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="entityId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Entidad
                </label>
                <input
                  type="text"
                  id="entityId"
                  name="entityId"
                  defaultValue={quotation.entityId.toString()}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="col-span-1">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Estado
                </label>
                <select
                  id="status"
                  name="status"
                  value={quotation.status}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  required
                >
                  <option value="Abierto">Abierto</option>
                  <option value="Cerrado">Cerrado</option>
                </select>
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
