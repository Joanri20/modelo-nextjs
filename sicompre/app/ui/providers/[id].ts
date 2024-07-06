// pages/api/proveedor/[id].ts
import prisma from '@lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const proveedor = await prisma.proveedor.findUnique({
        where: { id: String(id) },
      });
      res.status(200).json(proveedor);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Error al obtener los datos del proveedor' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
