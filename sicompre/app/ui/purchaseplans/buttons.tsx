'use client';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';
import {
  deletePurchasePlan,
  fetchPurchasePlanById,
} from '@lib/actions/actionsPurchasePlans';
import UpdatePurchasePlanDialog from './update-form-dialog';
import { MessageDelete } from '@ui/common/toast-message';

export function CreatePurchasePlans() {
  const [buttonText, setButtonText] = useState('Crear');
  return (
    <Link
      href="/dashboard/purchaseplans/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      onClick={() => setButtonText('Cargando...')}
    >
      <span className="hidden md:block">{buttonText}</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdatePurchasePlan({ id }: { id: bigint }) {
  const purchaseplanWithId = fetchPurchasePlanById.bind(null, id);
  const [data, setData] = useState<PurchasePlan | string | null>(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    if (id) {
      try {
        const result = await purchaseplanWithId();
        if (result != null) {
          setData(result);
        } else {
          console.warn('Unexpected data format from supplierWithId()');
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
        const result = await purchaseplanWithId();
        if (result != null) {
          setData(result);
        } else {
          console.warn('Unexpected data format');
          setData(null);
        }
      }}
    >
      {data && open && (
        <UpdatePurchasePlanDialog
          open={open}
          setOpen={setOpen}
          purchaseplan={data as PurchasePlan}
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

export function DeletePurchasePlan({ id }: { id: bigint }) {
  const deletePurchasePlanWithId = deletePurchasePlan.bind(null, id);

  return (
    <form
      action={async (formData: FormData) => {
        const result = await deletePurchasePlanWithId();
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
