/*
  Warnings:

  - You are about to drop the column `seccionId` on the `PlanDeCompras` table. All the data in the column will be lost.
  - Added the required column `dependenciaId` to the `PlanDeCompras` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PlanDeCompras" DROP CONSTRAINT "PlanDeCompras_seccionId_fkey";

-- AlterTable
ALTER TABLE "PlanDeCompras" DROP COLUMN "seccionId",
ADD COLUMN     "dependenciaId" BIGINT NOT NULL;

-- AddForeignKey
ALTER TABLE "PlanDeCompras" ADD CONSTRAINT "PlanDeCompras_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependecia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
