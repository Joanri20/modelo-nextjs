/*
  Warnings:

  - The `tipoDocumento` column on the `Usuario` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[tipoDocumento,documento]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Enum_TipoDocumento" AS ENUM ('CC', 'CE', 'TI', 'PASAPORTE');

-- AlterTable
ALTER TABLE "CicloContratacion" ALTER COLUMN "fechaInicio" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "fechaFinal" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Cotizacion" ALTER COLUMN "fecha" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "estado" SET DEFAULT 'Abierto',
ALTER COLUMN "valorTotal" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Entidad" ALTER COLUMN "estado" SET DEFAULT 'Activo',
ALTER COLUMN "saldoDisponible" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Producto" ALTER COLUMN "valorVigente" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "ProductoCotizacion" ALTER COLUMN "cantidad" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "ProductoProveedor" ALTER COLUMN "valor" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Seccion" ALTER COLUMN "estado" SET DEFAULT 'Activo';

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "tipoDocumento",
ADD COLUMN     "tipoDocumento" "Enum_TipoDocumento" NOT NULL DEFAULT 'CC',
ALTER COLUMN "estado" SET DEFAULT 'Activo',
ALTER COLUMN "tipo" SET DEFAULT 'Encargado',
ALTER COLUMN "password" SET DEFAULT '1234';

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_tipoDocumento_documento_key" ON "Usuario"("tipoDocumento", "documento");
