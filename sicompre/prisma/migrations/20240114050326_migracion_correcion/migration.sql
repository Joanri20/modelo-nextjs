/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `Entidad` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[documento]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Entidad" DROP CONSTRAINT "Entidad_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "Seccion" DROP CONSTRAINT "Seccion_usuarioId_fkey";

-- AlterTable
ALTER TABLE "Entidad" DROP COLUMN "usuarioId";

-- AlterTable
ALTER TABLE "Seccion" ALTER COLUMN "usuarioId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "_EntidadToUsuario" (
    "A" BIGINT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EntidadToUsuario_AB_unique" ON "_EntidadToUsuario"("A", "B");

-- CreateIndex
CREATE INDEX "_EntidadToUsuario_B_index" ON "_EntidadToUsuario"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_documento_key" ON "Usuario"("documento");

-- AddForeignKey
ALTER TABLE "Seccion" ADD CONSTRAINT "Seccion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntidadToUsuario" ADD CONSTRAINT "_EntidadToUsuario_A_fkey" FOREIGN KEY ("A") REFERENCES "Entidad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntidadToUsuario" ADD CONSTRAINT "_EntidadToUsuario_B_fkey" FOREIGN KEY ("B") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
