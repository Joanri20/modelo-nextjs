'use server';

import { any, z } from 'zod';
import prisma from '../db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { getPrismaErrorCodeDescription } from '../error-prisma';
import { signIn } from '../../../auth';
import { AuthError } from 'next-auth';
import { GrupoBien } from '@lib/definitions';

const CreateAssetSchema = z.object({
  id: z.string(),
  descripcion: z.string(),
  grupoBienId: z.coerce.number(),
  valorVigente: z.coerce.number(),
  date: z.string(),
});

const CreateAssetFormSchema = CreateAssetSchema.omit({
  id: true,
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

export const createAsset = async (formData: FormData) => {
  try {
    const { descripcion, grupoBienId, valorVigente } =
      CreateAssetFormSchema.parse({
        id: formData.get('codigoid'),
        descripcion: formData.get('descripcion'),
        grupoBienId: formData.get('grupoBienId'),
        valorVigente: formData.get('valorVigente'),
      });

    //const [date] = new Date().toISOString().split('T');

    const newAsset = await prisma.bien.create({
      data: {
        descripcion: descripcion,
        grupoBienId: grupoBienId,
        valorVigente: valorVigente,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  revalidatePath('/dashboard/assets');
  redirect('/dashboard/assets');
};

export async function updateAsset(id: string, formData: FormData) {
  try {
    const { descripcion, grupoBienId, valorVigente } =
      CreateAssetFormSchema.parse({
        descripcion: formData.get('descripcion'),
        grupoBienId: formData.get('grupoBienId'),
        valorVigente: formData.get('valorVigente'),
      });

    const newAsset = await prisma.bien.update({
      where: {
        id: id,
      },
      data: {
        descripcion: descripcion,
        grupoBienId: grupoBienId,
        valorVigente: valorVigente,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  revalidatePath('/dashboard/assets');
  redirect('/dashboard/assets');
}

const CreateGrupoBienFormSchema = CreateAssetSchema.omit({
  id: true,
  date: true,
  grupoBienId: true,
  valorVigente: true,
});

export async function deleteAsset(id: string) {
  try {
    await prisma.bien.delete({
      where: {
        id: id,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  revalidatePath('/dashboard/assets');
  redirect('/dashboard/assets');
}

export async function createGrupoBien(formData: FormData) {
  try {
    const { descripcion } = CreateGrupoBienFormSchema.parse({
      descripcion: formData.get('descripcion'),
    });

    const date = new Date().toISOString().split('T')[0];

    const newAsset = await prisma.grupoBien.create({
      data: {
        descripcion: descripcion,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }
  revalidatePath('/dashboard/assets/create');
  redirect('/dashboard/assets/create');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function fetchAssestById(id: string | undefined) {
  let data = null;
  try {
    data = await prisma.bien.findMany({
      where: {
        id: id,
      },
      include: {
        grupoBien: true,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  return data;
}

export async function fetchGrupoBien(): Promise<GrupoBien[]> {
  const data = await prisma.grupoBien.findMany({
    distinct: ['descripcion'],
  });
  return data; // Asegúrate de devolver los datos
}
