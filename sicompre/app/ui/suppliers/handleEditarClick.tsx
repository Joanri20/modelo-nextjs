// components/ServerTableSuppliers.tsx
'use server';
import { fetchSupplier, fetchSupplierById } from '@lib/data';
import { Supplier } from '@lib/defitaxIdions';
import TableSuppliersClient from './TableSuppliersClient';

export default async function handleEditarClick({ id }: { id: string }) {
  console.log('Este es el ID');
  console.log(id);
  if (!id) return;
  const result = await fetchSupplierById(id);
  console.log('Este es el Resultado');
  console.log(result);

  return result;
}
