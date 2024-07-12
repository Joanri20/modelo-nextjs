'use client';
import { toast } from 'react-hot-toast';
import { PencilIcon } from '@heroicons/react/24/outline';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Button } from '@ui/button';
import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import { createAssetGroup } from '@lib/actions/actionsAssets';
import MessageCreate from '@ui/common/toast-message';

export default function CreateAssetGroupDialog() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        type="button"
        onClick={() => {
          setOpen(true);
        }}
      >
        Crear un Grupo
      </Button>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>
          <h1 className="font-bold">Crear Nuevo Grupo de Assets y Servicios</h1>
        </DialogTitle>
        <DialogContent>
          <CreateAssetGroup setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface CreateAssetGroupProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateAssetGroup = ({ setOpen }: CreateAssetGroupProps) => {
  const [error, setError] = useState('');

  return (
    <div>
      <form
        action={async (formData: FormData) => {
          const result = await createAssetGroup(formData);
          const err = MessageCreate({ result });
          if (err) {
            setError(err);
          } else {
            setOpen(false);
          }
        }}
        className="flex flex-col items-center gap-3"
      >
        <div className="flex flex-col items-start">
          <label htmlFor="description" className="mt-3 font-bold">
            Descripción del Grupo *
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Ingrese descripción del Grupo"
              className="w-full rounded border-gray-300 p-2 font-normal outline-none focus:border-blue-500"
            />
          </label>
        </div>
        <Button type="submit" onClick={() => setError('')}>
          Crear Grupo
        </Button>
      </form>
      {error && <p className="text-red-500">{error} </p>}
    </div>
  );
};
