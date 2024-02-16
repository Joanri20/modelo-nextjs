'use client';
import { toast } from 'react-hot-toast';
import { PencilIcon } from '@heroicons/react/24/outline';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Button } from '@ui/button';
import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import { createRubro } from '@lib/actions';
import MessageCreate from './toast-message';

export default function CreateRubroDialog() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        type="button"
        onClick={() => {
          setOpen(true);
        }}
      >
        Crear Rubro
      </Button>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>
          <h1 className="font-bold">Crear Nuevo Rubro</h1>
        </DialogTitle>
        <DialogContent>
          <CreateRubro setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface CreateRubroProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateRubro = ({ setOpen }: CreateRubroProps) => {
  const [error, setError] = useState('');

  return (
    <div>
      <form
        action={async (formData: FormData) => {
          const result = await createRubro(formData);
          const err = MessageCreate({ result });
          if (err) {
            setError(err);
          }
        }}
        className="flex flex-col items-center gap-3"
      >
        <div className="flex flex-col items-start">
          <label className="font-bold" htmlFor="codigoid">
            Código del Rubro *
          </label>
          <input
            type="number"
            id="codigo"
            name="codigoid"
            placeholder="Ingrese número código"
            className="rounded border-gray-300 p-2 outline-none focus:border-blue-500"
          />

          <label htmlFor="descripcion" className="mt-3 font-bold">
            Descripción del Rubro *
            <input
              type="text"
              id="descripcion"
              name="descripcion"
              placeholder="Ingrese descripción del Rubro"
              className="w-full rounded border-gray-300 p-2 font-normal outline-none focus:border-blue-500"
            />
          </label>
        </div>
        <Button type="submit" onClick={() => setError('')}>
          Crear rubro
        </Button>
      </form>
      {error && <p className="text-red-500">{error} </p>}
    </div>
  );
};
