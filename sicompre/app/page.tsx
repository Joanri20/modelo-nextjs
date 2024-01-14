import { PrismaClient } from "@prisma/client";
import Image from "next/image";

const prisma = new PrismaClient();

export default async function Home() {
  const rubros = await prisma.rubro.findMany({
    select: {
      id: true,
      descripcion: true,
    },
  });
  return (
    <main>
      <div>
        <h1>Rubros</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Descripcion</th>
            </tr>
          </thead>
          <tbody>
            {rubros.map((rubro, index) => {
              return (
                <tr key={index}>
                  <td>{rubro.id}</td>
                  <td>{rubro.descripcion}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
