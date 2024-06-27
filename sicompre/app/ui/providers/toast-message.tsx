'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function MessageCreate({ result }: { result: string }) {
  if (result) {
    toast.error('¡Ha ocurrido un error!');
    return result;
  } else {
    toast.success('Se creo correctamente!');
  }
}

export function MessageDelete({ result }: { result: string }) {
  if (result) {
    toast.error('¡Ha ocurrido un error al eliminar!');
    return result;
  } else {
    toast.success('¡Se eliminó Correctamente!');
  }
}

export function MessageUpdate({ result }: { result: string }) {
  if (result) {
    toast.error('¡Ha ocurrido un error al actualizar!');
    return result;
  } else {
    toast.success('¡Se actualizó correctamente!');
  }
}
