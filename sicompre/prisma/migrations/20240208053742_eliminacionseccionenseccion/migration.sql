/*
  Warnings:

  - You are about to drop the column `seccion` on the `Entidad` table. All the data in the column will be lost.
  - You are about to drop the column `seccion` on the `Seccion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Entidad" DROP COLUMN "seccion";

-- AlterTable
ALTER TABLE "Seccion" DROP COLUMN "seccion";
