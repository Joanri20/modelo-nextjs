'use server';

import { z } from 'zod';
import prisma from '../db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  Enum_GeneralStatus,
  Enum_DocumentType,
  Enum_UserType,
} from '@prisma/client';
import { getErrorMesssage } from './actionsCommon';
import bcrypt from 'bcrypt';

const CreateUserSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  secondLastName: z.string(),
  documentType: z.string(),
  document: z.string(),
  phone: z.string(),
  mobile: z.string(),
  email: z.string(),
  address: z.string(),
  status: z.string(),
  type: z.string(),
  password: z.string(),
});

const CreateUserFormSchema = CreateUserSchema.omit({
  id: true,
});

export const createUser = async (formData: FormData) => {
  try {
    const {
      id,
      firstName,
      middleName,
      lastName,
      secondLastName,
      documentType,
      document,
      phone,
      mobile,
      email,
      address,
      status,
      type,
      password,
    } = CreateUserSchema.parse({
      id: formData.get('id'),
      firstName: formData.get('firstName'),
      middleName: formData.get('middleName'),
      lastName: formData.get('lastName'),
      secondLastName: formData.get('secondLastName'),
      documentType: formData.get('documentType'),
      document: formData.get('document'),
      phone: formData.get('phone'),
      mobile: formData.get('mobile'),
      email: formData.get('email'),
      address: formData.get('address'),
      status: formData.get('status'),
      type: formData.get('type'),
      password: formData.get('password'),
    });

    // Convertir los valores de formData a enums
    const documentTypeEnum = documentType as Enum_DocumentType;
    const statusEnum = status as Enum_GeneralStatus;
    const typeEnum = type as Enum_UserType;

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        id,
        firstName,
        middleName,
        lastName,
        secondLastName,
        documentType: documentTypeEnum,
        document,
        phone,
        mobile,
        email,
        address,
        status: statusEnum,
        type: typeEnum,
        password: hashedPassword,
      },
    });

    revalidatePath('/dashboard/users');
    redirect('/dashboard/users');
  } catch (e) {
    return getErrorMesssage(e);
  }
};

export async function fetchUserById(id: string | undefined) {
  let data = null;
  try {
    data = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  } catch (e) {
    return getErrorMesssage(e);
  }

  return data as User;
}

export async function updateUser(id: string, formData: FormData) {
  try {
    const {
      firstName,
      middleName,
      lastName,
      secondLastName,
      documentType,
      document,
      phone,
      mobile,
      email,
      address,
      status,
      type,
      password,
    } = CreateUserFormSchema.parse({
      firstName: formData.get('firstName'),
      middleName: formData.get('middleName'),
      lastName: formData.get('lastName'),
      secondLastName: formData.get('secondLastName'),
      documentType: formData.get('documentType'),
      document: formData.get('document'),
      phone: formData.get('phone'),
      mobile: formData.get('mobile'),
      email: formData.get('email'),
      address: formData.get('address'),
      status: formData.get('status'),
      type: formData.get('type'),
      password: formData.get('password'),
    });

    // Convertir los valores de formData a enums
    const documentTypeEnum = documentType as Enum_DocumentType;
    const statusEnum = status as Enum_GeneralStatus;
    const typeEnum = type as Enum_UserType;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        secondLastName: secondLastName,
        documentType: documentTypeEnum,
        document: document,
        phone: phone,
        mobile: mobile,
        email: email,
        address: address,
        status: statusEnum,
        type: typeEnum,
        password: hashedPassword,
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
    await prisma.user.delete({
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
