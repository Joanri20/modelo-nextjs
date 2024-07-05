'use client';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';
import { Seccion, Usuario } from '@lib/definitions';
import { deleteUser, fetchUserById } from '@lib/actions/actionsUsers';
import { MessageDelete } from '@ui/common/toast-message';
import { deleteSection, fetchSectionById } from '@lib/actions/actionsSections';
import UpdateSectionDialog from './update-form-dialog';

export function CreateSections() {
  const [buttonText, setButtonText] = useState('Crear');
  return (
    <Link
      href="/dashboard/sections/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      onClick={() => setButtonText('Cargando...')}
    >
      <span className="hidden md:block">{buttonText}</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateSection({ id }: { id: bigint | undefined }) {
  const entityWithId = fetchSectionById.bind(null, id);
  const [data, setData] = useState<Seccion | null>(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    if (id) {
      try {
        const result = await entityWithId();
        if (Array.isArray(result) && result.length > 0) {
          setData(result[0]);
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
        const result = await entityWithId();
        if (Array.isArray(result) && result.length > 0) {
          setData(result[0]);
        } else {
          console.warn('Unexpected data format');
          setData(null);
        }
      }}
    >
      {data && open && (
        <UpdateSectionDialog open={open} setOpen={setOpen} seccion={data} />
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

export function DeleteSection({ id }: { id: bigint }) {
  const deleteSectionWithId = deleteSection.bind(null, id);

  return (
    <form
      action={async (formData: FormData) => {
        const result = await deleteSectionWithId();
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
