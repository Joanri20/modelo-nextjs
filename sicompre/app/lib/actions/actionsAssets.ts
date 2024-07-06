'use server';

import { z } from 'zod';
import prisma from '../db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '../../../auth';
import { AuthError } from 'next-auth';
import { getErrorMesssage } from './actionsCommon';

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

export async function updateAsset(id: bigint, formData: FormData) {
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

export async function deleteAsset(id: bigint) {
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

export async function fetchAssestById(id: bigint | undefined) {
  let data = null;
  try {
    data = await prisma.bien.findUnique({
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
  console.log('cosulta: ', data);

  return data as Bien;
}

export async function fetchGrupoBien(): Promise<GrupoBien[]> {
  const data = await prisma.grupoBien.findMany({
    distinct: ['descripcion'],
  });
  return data; // Asegúrate de devolver los datos
}
