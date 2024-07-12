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

const CreateQuotationSchema = z.object({
  id: z.bigint(),
  startDate: z.string().transform((str) => new Date(str)),
  endDate: z.string().transform((str) => new Date(str)),
  userId: z.string(),
  entityId: z.bigint(),
  status: z.enum(['Abierto', 'Cerrado', 'Pendiente']),
});

const CreateQuotationFormSchema = CreateQuotationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const createQuotation = async (formData: FormData) => {
  try {
    const { startDate, endDate, userId, entityId, status } =
      CreateQuotationFormSchema.parse({
        startDate: formData.get('startDate'),
        endDate: formData.get('endDate'),
        userId: formData.get('userId'),
        entityId: BigInt(formData.get('entityId') as string),
        status: formData.get('status'),
      });

    const newQuotation = await prisma.quotation.create({
      data: {
        startDate,
        endDate,
        userId,
        entityId,
        status: status as Enum_QuotationStatus,
      },
    });

    revalidatePath('/dashboard/quotations');
    redirect('/dashboard/quotations');
  } catch (e) {
    return getErrorMesssage(e);
  }
};

export async function fetchQuotationById(id: bigint | undefined) {
  let data = null;
  try {
    data = await prisma.quotation.findUnique({
      where: {
        id: id,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  return data as Quotation;
}

export async function updateQuotation(id: bigint, formData: FormData) {
  try {
    const { startDate, endDate, userId, entityId, status } =
      CreateQuotationFormSchema.parse({
        id: id,
        startDate: formData.get('startDate'),
        endDate: formData.get('endDate'),
        userId: formData.get('userId'),
        entityId: BigInt(formData.get('entityId') as string),
        status: formData.get('status'),
      });

    const updatedQuotation = await prisma.quotation.update({
      where: {
        id: id,
      },
      data: {
        startDate,
        endDate,
        userId,
        entityId,
        status: status as Enum_QuotationStatus,
      },
    });

    revalidatePath('/dashboard/quotations');
    redirect('/dashboard/quotations');
  } catch (e) {
    return getErrorMesssage(e);
  }
}

export async function deleteQuotation(id: bigint | undefined) {
  try {
    await prisma.quotation.delete({
      where: {
        id: id,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  revalidatePath('/dashboard/quotations');
  redirect('/dashboard/quotations');
}
