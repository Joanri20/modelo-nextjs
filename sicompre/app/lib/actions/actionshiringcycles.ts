'use server';

import { z } from 'zod';
import prisma from '../db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  Enum_EstadoGeneral,
  Enum_TipoDocumento,
  Enum_TipoUsuario,
} from '@prisma/client';
import { getErrorMesssage } from './actionsCommon';

const CreateHiringCycleSchema = z.object({
  id: z.string().optional(),
  fechaInicio: z.date(),
  fechaFinal: z.date(),
  usuarioId: z.string(),
  entidadId: z.bigint(),
  estado: z.enum(['Abierto', 'Cerrado', 'EnProceso']),
  cotizacionId: z.bigint().optional(),
});

const CreateHiringCycleFormSchema = CreateHiringCycleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const createHiringCycle = async (formData: FormData) => {
  try {
    const {
      fechaInicio,
      fechaFinal,
      usuarioId,
      entidadId,
      estado,
      cotizacionId,
    } = CreateHiringCycleFormSchema.parse({
      fechaInicio: new Date(formData.get('fechaInicio') as string),
      fechaFinal: new Date(formData.get('fechaFinal') as string),
      usuarioId: formData.get('usuarioId') as string,
      entidadId: BigInt(formData.get('entidadId') as string),
      estado: formData.get('estado') as Enum_EstadoProceso,
      cotizacionId: formData.get('cotizacionId')
        ? BigInt(formData.get('cotizacionId') as string)
        : undefined,
    });

    const newCicloContratacion = await prisma.cicloContratacion.create({
      data: {
        fechaInicio: fechaInicio,
        fechaFinal: fechaFinal,
        usuarioId: usuarioId,
        entidadId: entidadId,
        estado: estado,
        cotizacionId: cotizacionId,
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
    data = await prisma.cicloContratacion.findUnique({
      where: {
        id: id,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  return data as unknown as CicloContratacion;
}

export async function updateHiringCycle(id: bigint, formData: FormData) {
  try {
    const {
      fechaInicio,
      fechaFinal,
      usuarioId,
      entidadId,
      estado,
      cotizacionId,
    } = CreateHiringCycleFormSchema.parse({
      fechaInicio: new Date(formData.get('fechaInicio') as string),
      fechaFinal: new Date(formData.get('fechaFinal') as string),
      usuarioId: formData.get('usuarioId') as string,
      entidadId: BigInt(formData.get('entidadId') as string),
      estado: formData.get('estado') as Enum_EstadoProceso,
      cotizacionId: formData.get('cotizacionId')
        ? BigInt(formData.get('cotizacionId') as string)
        : undefined,
    });

    const updatedCicloContratacion = await prisma.cicloContratacion.update({
      where: {
        id: id,
      },
      data: {
        fechaInicio: fechaInicio,
        fechaFinal: fechaFinal,
        usuarioId: usuarioId,
        entidadId: entidadId,
        estado: estado,
        cotizacionId: cotizacionId,
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
    await prisma.cicloContratacion.delete({
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
