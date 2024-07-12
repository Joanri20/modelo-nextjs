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

const CreateDepartmentSchema = z.object({
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
  entityId: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

const CreateDepartmentFormSchema = CreateDepartmentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export async function createDepartment(formData: FormData) {
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
      entityId,
    } = CreateDepartmentFormSchema.parse({
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
      entityId: formData.get('entityId'),
    });

    const availableBalanceNumber = parseFloat(availableBalance);

    const newDepartment = await prisma.department.create({
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
        entityId: Number(entityId),
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  revalidatePath('/dashboard/sections');
  redirect('/dashboard/sections');
}

export async function fetchDepartmentById(id: bigint | undefined) {
  let data = null;
  try {
    data = await prisma.department.findUnique({
      where: {
        id: id,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  return data as Department;
}

export async function updateDepartment(id: bigint, formData: FormData) {
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
      entityId,
    } = CreateDepartmentFormSchema.parse({
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
      entityId: formData.get('entityId'),
    });

    const availableBalanceNumber = parseFloat(availableBalance);

    const newDepartment = await prisma.department.update({
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
        entityId: Number(entityId),
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  revalidatePath('/dashboard/sections');
  redirect('/dashboard/sections');
}

export async function deleteDepartment(id: bigint | undefined) {
  try {
    await prisma.department.delete({
      where: {
        id: id,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  revalidatePath('/dashboard/sections');
  redirect('/dashboard/sections');
}
