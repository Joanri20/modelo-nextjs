'use server';

import { any, z } from 'zod';
import prisma from './db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { getPrismaErrorCodeDescription } from './error-prisma';

const CreateProductSchema = z.object({
  id: z.string(),
  descripcion: z.string(),
  rubroId: z.string(),
  valorVigente: z.coerce.number(),
  date: z.string(),
});

const CreateProductFormSchema = CreateProductSchema.omit({
  date: true,
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

export const createProduct = async (formData: FormData) => {
  let id, descripcion, rubroId, valorVigente;
  try {
    ({ id, descripcion, rubroId, valorVigente } = CreateProductFormSchema.parse(
      {
        id: formData.get('codigoid'),
        descripcion: formData.get('descripcion'),
        rubroId: formData.get('rubroId'),
        valorVigente: formData.get('valorVigente'),
      },
    ));

    //const [date] = new Date().toISOString().split('T');

    const newProduct = await prisma.producto.create({
      data: {
        id: id,
        descripcion: descripcion,
        rubroId: rubroId,
        valorVigente: valorVigente,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
};

export async function updateProduct(idi: string, formData: FormData) {
  try {
    const { id, descripcion, rubroId, valorVigente } =
      CreateProductFormSchema.parse({
        id: idi,
        descripcion: formData.get('descripcion'),
        rubroId: formData.get('rubroId'),
        valorVigente: formData.get('valorVigente'),
      });

    const newProduct = await prisma.producto.update({
      where: {
        id: id,
      },
      data: {
        descripcion: descripcion,
        rubroId: rubroId,
        valorVigente: valorVigente,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

const CreateRubroFormSchema = CreateProductSchema.omit({
  date: true,
  rubroId: true,
  valorVigente: true,
});

export async function deleteProduct(id: string) {
  try {
    await prisma.producto.delete({
      where: {
        id: id,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

export async function createRubro(formData: FormData) {
  let id, descripcion;
  try {
    ({ id, descripcion } = CreateRubroFormSchema.parse({
      id: formData.get('codigoid'),
      descripcion: formData.get('descripcion'),
    }));

    const date = new Date().toISOString().split('T')[0];

    const dataIngresada = { id, descripcion, date };

    const newProduct = await prisma.rubro.create({
      data: {
        id: id,
        descripcion: descripcion,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }
  revalidatePath('/dashboard/products/create');
  redirect('/dashboard/products/create');
}
