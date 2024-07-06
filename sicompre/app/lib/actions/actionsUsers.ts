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

const CreateUserSchema = z.object({
  id: z.string(),
  primerNombre: z.string(),
  segundoNombre: z.string(),
  primerApellido: z.string(),
  segundoApellido: z.string(),
  tipoDocumento: z.string(),
  documento: z.string(),
  telefono: z.string(),
  celular: z.string(),
  email: z.string(),
  direccion: z.string(),
  estado: z.string(),
  tipo: z.string(),
});

const CreateUserFormSchema = CreateUserSchema.omit({
  id: true,
});

export async function fetchUserById(id: string | undefined) {
  let data = null;
  try {
    data = await prisma.usuario.findUnique({
      where: {
        id: id,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  return data as Usuario;
}

export async function updateUser(id: string, formData: FormData) {
  try {
    const {
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      tipoDocumento,
      documento,
      telefono,
      celular,
      email,
      direccion,
      estado,
      tipo,
    } = CreateUserFormSchema.parse({
      primerNombre: formData.get('primerNombre'),
      segundoNombre: formData.get('segundoNombre'),
      primerApellido: formData.get('primerApellido'),
      segundoApellido: formData.get('segundoApellido'),
      tipoDocumento: formData.get('tipoDocumento'),
      documento: formData.get('documento'),
      telefono: formData.get('telefono'),
      celular: formData.get('celular'),
      email: formData.get('email'),
      direccion: formData.get('direccion'),
      estado: formData.get('estado'),
      tipo: formData.get('tipo'),
    });

    // Convertir los valores de formData a enums
    const tipoDocumentoEnum = tipoDocumento as Enum_TipoDocumento;
    const estadoEnum = estado as Enum_EstadoGeneral;
    const tipoEnum = tipo as Enum_TipoUsuario;

    const newUser = await prisma.usuario.update({
      where: {
        id: id,
      },
      data: {
        primerNombre: primerNombre,
        segundoNombre: segundoNombre,
        primerApellido: primerApellido,
        segundoApellido: segundoApellido,
        tipoDocumento: tipoDocumentoEnum,
        documento: documento,
        telefono: telefono,
        celular: celular,
        email: email,
        direccion: direccion,
        estado: estadoEnum,
        tipo: tipoEnum,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
}

export async function deleteUser(id: string | undefined) {
  try {
    await prisma.usuario.delete({
      where: {
        id: id,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
}
