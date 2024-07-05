'use client';

import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import { Bien, Seccion, GrupoBien } from '@lib/definitions';
import { updateAsset } from '@lib/actions/actionsAssets';
import { UserCircleIcon } from '@heroicons/react/20/solid';
import { CurrencyDollarIcon, PencilIcon } from '@heroicons/react/24/outline';
import { MessageUpdate } from '@ui/common/toast-message';
import { convertEnumToArray } from '@lib/conversEnums';
import { Enum_EstadoGeneral } from '@prisma/client';
import { updateSection } from '@lib/actions/actionsSections';

interface UpdateSectionsDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  seccion: Seccion;
}

export default function UpdateSectionDialog({
  open,
  setOpen,
  seccion,
}: UpdateSectionsDialogProps) {
  const [error, setError] = useState('');

  const handleSubmit = async (formData: FormData) => {
    try {
      const result = await updateSection(seccion.id, formData);
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
              <div className="mb-2 w-full md:w-1/2">
                <label
                  htmlFor="nombre"
                  className="mb-2 block text-sm font-medium"
                >
                  Nombre seccion/organización*
                </label>
                <div className="relative">
                  <input
                    id="nombre"
                    name="nombre"
                    required
                    placeholder="Ingrese el nombre"
                    className="input-app"
                    defaultValue={seccion.nombre}
                  />
                </div>
              </div>
              <div className="mb-2 w-full md:w-1/3">
                <label htmlFor="nit" className="mb-2 block text-sm font-medium">
                  NIT *
                </label>
                <div className="relative">
                  <input
                    id="nit"
                    name="nit"
                    required
                    placeholder="Ingrese el NIT"
                    className="input-app"
                    defaultValue={seccion.nit}
                  />
                </div>
              </div>
              <div className="mb-2 w-full md:w-1/3">
                <label
                  htmlFor="telefono"
                  className="mb-2 block text-sm font-medium"
                >
                  Teléfono *
                </label>
                <div className="relative">
                  <input
                    id="telefono"
                    name="telefono"
                    required
                    placeholder="Ingrese el teléfono"
                    className="input-app"
                    defaultValue={seccion.telefono ?? ''}
                  />
                </div>
              </div>
            </div>
            <div className="mb-2 flex gap-3">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="direccion"
                  className="mb-2 block text-sm font-medium"
                >
                  Dirección *
                </label>
                <div className="relative">
                  <input
                    id="direccion"
                    name="direccion"
                    required
                    placeholder="Ingrese la dirección"
                    className="input-app"
                    defaultValue={seccion.direccion ?? ''}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="municipio"
                  className="mb-2 block text-sm font-medium"
                >
                  Municipio *
                </label>
                <div className="relative">
                  <input
                    id="municipio"
                    name="municipio"
                    required
                    placeholder="Ingrese el municipio"
                    className="input-app"
                    defaultValue={seccion.municipio}
                  />
                </div>
              </div>
            </div>
            <div className="mb-2 flex gap-3">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="departamento"
                  className="mb-2 block text-sm font-medium"
                >
                  Departamento *
                </label>
                <div className="relative">
                  <input
                    id="departamento"
                    name="departamento"
                    required
                    placeholder="Ingrese el departamento"
                    className="input-app"
                    defaultValue={seccion.departamento}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="pais"
                  className="mb-2 block text-sm font-medium"
                >
                  País *
                </label>
                <div className="relative">
                  <input
                    id="pais"
                    name="pais"
                    required
                    placeholder="Ingrese el país"
                    className="input-app"
                    defaultValue={seccion.pais}
                  />
                </div>
              </div>
            </div>

            <div className="mb-2 flex gap-3">
              <div className="w-full md:w-1/2">
                <label htmlFor="web" className="mb-2 block text-sm font-medium">
                  Web
                </label>
                <div className="relative">
                  <input
                    id="web"
                    name="web"
                    placeholder="Ingrese el sitio web"
                    className="input-app"
                    defaultValue={seccion.web ?? ''}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
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
                    required
                    placeholder="Ingrese el email"
                    className="input-app"
                    defaultValue={seccion.email ?? ''}
                  />
                </div>
              </div>
            </div>
            <div className="mb-2 flex w-full gap-3">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="resolucionPosesion"
                  className="mb-2 block text-sm font-medium"
                >
                  Resolución de Posesión
                </label>
                <div className="relative">
                  <input
                    id="resolucionPosesion"
                    name="resolucionPosesion"
                    placeholder="Ingrese la resolución de posesión"
                    className="input-app"
                    defaultValue={seccion.resolucionPosesion ?? ''}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="fechaPosesion"
                  className="mb-2 block text-sm font-medium"
                >
                  Fecha de Posesión
                </label>
                <div className="relative">
                  <input
                    id="fechaPosesion"
                    name="fechaPosesion"
                    placeholder="Ingrese la fecha de posesión"
                    className="input-app"
                    defaultValue={
                      seccion.fechaPosesion
                        ? seccion.fechaPosesion.toISOString()
                        : 'No disponible'
                    }
                  />
                </div>
              </div>
            </div>
            <div className="mb-2 flex gap-3">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="saldoDisponible"
                  className="mb-2 block text-sm font-medium"
                >
                  Saldo Disponible
                </label>
                <div className="relative">
                  <input
                    id="saldoDisponible"
                    name="saldoDisponible"
                    placeholder="Ingrese el saldo disponible"
                    className="input-app"
                    defaultValue={seccion.saldoDisponible}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="entidadId"
                  className="mb-2 block text-sm font-medium"
                >
                  Entidad Padre
                </label>
                <div className="relative">
                  <input
                    id="entidadId"
                    name="entidadId"
                    placeholder="Ingrese el ID de la entidad padre"
                    className="input-app"
                    defaultValue={seccion.entidadId.toString()}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="estado"
                  className="mb-2 block text-sm font-medium"
                >
                  Estado de Seccion *
                </label>
                <div className="relative">
                  <select
                    id="estado"
                    name="estado"
                    required
                    className="input-app"
                    defaultValue={seccion.estado}
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
