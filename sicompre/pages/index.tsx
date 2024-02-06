import Image from "next/image";
import { Inter } from "next/font/google";
import { NextPage } from "next";
import { PrismaClient } from "@prisma/client";

const inter = Inter({ subsets: ["latin"] });

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const rubros = await prisma.rubro.findMany({
    select: {
      id: true,
      descripcion: true,
    },
  });
  return {
    props: {
      rubros,
    },
  };
}

const Home: NextPage = ({ rubros }) => {
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
};

export default Home;
