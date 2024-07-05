/*
  Warnings:

  - The primary key for the `Bien` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Bien` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `BienCotizacion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `BienCotizacion` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `BienProveedor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CicloContratacion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `CicloContratacion` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `cicloContratacionId` column on the `Cotizacion` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Proveedor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Proveedor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `bienId` on the `BienCotizacion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `bienCotizacionId` on the `BienProveedor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `proveedorId` on the `BienProveedor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "BienCotizacion" DROP CONSTRAINT "BienCotizacion_bienId_fkey";

-- DropForeignKey
ALTER TABLE "BienProveedor" DROP CONSTRAINT "BienProveedor_bienCotizacionId_fkey";

-- DropForeignKey
ALTER TABLE "BienProveedor" DROP CONSTRAINT "BienProveedor_proveedorId_fkey";

-- DropForeignKey
ALTER TABLE "Cotizacion" DROP CONSTRAINT "Cotizacion_cicloContratacionId_fkey";

-- AlterTable
ALTER TABLE "Bien" DROP CONSTRAINT "Bien_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
ADD CONSTRAINT "Bien_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "BienCotizacion" DROP CONSTRAINT "BienCotizacion_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
DROP COLUMN "bienId",
ADD COLUMN     "bienId" BIGINT NOT NULL,
ADD CONSTRAINT "BienCotizacion_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "BienProveedor" DROP CONSTRAINT "BienProveedor_pkey",
DROP COLUMN "bienCotizacionId",
ADD COLUMN     "bienCotizacionId" BIGINT NOT NULL,
DROP COLUMN "proveedorId",
ADD COLUMN     "proveedorId" BIGINT NOT NULL,
ADD CONSTRAINT "BienProveedor_pkey" PRIMARY KEY ("bienCotizacionId", "proveedorId");

-- AlterTable
ALTER TABLE "CicloContratacion" DROP CONSTRAINT "CicloContratacion_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
ADD CONSTRAINT "CicloContratacion_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Cotizacion" DROP COLUMN "cicloContratacionId",
ADD COLUMN     "cicloContratacionId" BIGINT;

-- AlterTable
ALTER TABLE "Proveedor" DROP CONSTRAINT "Proveedor_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
ADD CONSTRAINT "Proveedor_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "BienCotizacion" ADD CONSTRAINT "BienCotizacion_bienId_fkey" FOREIGN KEY ("bienId") REFERENCES "Bien"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotizacion" ADD CONSTRAINT "Cotizacion_cicloContratacionId_fkey" FOREIGN KEY ("cicloContratacionId") REFERENCES "CicloContratacion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BienProveedor" ADD CONSTRAINT "BienProveedor_bienCotizacionId_fkey" FOREIGN KEY ("bienCotizacionId") REFERENCES "BienCotizacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BienProveedor" ADD CONSTRAINT "BienProveedor_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "Proveedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
