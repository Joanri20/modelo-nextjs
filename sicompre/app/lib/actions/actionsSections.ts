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

const CreateSectionSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  nit: z.string(),
  direccion: z.string(),
  telefono: z.string(),
  municipio: z.string(),
  departamento: z.string(),
  pais: z.string(),
  web: z.string(),
  email: z.string(),
  resolucionPosesion: z.string(),
  fechaPosesion: z.string(),
  estado: z.enum(['Activo', 'Deshabilitado']),
  saldoDisponible: z.string(),
  entidadId: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

const CreateSectionFormSchema = CreateSectionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export async function createSection(formData: FormData) {
  try {
    const {
      nombre,
      nit,
      direccion,
      telefono,
      municipio,
      departamento,
      pais,
      web,
      email,
      resolucionPosesion,
      fechaPosesion,
      estado,
      saldoDisponible,
      entidadId,
    } = CreateSectionFormSchema.parse({
      nombre: formData.get('nombre'),
      nit: formData.get('nit'),
      direccion: formData.get('direccion'),
      telefono: formData.get('telefono'),
      municipio: formData.get('municipio'),
      departamento: formData.get('departamento'),
      pais: formData.get('pais'),
      web: formData.get('web'),
      email: formData.get('email'),
      resolucionPosesion: formData.get('resolucionPosesion'),
      fechaPosesion: formData.get('fechaPosesion'),
      estado: formData.get('estado'),
      saldoDisponible: formData.get('saldoDisponible'),
      entidadId: formData.get('entidadId'),
    });

    const saldoDisponibleNumber = parseFloat(saldoDisponible);

    const newSection = await prisma.seccion.create({
      data: {
        nombre: nombre,
        nit: nit,
        direccion: direccion,
        telefono: telefono,
        municipio: municipio,
        departamento: departamento,
        pais: pais,
        web: web,
        email: email,
        resolucionPosesion: resolucionPosesion,
        fechaPosesion: fechaPosesion,
        estado: estado,
        saldoDisponible: saldoDisponibleNumber,
        entidadId: Number(entidadId),
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  revalidatePath('/dashboard/sections');
  redirect('/dashboard/sections');
}

export async function fetchSectionById(id: bigint | undefined) {
  let data = null;
  try {
    data = await prisma.seccion.findMany({
      where: {
        id: id,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  return data;
}

export async function updateSection(id: bigint, formData: FormData) {
  try {
    const {
      nombre,
      nit,
      direccion,
      telefono,
      municipio,
      departamento,
      pais,
      web,
      email,
      resolucionPosesion,
      fechaPosesion,
      estado,
      saldoDisponible,
      entidadId,
    } = CreateSectionFormSchema.parse({
      nombre: formData.get('nombre'),
      nit: formData.get('nit'),
      direccion: formData.get('direccion'),
      telefono: formData.get('telefono'),
      municipio: formData.get('municipio'),
      departamento: formData.get('departamento'),
      pais: formData.get('pais'),
      web: formData.get('web'),
      email: formData.get('email'),
      resolucionPosesion: formData.get('resolucionPosesion'),
      fechaPosesion: formData.get('fechaPosesion'),
      estado: formData.get('estado'),
      saldoDisponible: formData.get('saldoDisponible'),
      entidadId: formData.get('entidadId'),
    });

    const saldoDisponibleNumber = parseFloat(saldoDisponible);

    const newSection = await prisma.seccion.update({
      where: {
        id: id,
      },
      data: {
        nombre: nombre,
        nit: nit,
        direccion: direccion,
        telefono: telefono,
        municipio: municipio,
        departamento: departamento,
        pais: pais,
        web: web,
        email: email,
        resolucionPosesion: resolucionPosesion,
        fechaPosesion: fechaPosesion,
        estado: estado,
        saldoDisponible: saldoDisponibleNumber,
        entidadId: Number(entidadId),
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  revalidatePath('/dashboard/sections');
  redirect('/dashboard/sections');
}

export async function deleteSection(id: bigint | undefined) {
  try {
    await prisma.seccion.delete({
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
