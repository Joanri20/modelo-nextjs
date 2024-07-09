'use server';

import { z } from 'zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { getPrismaErrorCodeDescription } from '../error-prisma';
import { signIn } from '../../../auth';
import { AuthError } from 'next-auth';

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
