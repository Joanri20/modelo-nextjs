'use server';
import { z } from 'zod';
import prisma from '../db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Enum_EstadoProceso } from '@prisma/client';
import { getErrorMesssage } from './actionsCommon';

const CreatePurchasePlanSchema = z.object({
  id: z.string(),
  fecha: z.string(),
  estado: z.string(),
  dependenciaId: z.bigint(),
  usuarioId: z.string(),
  cicloContratacionId: z.bigint().optional(),
  valorTotal: z.number(),
});

const CreatePurchasePlanFormSchema = CreatePurchasePlanSchema.omit({
  id: true,
});

export async function createPurchasePlan(formData: FormData) {
  const dependenciaIdValue = formData.get('dependenciaId');
  const cicloContratacionIdValue = formData.get('cicloContratacionId');
  try {
    const {
      fecha,
      estado,
      dependenciaId,
      usuarioId,
      cicloContratacionId,
      valorTotal,
    } = CreatePurchasePlanFormSchema.parse({
      fecha: formData.get('fecha'),
      estado: formData.get('estado'),
      dependenciaId: dependenciaIdValue
        ? BigInt(dependenciaIdValue.toString())
        : null,
      usuarioId: formData.get('usuarioId'),
      cicloContratacionId: cicloContratacionIdValue
        ? BigInt(cicloContratacionIdValue.toString())
        : undefined,
      valorTotal: Number(formData.get('valorTotal')),
    });

    const estadoEnum = estado as Enum_EstadoProceso;

    const newPlanDeCompras = await prisma.planDeCompras.create({
      data: {
        fecha: new Date(fecha),
        estado: estadoEnum,
        dependenciaId: dependenciaId,
        usuarioId: usuarioId,
        cicloContratacionId: cicloContratacionId,
        valorTotal: valorTotal,
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
    data = await prisma.planDeCompras.findUnique({
      where: {
        id: id,
      },
      include: {
        dependencia: true,
        usuario: true,
        cicloContratacion: true,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }
  return data as unknown as PlanDeCompras;
}

export async function updatePurchasePlan(id: bigint, formData: FormData) {
  try {
    const dependenciaIdValue = formData.get('dependenciaId');
    const cicloContratacionIdValue = formData.get('cicloContratacionId');

    const {
      fecha,
      estado,
      dependenciaId,
      usuarioId,
      cicloContratacionId,
      valorTotal,
    } = CreatePurchasePlanFormSchema.parse({
      fecha: formData.get('fecha'),
      estado: formData.get('estado'),
      dependenciaId: dependenciaIdValue
        ? BigInt(dependenciaIdValue.toString())
        : null,
      usuarioId: formData.get('usuarioId'),
      cicloContratacionId: cicloContratacionIdValue
        ? BigInt(cicloContratacionIdValue.toString())
        : undefined,
      valorTotal: Number(formData.get('valorTotal')),
    });

    const estadoEnum = estado as Enum_EstadoProceso;

    const updatedPlanDeCompras = await prisma.planDeCompras.update({
      where: {
        id: BigInt(id),
      },
      data: {
        fecha: new Date(fecha),
        estado: estadoEnum,
        dependenciaId: dependenciaId!,
        usuarioId: usuarioId!,
        cicloContratacionId: cicloContratacionId,
        valorTotal: valorTotal,
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
    await prisma.planDeCompras.delete({
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
