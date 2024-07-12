'use client';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import {
  deleteSupplier,
  fetchSupplierById,
} from '@lib/actions/actionsSuppliers';
import Link from 'next/link';
import { useState } from 'react';
import UpdateSupplierDialog from './update-form-dialog';
import { MessageDelete } from '@ui/common/toast-message';

export function CreateSupplier() {
  const [buttonText, setButtonText] = useState('Crear');
  return (
    <Link
      href="/dashboard/suppliers/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      onClick={() => setButtonText('Cargando...')}
    >
      <span className="hidden md:block">{buttonText}</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateSupplier({ id }: { id: string }) {
  return (
    <div></div>
    // <Link
    //   href={`/dashboard/suppliers/${id}/edit`}
    //   className="rounded-md border p-2 hover:bg-gray-100"
    // >
    //   <PencilIcon className="w-5" />
    // </Link>
  );
}

export function UpdateSupplierT({ id }: { id: bigint | undefined }) {
  const supplierWithId = fetchSupplierById.bind(null, id);
  const [supplierData, setSupplierData] = useState<Supplier | string | null>(
    null,
  );
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    if (id) {
      try {
        const result = await supplierWithId();
        if (result != null) {
          setSupplierData(result); // Set the first element (assuming single supplier)
        } else {
          // Handle the case where result is not an array or empty
          console.warn('Unexpected data format from supplierWithId()');
          setSupplierData(null); // Or set to a default value
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
        const result = await supplierWithId();
        if (result != null) {
          setSupplierData(result); // Set the first element (assuming single supplier)
        } else {
          console.warn('Unexpected data format from supplierWithId()');
          setSupplierData(null); // Or set to a default value
        }
      }}
    >
      {supplierData && open && (
        <UpdateSupplierDialog
          open={open}
          setOpen={setOpen}
          supplier={supplierData as Supplier}
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

export function DeleteSupplier({ id }: { id: bigint | undefined }) {
  const deleteSupplierWithId = deleteSupplier.bind(null, id);

  return (
    <form
      action={async (formData: FormData) => {
        const result = await deleteSupplierWithId();
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
