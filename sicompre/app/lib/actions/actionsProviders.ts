'use server';

import { any, z } from 'zod';
import prisma from '../db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { getPrismaErrorCodeDescription } from '../error-prisma';
import { signIn } from '../../../auth';
import { AuthError } from 'next-auth';

const RUTAS_VALIDAR = '/dashboard/providers';
const CreateProviderSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  nit: z.string(),
  direccion: z.string(),
  email: z.string(),
  telefono: z.string(),
});

const CreateAssetFormSchema = CreateProviderSchema.omit({
  id: true,
});

export const getErrorMesssage = (error: unknown): string => {
  let message: string;
  let campoError: string = 'Ocurrio un error con el campo: ';

  if (error instanceof PrismaClientKnownRequestError) {
    const errorPrisma = getPrismaErrorCodeDescription(error.code);
    message = errorPrisma;
  } else if (error instanceof z.ZodError) {
    campoError += error.errors[0].path[0] as string;
    message = campoError;
  } else if (error instanceof Error) {
    campoError += error.message;
    message = campoError;
  } else if (error && typeof error === 'object' && 'message' in error) {
    campoError += String(error.message);
    message = campoError;
  } else if (typeof error === 'string') {
    campoError += error;
    message = campoError;
  } else {
    message = 'Se obtuvo un error desconocido';
  }

  return message;
};

export const analizarSchema = (
  nombre: FormDataEntryValue | null,
  nit: FormDataEntryValue | null,
  direccion: FormDataEntryValue | null,
  email: FormDataEntryValue | null,
  telefono: FormDataEntryValue | null,
) => {
  const datos = CreateAssetFormSchema.parse({
    nombre: nombre,
    nit: nit,
    direccion: direccion,
    email: email,
    telefono: telefono,
  });
  return datos;
};

export const createProvider = async (formData: FormData) => {
  /*const { nombre, nit, direccion, email, telefono } = analizarSchema(
    formData.get('nombre'),
    formData.get('nit'),
    formData.get('direccion'), formData.get('email'), formData.get('telefono'));
  */
  try {
    const { nombre, nit, direccion, email, telefono } =
      CreateAssetFormSchema.parse({
        nombre: formData.get('nombre'),
        nit: formData.get('nit'),
        direccion: formData.get('direccion'),
        email: formData.get('email'),
        telefono: formData.get('telefono'),
      });

    //const [date] = new Date().toISOString().split('T');

    const newAsset = await prisma.proveedor.create({
      data: {
        nombre: nombre,
        nit: nit,
        direccion: direccion,
        email: email,
        telefono: telefono,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  revalidatePath(RUTAS_VALIDAR);
  redirect(RUTAS_VALIDAR);
};

export async function updateProvider(
  id: string | undefined,
  formData: FormData,
) {
  try {
    const { nombre, nit, direccion, email, telefono } =
      CreateAssetFormSchema.parse({
        nombre: formData.get('nombre'),
        nit: formData.get('nit'),
        direccion: formData.get('direccion'),
        email: formData.get('email'),
        telefono: formData.get('telefono'),
      });

    const newAsset = await prisma.proveedor.update({
      where: {
        id: id,
      },
      data: {
        nombre: nombre,
        nit: nit,
        direccion: direccion,
        email: email,
        telefono: telefono,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  revalidatePath(RUTAS_VALIDAR);
  redirect(RUTAS_VALIDAR);
}

export async function deleteProvider(id: string | undefined) {
  try {
    await prisma.proveedor.delete({
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

export async function fetchProveedorById(id: string | undefined) {
  let data = null;
  try {
    data = await prisma.proveedor.findMany({
      where: {
        id: id,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  return data;
}
