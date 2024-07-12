'use client';

import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import { MessageUpdate } from '@ui/common/toast-message';
import { convertEnumToArray } from '@lib/conversEnums';
import { Enum_GeneralStatus } from '@prisma/client';
import { updateDepartment } from '@lib/actions/actionsDepartments';

interface UpdateDepartmentsDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  department: Department;
}

export default function UpdateDepartmentDialog({
  open,
  setOpen,
  department,
}: UpdateDepartmentsDialogProps) {
  const [error, setError] = useState('');

  const handleSubmit = async (formData: FormData) => {
    try {
      const result = await updateDepartment(department.id, formData);
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
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium"
                >
                  Nombre dependencia/organización*
                </label>
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    required
                    placeholder="Ingrese el nombre"
                    className="input-app"
                    defaultValue={department.name}
                  />
                </div>
              </div>
              <div className="mb-2 w-full md:w-1/3">
                <label
                  htmlFor="taxId"
                  className="mb-2 block text-sm font-medium"
                >
                  NIT *
                </label>
                <div className="relative">
                  <input
                    id="taxId"
                    name="taxId"
                    required
                    placeholder="Ingrese el NIT"
                    className="input-app"
                    defaultValue={department.taxId}
                  />
                </div>
              </div>
              <div className="mb-2 w-full md:w-1/3">
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium"
                >
                  Teléfono *
                </label>
                <div className="relative">
                  <input
                    id="phone"
                    name="phone"
                    required
                    placeholder="Ingrese el teléfono"
                    className="input-app"
                    defaultValue={department.phone ?? ''}
                  />
                </div>
              </div>
            </div>
            <div className="mb-2 flex gap-3">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm font-medium"
                >
                  Dirección *
                </label>
                <div className="relative">
                  <input
                    id="address"
                    name="address"
                    required
                    placeholder="Ingrese la dirección"
                    className="input-app"
                    defaultValue={department.address ?? ''}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="city"
                  className="mb-2 block text-sm font-medium"
                >
                  Municipio *
                </label>
                <div className="relative">
                  <input
                    id="city"
                    name="city"
                    required
                    placeholder="Ingrese el municipio"
                    className="input-app"
                    defaultValue={department.city}
                  />
                </div>
              </div>
            </div>
            <div className="mb-2 flex gap-3">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="state"
                  className="mb-2 block text-sm font-medium"
                >
                  Departamento *
                </label>
                <div className="relative">
                  <input
                    id="state"
                    name="state"
                    required
                    placeholder="Ingrese el departamento"
                    className="input-app"
                    defaultValue={department.state}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="country"
                  className="mb-2 block text-sm font-medium"
                >
                  País *
                </label>
                <div className="relative">
                  <input
                    id="country"
                    name="country"
                    required
                    placeholder="Ingrese el país"
                    className="input-app"
                    defaultValue={department.country}
                  />
                </div>
              </div>
            </div>

            <div className="mb-2 flex gap-3">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="website"
                  className="mb-2 block text-sm font-medium"
                >
                  Web
                </label>
                <div className="relative">
                  <input
                    id="website"
                    name="website"
                    placeholder="Ingrese el sitio website"
                    className="input-app"
                    defaultValue={department.website ?? ''}
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
                    defaultValue={department.email ?? ''}
                  />
                </div>
              </div>
            </div>
            <div className="mb-2 flex w-full gap-3">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="possessionResolution"
                  className="mb-2 block text-sm font-medium"
                >
                  Resolución de Posesión
                </label>
                <div className="relative">
                  <input
                    id="possessionResolution"
                    name="possessionResolution"
                    placeholder="Ingrese la resolución de posesión"
                    className="input-app"
                    defaultValue={department.possessionResolution ?? ''}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="possessionDate"
                  className="mb-2 block text-sm font-medium"
                >
                  Fecha de Posesión
                </label>
                <div className="relative">
                  <input
                    id="possessionDate"
                    name="possessionDate"
                    placeholder="Ingrese la date de posesión"
                    className="input-app"
                    defaultValue={
                      department.possessionDate
                        ? department.possessionDate.toISOString()
                        : 'No disponible'
                    }
                  />
                </div>
              </div>
            </div>
            <div className="mb-2 flex gap-3">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="availableBalance"
                  className="mb-2 block text-sm font-medium"
                >
                  Saldo Disponible
                </label>
                <div className="relative">
                  <input
                    id="availableBalance"
                    name="availableBalance"
                    placeholder="Ingrese el saldo disponible"
                    className="input-app"
                    defaultValue={department.availableBalance}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="entityId"
                  className="mb-2 block text-sm font-medium"
                >
                  Entidad Padre
                </label>
                <div className="relative">
                  <input
                    id="entityId"
                    name="entityId"
                    placeholder="Ingrese el ID de la Entidad padre"
                    className="input-app"
                    defaultValue={department.entityId.toString()}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="status"
                  className="mb-2 block text-sm font-medium"
                >
                  Estado de la dependencia *
                </label>
                <div className="relative">
                  <select
                    id="status"
                    name="status"
                    required
                    className="input-app"
                    defaultValue={department.status}
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
