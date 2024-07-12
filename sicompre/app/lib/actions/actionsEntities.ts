'use server';

import { z } from 'zod';
import prisma from '../db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  Enum_GeneralStatus,
  Enum_DocumentType,
  Enum_UserType,
} from '@prisma/client';
import { getErrorMesssage } from './actionsCommon';

const CreateEntitySchema = z.object({
  id: z.string(),
  name: z.string(),
  taxId: z.string(),
  address: z.string(),
  phone: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  website: z.string(),
  email: z.string(),
  possessionResolution: z.string(),
  possessionDate: z.string(),
  status: z.enum(['Active', 'Disabled']),
  availableBalance: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

const CreateEntityFormSchema = CreateEntitySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const createEntity = async (formData: FormData) => {
  try {
    const {
      name,
      taxId,
      address,
      phone,
      city,
      state,
      country,
      website,
      email,
      possessionResolution,
      possessionDate,
      status,
      availableBalance,
    } = CreateEntityFormSchema.parse({
      name: formData.get('name'),
      taxId: formData.get('taxId'),
      address: formData.get('address'),
      phone: formData.get('phone'),
      city: formData.get('city'),
      state: formData.get('state'),
      country: formData.get('country'),
      website: formData.get('website'),
      email: formData.get('email'),
      possessionResolution: formData.get('possessionResolution'),
      possessionDate: formData.get('possessionDate'),
      status: formData.get('status'),
      availableBalance: formData.get('availableBalance'),
    });

    const availableBalanceNumber = parseFloat(availableBalance);

    //const [date] = new Date().toISOString().split('T');

    const newAsset = await prisma.entity.create({
      data: {
        name: name,
        taxId: taxId,
        address: address,
        phone: phone,
        city: city,
        state: state,
        country: country,
        website: website,
        email: email,
        possessionResolution: possessionResolution,
        possessionDate: possessionDate,
        status: status,
        availableBalance: availableBalanceNumber,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  revalidatePath('/dashboard/entities');
  redirect('/dashboard/entities');
};

export async function fetchEntityById(id: bigint | undefined) {
  let data = null;
  try {
    data = await prisma.entity.findUnique({
      where: {
        id: id,
      },
      include: {
        departments: true,
        hiringCycles: true,
        members: true,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  return data as unknown as Entity;
}

export async function updateEntity(id: bigint, formData: FormData) {
  try {
    const {
      name,
      taxId,
      address,
      phone,
      city,
      state,
      country,
      website,
      email,
      possessionResolution,
      possessionDate,
      status,
      availableBalance,
    } = CreateEntityFormSchema.parse({
      name: formData.get('name'),
      taxId: formData.get('taxId'),
      address: formData.get('address'),
      phone: formData.get('phone'),
      city: formData.get('city'),
      state: formData.get('state'),
      country: formData.get('country'),
      website: formData.get('website'),
      email: formData.get('email'),
      possessionResolution: formData.get('possessionResolution'),
      possessionDate: formData.get('possessionDate'),
      status: formData.get('status'),
      availableBalance: formData.get('availableBalance'),
    });

    const availableBalanceNumber = parseFloat(availableBalance);

    const newEntity = await prisma.entity.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        taxId: taxId,
        address: address,
        phone: phone,
        city: city,
        state: state,
        country: country,
        website: website,
        email: email,
        possessionResolution: possessionResolution,
        possessionDate: possessionDate,
        status: status,
        availableBalance: availableBalanceNumber,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  revalidatePath('/dashboard/entities');
  redirect('/dashboard/entities');
}

export async function deleteEntity(id: bigint | undefined) {
  try {
    await prisma.entity.delete({
      where: {
        id: id,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  revalidatePath('/dashboard/entities');
  redirect('/dashboard/entities');
}
