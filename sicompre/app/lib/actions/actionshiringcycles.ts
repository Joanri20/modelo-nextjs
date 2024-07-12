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

const CreateHiringCycleSchema = z.object({
  id: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
  userId: z.string(),
  entityId: z.bigint(),
  status: z.enum(['Open', 'Closed', 'InProcess']),
  quotationId: z.bigint().optional(),
});

const CreateHiringCycleFormSchema = CreateHiringCycleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const createHiringCycle = async (formData: FormData) => {
  try {
    const { startDate, endDate, userId, entityId, status, quotationId } =
      CreateHiringCycleFormSchema.parse({
        startDate: new Date(formData.get('startDate') as string),
        endDate: new Date(formData.get('endDate') as string),
        userId: formData.get('userId') as string,
        entityId: BigInt(formData.get('entityId') as string),
        status: formData.get('status') as Enum_ProcessStatus,
        quotationId: formData.get('quotationId')
          ? BigInt(formData.get('quotationId') as string)
          : undefined,
      });

    const newHiringCycle = await prisma.hiringCycle.create({
      data: {
        startDate: startDate,
        endDate: endDate,
        userId: userId,
        entityId: entityId,
        status: status,
        quotationId: quotationId,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  revalidatePath('/dashboard/hiringcycles');
  redirect('/dashboard/hiringcycles');
};

export async function fetchHiringCycleById(id: bigint | undefined) {
  let data = null;
  try {
    data = await prisma.hiringCycle.findUnique({
      where: {
        id: id,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  return data as unknown as HiringCycle;
}

export async function updateHiringCycle(id: bigint, formData: FormData) {
  try {
    const { startDate, endDate, userId, entityId, status, quotationId } =
      CreateHiringCycleFormSchema.parse({
        startDate: new Date(formData.get('startDate') as string),
        endDate: new Date(formData.get('endDate') as string),
        userId: formData.get('userId') as string,
        entityId: BigInt(formData.get('entityId') as string),
        status: formData.get('status') as Enum_ProcessStatus,
        quotationId: formData.get('quotationId')
          ? BigInt(formData.get('quotationId') as string)
          : undefined,
      });

    const updatedHiringCycle = await prisma.hiringCycle.update({
      where: {
        id: id,
      },
      data: {
        startDate: startDate,
        endDate: endDate,
        userId: userId,
        entityId: entityId,
        status: status,
        quotationId: quotationId,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  revalidatePath('/dashboard/hiringcycles');
  redirect('/dashboard/hiringcycles');
}

export async function deleteHiringCycle(id: bigint | undefined) {
  try {
    await prisma.hiringCycle.delete({
      where: {
        id: id,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  revalidatePath('/dashboard/hiringcycles');
  redirect('/dashboard/hiringcycles');
}
