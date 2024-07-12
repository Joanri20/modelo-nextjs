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
  description: z.string(),
  assetGroupId: z.coerce.number(),
  currentValue: z.coerce.number(),
  date: z.string(),
});

const CreateAssetFormSchema = CreateAssetSchema.omit({
  id: true,
  date: true,
});

export const createAsset = async (formData: FormData) => {
  try {
    const { description, assetGroupId, currentValue } =
      CreateAssetFormSchema.parse({
        id: formData.get('codigoid'),
        description: formData.get('description'),
        assetGroupId: formData.get('assetGroupId'),
        currentValue: formData.get('currentValue'),
      });

    //const [date] = new Date().toISOString().split('T');

    const newAsset = await prisma.asset.create({
      data: {
        description: description,
        assetGroupId: assetGroupId,
        currentValue: currentValue,
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
    const { description, assetGroupId, currentValue } =
      CreateAssetFormSchema.parse({
        description: formData.get('description'),
        assetGroupId: formData.get('assetGroupId'),
        currentValue: formData.get('currentValue'),
      });

    const newAsset = await prisma.asset.update({
      where: {
        id: id,
      },
      data: {
        description: description,
        assetGroupId: assetGroupId,
        currentValue: currentValue,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  revalidatePath('/dashboard/assets');
  redirect('/dashboard/assets');
}

const CreateAssetGroupFormSchema = CreateAssetSchema.omit({
  id: true,
  date: true,
  assetGroupId: true,
  currentValue: true,
});

export async function deleteAsset(id: bigint) {
  try {
    await prisma.asset.delete({
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

export async function createAssetGroup(formData: FormData) {
  try {
    const { description } = CreateAssetGroupFormSchema.parse({
      description: formData.get('description'),
    });

    const date = new Date().toISOString().split('T')[0];

    const newAsset = await prisma.assetGroup.create({
      data: {
        description: description,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }
  revalidatePath('/dashboard/assets/create');
  redirect('/dashboard/assets/create');
}

export async function fetchAssestById(id: bigint | undefined) {
  let data = null;
  try {
    data = await prisma.asset.findUnique({
      where: {
        id: id,
      },
      include: {
        assetGroup: true,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }
  console.log('cosulta: ', data);

  return data as Asset;
}

export async function fetchAssetGroup(): Promise<AssetGroup[]> {
  const data = await prisma.assetGroup.findMany({
    distinct: ['description'],
  });
  return data; // Asegúrate de devolver los datos
}
