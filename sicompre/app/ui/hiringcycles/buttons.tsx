'use client';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';
import { MessageDelete } from '@ui/common/toast-message';
import {
  deleteHiringCycle,
  fetchHiringCycleById,
} from '@lib/actions/actionshiringcycles';
import UpdateHiringCycleDialog from './update-form-dialog';

export function CreateHiringCycles() {
  const [buttonText, setButtonText] = useState('Crear');
  return (
    <Link
      href="/dashboard/hiringcycles/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      onClick={() => setButtonText('Cargando...')}
    >
      <span className="hidden md:block">{buttonText}</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateHiringCycle({ id }: { id: bigint | undefined }) {
  const hiringcycleWithId = fetchHiringCycleById.bind(null, id);
  const [data, setData] = useState<CicloContratacion | string | null>(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    if (id) {
      try {
        const result = await hiringcycleWithId();
        if (result != null) {
          setData(result);
        } else {
          console.warn('Unexpected data format from providerWithId()');
          setData(null); // Or set to a default value
        }
        setOpen(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  return (
    <form
      action={async (formData: FormData) => {
        const result = await hiringcycleWithId();
        if (result != null) {
          setData(result);
        } else {
          console.warn('Unexpected data format');
          setData(null);
        }
      }}
    >
      {data && open && (
        <UpdateHiringCycleDialog
          open={open}
          setOpen={setOpen}
          cicloContratacion={data as CicloContratacion}
        />
      )}
      <button
        onClick={handleSubmit}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <span className="sr-only">Update</span>
        <PencilIcon className="border-blank w-5" />
      </button>
    </form>
  );
}

export function DeleteHiringCycle({ id }: { id: bigint }) {
  const deleteHiringCycleWithId = deleteHiringCycle.bind(null, id);

  return (
    <form
      action={async (formData: FormData) => {
        const result = await deleteHiringCycleWithId();
        MessageDelete({ result });
      }}
    >
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
