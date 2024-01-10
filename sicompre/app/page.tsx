import Image from "next/image";

export default function Home() {
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
}
