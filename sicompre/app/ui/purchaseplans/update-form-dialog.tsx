'use client';

import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import { CurrencyDollarIcon, PencilIcon } from '@heroicons/react/24/outline';
import { updatePurchasePlan } from '@lib/actions/actionsPurchasePlans';
import { MessageUpdate } from '@ui/common/toast-message';
import { convertEnumToArray } from '@lib/conversEnums';
import { Enum_EstadoGeneral, Enum_TipoDocumento } from '@prisma/client';

interface UpdatePurchasePlansDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  plandecompras: PlanDeCompras;
}

export default function UpdatePurchasePlanDialog({
  open,
  setOpen,
  plandecompras,
}: UpdatePurchasePlansDialogProps) {
  const [error, setError] = useState('');

  const handleSubmit = async (formData: FormData) => {
    try {
      const result = await updatePurchasePlan(plandecompras?.id, formData);
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
                  defaultValue={
                    plandecompras.fecha
                      ? plandecompras.fecha.toISOString().substring(0, 10)
                      : ''
                  }
                />
              </div>

              {/* Campo Estado */}
              <div className="mb-4">
                <label htmlFor="estado" className="block text-sm font-medium">
                  Estado *
                </label>
                <select
                  id="estado"
                  name="estado"
                  required
                  className="input-app"
                  defaultValue={plandecompras.estado}
                >
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
                  defaultValue={plandecompras.dependenciaId.toString()}
                ></input>
              </div>

              {/* Campo Usuario */}
              <div className="mb-4">
                <label
                  htmlFor="usuarioId"
                  className="block text-sm font-medium"
                >
                  Usuario *
                </label>
                <input
                  id="usuarioId"
                  name="usuarioId"
                  required
                  className="input-app"
                  defaultValue={plandecompras.usuarioId.toString()}
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
                  defaultValue={plandecompras.cicloContratacionId?.toString()}
                ></input>
              </div>

              {/* Campo Valor Total */}
              <div className="mb-4">
                <label
                  htmlFor="valorTotal"
                  className="block text-sm font-medium"
                >
                  Valor Total (opcional)
                </label>
                <input
                  id="valorTotal"
                  name="valorTotal"
                  type="number"
                  step="0.01"
                  className="input-app"
                  defaultValue={plandecompras.valorTotal}
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
