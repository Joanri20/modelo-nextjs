'use client';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import {
  deleteProvider,
  fetchProveedorById,
} from '@lib/actions/actionsProviders';
import Link from 'next/link';
import { useState } from 'react';
import UpdateProveedorDialog from './update-form-dialog';
import { MessageDelete } from '@ui/common/toast-message';

export function CreateProvider() {
  const [buttonText, setButtonText] = useState('Crear Proveedor');
  return (
    <Link
      href="/dashboard/providers/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      onClick={() => setButtonText('Cargando...')}
    >
      <span className="hidden md:block">{buttonText}</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateProvider({ id }: { id: string }) {
  return (
    <div></div>
    // <Link
    //   href={`/dashboard/providers/${id}/edit`}
    //   className="rounded-md border p-2 hover:bg-gray-100"
    // >
    //   <PencilIcon className="w-5" />
    // </Link>
  );
}

export function UpdateProviderT({ id }: { id: bigint | undefined }) {
  const providerWithId = fetchProveedorById.bind(null, id);
  const [proveedorData, setProveedorData] = useState<Proveedor | string | null>(
    null,
  );
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    if (id) {
      try {
        const result = await providerWithId();
        if (result != null) {
          setProveedorData(result); // Set the first element (assuming single provider)
        } else {
          // Handle the case where result is not an array or empty
          console.warn('Unexpected data format from providerWithId()');
          setProveedorData(null); // Or set to a default value
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
        const result = await providerWithId();
        if (result != null) {
          setProveedorData(result); // Set the first element (assuming single provider)
        } else {
          console.warn('Unexpected data format from providerWithId()');
          setProveedorData(null); // Or set to a default value
        }
      }}
    >
      {proveedorData && open && (
        <UpdateProveedorDialog
          open={open}
          setOpen={setOpen}
          proveedor={proveedorData as Proveedor}
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

export function DeleteProvider({ id }: { id: bigint | undefined }) {
  const deleteProviderWithId = deleteProvider.bind(null, id);

  return (
    <form
      action={async (formData: FormData) => {
        const result = await deleteProviderWithId();
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
