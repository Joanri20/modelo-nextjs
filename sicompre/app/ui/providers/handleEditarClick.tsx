// components/ServerTableProviders.tsx
'use server';
import { fetchProveedor, fetchProveedorById } from '@lib/data';
import { Proveedor } from '@lib/definitions';
import TableProvidersClient from './TableProvidersClient';

export default async function handleEditarClick({ id }: { id: string }) {
  console.log('Este es el ID');
  console.log(id);
  if (!id) return;
  const result = await fetchProveedorById(id);
  console.log('Este es el Resultado');
  console.log(result);

  return result;
}
