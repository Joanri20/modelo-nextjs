'use client';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import {
  deleteAsset,
  fetchAssestById,
  fetchGrupoBien,
} from '@lib/actions/actionsAssets';
import Link from 'next/link';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { MessageDelete } from './toast-message';
import { Bien, GrupoBien } from '@lib/definitions';
import UpdateAssetDialog from './update-form-dialog';

export function CreateAsset() {
  const [buttonText, setButtonText] = useState('Crear');
  return (
    <Link
      href="/dashboard/assets/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      onClick={() => setButtonText('Cargando...')}
    >
      <span className="hidden md:block">{buttonText}</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateAsset({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/assets/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function UpdateAssetT({ id }: { id: string | undefined }) {
  const assestWithId = fetchAssestById.bind(null, id);
  const groupBien = fetchGrupoBien;
  const [data, setData] = useState<Bien | null>(null);
  const [datagroup, setDataGroup] = useState<GrupoBien[] | null>(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    if (id) {
      try {
        const result = await assestWithId();
        const grupo = await groupBien();
        if (Array.isArray(result) && result.length > 0) {
          setData(result[0]); // Set the first element (assuming single provider)
        } else {
          // Handle the case where result is not an array or empty
          console.warn('Unexpected data format from providerWithId()');
          setData(null); // Or set to a default value
        }
        setDataGroup(grupo);
        setOpen(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  return (
    <form
      action={async (formData: FormData) => {
        const result = await assestWithId();
        if (Array.isArray(result) && result.length > 0) {
          setData(result[0]); // Set the first element (assuming single provider)
        } else {
          // Handle the case where result is not an array or empty
          console.warn('Unexpected data format from providerWithId()');
          setData(null); // Or set to a default value
        }
      }}
    >
      {data && open && (
        <UpdateAssetDialog
          open={open}
          setOpen={setOpen}
          bien={data}
          groupBien={datagroup ?? []}
        />
      )}
      <button
        onClick={handleSubmit}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <span className="sr-only">Update</span>
        <PencilIcon className="w-5" />
      </button>
    </form>
  );
}

export function DeleteAsset({ id }: { id: string }) {
  const deleteAssetWithId = deleteAsset.bind(null, id);

  return (
    <form
      action={async (formData: FormData) => {
        const result = await deleteAssetWithId();
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
