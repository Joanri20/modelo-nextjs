// pages/api/supplier/[id].ts
import prisma from '@lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const supplier = await prisma.supplier.findUnique({
        where: { id: String(id) },
      });
      res.status(200).json(supplier);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Error al obtener los datos del supplier' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
