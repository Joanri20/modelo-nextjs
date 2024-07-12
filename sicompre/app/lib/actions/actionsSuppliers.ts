'use server';

import { z } from 'zod';
import prisma from '../db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getErrorMesssage } from './actionsCommon';

const RUTAS_VALIDAR = '/dashboard/suppliers';
const CreateSupplierSchema = z.object({
  id: z.string(),
  name: z.string(),
  taxId: z.string(),
  address: z.string(),
  email: z.string(),
  phone: z.string(),
});

const CreateAssetFormSchema = CreateSupplierSchema.omit({
  id: true,
});

export const analizarSchema = (
  name: FormDataEntryValue | null,
  taxId: FormDataEntryValue | null,
  address: FormDataEntryValue | null,
  email: FormDataEntryValue | null,
  phone: FormDataEntryValue | null,
) => {
  const datos = CreateAssetFormSchema.parse({
    name: name,
    taxId: taxId,
    address: address,
    email: email,
    phone: phone,
  });
  return datos;
};

export const createSupplier = async (formData: FormData) => {
  try {
    const { name, taxId, address, email, phone } = CreateAssetFormSchema.parse({
      name: formData.get('name'),
      taxId: formData.get('taxId'),
      address: formData.get('address'),
      email: formData.get('email'),
      phone: formData.get('phone'),
    });

    //const [date] = new Date().toISOString().split('T');

    const newAsset = await prisma.supplier.create({
      data: {
        name: name,
        taxId: taxId,
        address: address,
        email: email,
        phone: phone,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  revalidatePath(RUTAS_VALIDAR);
  redirect(RUTAS_VALIDAR);
};

export async function updateSupplier(
  id: bigint | undefined,
  formData: FormData,
) {
  try {
    const { name, taxId, address, email, phone } = CreateAssetFormSchema.parse({
      name: formData.get('name'),
      taxId: formData.get('taxId'),
      address: formData.get('address'),
      email: formData.get('email'),
      phone: formData.get('phone'),
    });

    const newAsset = await prisma.supplier.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        taxId: taxId,
        address: address,
        email: email,
        phone: phone,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  revalidatePath(RUTAS_VALIDAR);
  redirect(RUTAS_VALIDAR);
}

export async function deleteSupplier(id: bigint | undefined) {
  try {
    await prisma.supplier.delete({
      where: {
        id: id,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  revalidatePath(RUTAS_VALIDAR);
  redirect(RUTAS_VALIDAR);
}

export async function fetchSupplierById(id: bigint | undefined) {
  let data = null;
  try {
    data = await prisma.supplier.findFirst({
      where: {
        id: id,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  return data as Supplier;
}
