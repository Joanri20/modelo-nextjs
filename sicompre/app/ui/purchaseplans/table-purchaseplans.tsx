'use client';
import { DeletePurchasePlan, UpdatePurchasePlan } from './buttons';

export default async function TablePurchasePlans({
  purchaseplans,
}: {
  purchaseplans: PlanDeCompras[];
}) {
  return (
    <div className="relative flex-col overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-gray-500">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3">
              Fecha
            </th>
            <th scope="col" className="px-6 py-3">
              Estado
            </th>
            <th scope="col" className="px-6 py-3">
              Dependencia
            </th>
            <th scope="col" className="px-6 py-3">
              Usuario
            </th>
            <th scope="col" className="px-6 py-3">
              Ciclo de Contratación
            </th>
            <th scope="col" className="px-6 py-3">
              Valor Total
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {purchaseplans.map((plan) => (
            <tr
              key={String(plan.id)}
              className="border-b bg-white hover:bg-gray-50"
            >
              <td className="px-6 py-4">
                {plan.fecha.toISOString().substring(0, 10)}
              </td>
              <td className="px-6 py-4">{plan.estado}</td>
              <td className="px-6 py-4">{plan.dependencia.nombre}</td>
              <td className="px-6 py-4">{plan.usuario.primerNombre}</td>
              <td className="px-6 py-4">
                {plan.cicloContratacion
                  ? plan.cicloContratacion.id.toString()
                  : 'N/A'}
              </td>
              <td className="px-6 py-4">{plan?.valorTotal?.toFixed(2)}</td>
              <td className="flex items-center gap-3 px-6 py-4">
                <UpdatePurchasePlan id={plan.id} />
                <DeletePurchasePlan id={plan.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
