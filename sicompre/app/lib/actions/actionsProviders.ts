'use server';

import { z } from 'zod';
import prisma from '../db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getErrorMesssage } from './actionsCommon';

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
  id: bigint | undefined,
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

export async function deleteProvider(id: bigint | undefined) {
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

export async function fetchProveedorById(id: bigint | undefined) {
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
