'use server';
import { z } from 'zod';
import prisma from '../db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Enum_ProcessStatus } from '@prisma/client';
import { getErrorMesssage } from './actionsCommon';

const CreatePurchasePlanSchema = z.object({
  id: z.string(),
  date: z.string(),
  status: z.string(),
  departmentId: z.bigint(),
  userId: z.string(),
  hiringCycleId: z.bigint().optional(),
  totalValue: z.number(),
});

const CreatePurchasePlanFormSchema = CreatePurchasePlanSchema.omit({
  id: true,
});

export async function createPurchasePlan(formData: FormData) {
  const departmentIdValue = formData.get('departmentId');
  const hiringCycleIdValue = formData.get('hiringCycleId');
  try {
    const { date, status, departmentId, userId, hiringCycleId, totalValue } =
      CreatePurchasePlanFormSchema.parse({
        date: formData.get('date'),
        status: formData.get('status'),
        departmentId: departmentIdValue
          ? BigInt(departmentIdValue.toString())
          : null,
        userId: formData.get('userId'),
        hiringCycleId: hiringCycleIdValue
          ? BigInt(hiringCycleIdValue.toString())
          : undefined,
        totalValue: Number(formData.get('totalValue')),
      });

    const statusEnum = status as Enum_ProcessStatus;

    const newPurchasePlan = await prisma.purchasePlan.create({
      data: {
        date: new Date(date),
        status: statusEnum,
        departmentId: departmentId,
        userId: userId,
        hiringCycleId: hiringCycleId,
        totalValue: totalValue,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  revalidatePath('/dashboard/purchaseplans');
  redirect('/dashboard/purchaseplans');
}

export async function fetchPurchasePlanById(id: bigint | undefined) {
  let data = null;
  try {
    data = await prisma.purchasePlan.findUnique({
      where: {
        id: id,
      },
      include: {
        department: true,
        user: true,
        hiringCycle: true,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }
  return data as unknown as PurchasePlan;
}

export async function updatePurchasePlan(id: bigint, formData: FormData) {
  try {
    const departmentIdValue = formData.get('departmentId');
    const hiringCycleIdValue = formData.get('hiringCycleId');

    const { date, status, departmentId, userId, hiringCycleId, totalValue } =
      CreatePurchasePlanFormSchema.parse({
        date: formData.get('date'),
        status: formData.get('status'),
        departmentId: departmentIdValue
          ? BigInt(departmentIdValue.toString())
          : null,
        userId: formData.get('userId'),
        hiringCycleId: hiringCycleIdValue
          ? BigInt(hiringCycleIdValue.toString())
          : undefined,
        totalValue: Number(formData.get('totalValue')),
      });

    const statusEnum = status as Enum_ProcessStatus;

    const updatedPurchasePlan = await prisma.purchasePlan.update({
      where: {
        id: BigInt(id),
      },
      data: {
        date: new Date(date),
        status: statusEnum,
        departmentId: departmentId!,
        userId: userId!,
        hiringCycleId: hiringCycleId,
        totalValue: totalValue,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  revalidatePath('/dashboard/purchaseplans');
  redirect('/dashboard/purchaseplans');
}

export async function deletePurchasePlan(id: bigint | undefined) {
  try {
    await prisma.purchasePlan.delete({
      where: {
        id: id,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  revalidatePath('/dashboard/purchaseplans');
  redirect('/dashboard/purchaseplans');
}
