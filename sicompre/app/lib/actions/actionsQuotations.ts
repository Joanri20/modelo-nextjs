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

const CreateQuotationSchema = z.object({
  id: z.bigint(),
  fechaInicio: z.string().transform((str) => new Date(str)),
  fechaFinal: z.string().transform((str) => new Date(str)),
  usuarioId: z.string(),
  entidadId: z.bigint(),
  estado: z.enum(['Abierto', 'Cerrado', 'Pendiente']),
});

const CreateQuotationFormSchema = CreateQuotationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const createQuotation = async (formData: FormData) => {
  try {
    const { fechaInicio, fechaFinal, usuarioId, entidadId, estado } =
      CreateQuotationFormSchema.parse({
        fechaInicio: formData.get('fechaInicio'),
        fechaFinal: formData.get('fechaFinal'),
        usuarioId: formData.get('usuarioId'),
        entidadId: BigInt(formData.get('entidadId') as string),
        estado: formData.get('estado'),
      });

    const newCotizacion = await prisma.cotizacion.create({
      data: {
        fechaInicio,
        fechaFinal,
        usuarioId,
        entidadId,
        estado: estado as Enum_EstadoCotizacion,
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
    data = await prisma.cotizacion.findUnique({
      where: {
        id: id,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  return data as Cotizacion;
}

export async function updateQuotation(id: bigint, formData: FormData) {
  try {
    const { fechaInicio, fechaFinal, usuarioId, entidadId, estado } =
      CreateQuotationFormSchema.parse({
        id: id,
        fechaInicio: formData.get('fechaInicio'),
        fechaFinal: formData.get('fechaFinal'),
        usuarioId: formData.get('usuarioId'),
        entidadId: BigInt(formData.get('entidadId') as string),
        estado: formData.get('estado'),
      });

    const updatedCotizacion = await prisma.cotizacion.update({
      where: {
        id: id,
      },
      data: {
        fechaInicio,
        fechaFinal,
        usuarioId,
        entidadId,
        estado: estado as Enum_EstadoCotizacion,
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
    await prisma.cotizacion.delete({
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
