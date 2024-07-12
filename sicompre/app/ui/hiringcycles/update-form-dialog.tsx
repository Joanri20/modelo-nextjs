'use client';

import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import { MessageUpdate } from '@ui/common/toast-message';
import { convertEnumToArray } from '@lib/conversEnums';
import { Enum_GeneralStatus } from '@prisma/client';
import { updateHiringCycle } from '@lib/actions/actionshiringcycles';

interface UpdateHiringCyclesDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  hiringCycle: HiringCycle;
}

export default function UpdateHiringCycleDialog({
  open,
  setOpen,
  hiringCycle,
}: UpdateHiringCyclesDialogProps) {
  const [error, setError] = useState('');

  const handleSubmit = async (formData: FormData) => {
    try {
      const result = await updateHiringCycle(hiringCycle.id, formData);
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
                  required
                  defaultValue={
                    new Date(hiringCycle.startDate).toISOString().split('T')[0]
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
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
                  required
                  defaultValue={
                    new Date(hiringCycle.endDate).toISOString().split('T')[0]
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="userId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Usuario Responsable
                </label>
                <input
                  id="userId"
                  name="userId"
                  required
                  defaultValue={hiringCycle.userId}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                ></input>
              </div>
              <div>
                <label
                  htmlFor="entityId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Entidad
                </label>
                <input
                  id="entityId"
                  name="entityId"
                  required
                  defaultValue={hiringCycle.entityId.toString()}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                ></input>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Estado
                </label>
                <input
                  id="status"
                  name="status"
                  required
                  defaultValue={hiringCycle.status}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                ></input>
              </div>
              <div>
                <label
                  htmlFor="quotationId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cotización (opcional)
                </label>
                <input
                  type="text"
                  id="quotationId"
                  name="quotationId"
                  defaultValue={
                    hiringCycle.quotationId
                      ? String(hiringCycle.quotationId)
                      : ''
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
