'use client';

import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import { updateAsset } from '@lib/actions/actionsAssets';
import { UserCircleIcon } from '@heroicons/react/20/solid';
import { CurrencyDollarIcon, PencilIcon } from '@heroicons/react/24/outline';
import { MessageUpdate } from '@ui/common/toast-message';

interface UpdateAssetsDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  asset: Asset;
  groupAsset: AssetGroup[];
}

export default function UpdateAssetDialog({
  open,
  setOpen,
  asset,
  groupAsset,
}: UpdateAssetsDialogProps) {
  const [error, setError] = useState('');
  const {
    id,
    description: description,
    assetGroup: assetGroup,
    assetGroupId: assetGroupId,
    currentValue: currentValue,
    assetQuantities: assetQuantity,
  } = asset;

  const handleSubmit = async (formData: FormData) => {
    try {
      const result = await updateAsset(id!, formData);
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
            <div className="mb-4 flex gap-5">
              <div className="mb-4 w-5/12">
                <label
                  htmlFor="assetGroup"
                  className="mb-2 block text-sm font-medium"
                >
                  Selecciona el grupo del asset o servicio *
                </label>
                <div className="relative">
                  <select
                    id="assetGroup"
                    name="assetGroupId"
                    required
                    className="input-app"
                    defaultValue={Number(assetGroupId)}
                  >
                    <option value="" disabled>
                      Selecciona un grupo
                    </option>
                    {groupAsset.map((gruposAssets) => (
                      <option
                        key={Number(gruposAssets.id)}
                        value={Number(gruposAssets.id)}
                      >
                        {gruposAssets.description}
                      </option>
                    ))}
                  </select>
                  <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                </div>
              </div>
            </div>
            <div className="mb-4 flex gap-5">
              <div className="w-full">
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium"
                >
                  Indica una descripción del asset o servicio *
                </label>
                <div className="relative mt-2 rounded-md">
                  <div className="w-full">
                    <input
                      id="description"
                      name="description"
                      defaultValue={description}
                      placeholder="Ingrese name o descripción"
                      required
                      className="input-app"
                    />
                    <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
                </div>
              </div>
              <div className="w-3/6">
                <label
                  htmlFor="valorvigente"
                  className="mb-2 block text-sm font-medium"
                >
                  Valor Asset
                </label>
                <div className="relative mt-2 rounded-md">
                  <div className="w-full">
                    <input
                      id="currentValue"
                      name="currentValue"
                      defaultValue={currentValue ? currentValue : 0}
                      placeholder="Ingresa un valor sin signos"
                      required
                      className="input-app"
                    />
                    <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
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
