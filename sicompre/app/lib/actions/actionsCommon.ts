'use server';

import { z } from 'zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { getPrismaErrorCodeDescription } from '../error-prisma';

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
