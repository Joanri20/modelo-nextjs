'use client';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import {
  deleteAsset,
  fetchAssestById,
  fetchAssetGroup,
} from '@lib/actions/actionsAssets';
import Link from 'next/link';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import UpdateAssetDialog from './update-form-dialog';
import { MessageDelete } from '@ui/common/toast-message';

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

export function UpdateAssetT({ id }: { id: bigint | undefined }) {
  const assestWithId = fetchAssestById.bind(null, id);
  const groupAsset = fetchAssetGroup;
  const [data, setData] = useState<string | Asset>();
  const [datagroup, setDataGroup] = useState<AssetGroup[] | null>(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    if (id) {
      try {
        const result = await assestWithId();
        const grupo = await groupAsset();
        if (result != null) {
          setData(result); // Set the first element (assuming single supplier)
        } else {
          // Handle the case where result is not an array or empty
          console.warn('Unexpected data format from supplierWithId()');
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
        if (result != null) {
          setData(result); // Set the first element (assuming single supplier)
        } else {
          // Handle the case where result is not an array or empty
          console.warn('Unexpected data format from supplierWithId()');
        }
      }}
    >
      {data && open && (
        <UpdateAssetDialog
          open={open}
          setOpen={setOpen}
          asset={data as Asset}
          groupAsset={datagroup ?? []}
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

export function DeleteAsset({ id }: { id: bigint }) {
  const deleteAssetWithId = deleteAsset.bind(null, id!);

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
