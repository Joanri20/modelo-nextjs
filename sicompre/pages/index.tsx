import Image from "next/image";
import { Inter } from "next/font/google";
import { NextPage } from "next";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps() {
  const rubros = [
    { id: "48454", descripcion: "holaa1" },
    { id: "48455", descripcion: "holaa2" },
    { id: "48456", descripcion: "holaa3" },
  ];
  console.log("back: ", rubros);

  return {
    props: { rubros },
  };
}

const Home: NextPage = () => {
  console.log("front: ");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1> Rubro </h1>
        <table>
          <thead>
            <tr>
              <th>ID Rubro</th>
              <th>Descripcion</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>5555</td>
              <td>Hola</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
};
