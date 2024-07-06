/*
  Warnings:

  - The primary key for the `BienProveedor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bienCotizacionId` on the `BienProveedor` table. All the data in the column will be lost.
  - You are about to drop the column `cicloContratacionId` on the `Cotizacion` table. All the data in the column will be lost.
  - You are about to drop the column `fecha` on the `Cotizacion` table. All the data in the column will be lost.
  - You are about to drop the column `seccionId` on the `Cotizacion` table. All the data in the column will be lost.
  - You are about to drop the column `valorTotal` on the `Cotizacion` table. All the data in the column will be lost.
  - You are about to drop the `BienCotizacion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Seccion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bienCantidadId` to the `BienProveedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cotizacionId` to the `BienProveedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `CicloContratacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entidadId` to the `Cotizacion` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `estado` on the `Cotizacion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Enum_EstadoCotizacion" AS ENUM ('Abierto', 'Cerrado');

-- DropForeignKey
ALTER TABLE "BienCotizacion" DROP CONSTRAINT "BienCotizacion_bienId_fkey";

-- DropForeignKey
ALTER TABLE "BienCotizacion" DROP CONSTRAINT "BienCotizacion_cotizacionId_fkey";

-- DropForeignKey
ALTER TABLE "BienProveedor" DROP CONSTRAINT "BienProveedor_bienCotizacionId_fkey";

-- DropForeignKey
ALTER TABLE "Cotizacion" DROP CONSTRAINT "Cotizacion_cicloContratacionId_fkey";

-- DropForeignKey
ALTER TABLE "Cotizacion" DROP CONSTRAINT "Cotizacion_seccionId_fkey";

-- DropForeignKey
ALTER TABLE "Seccion" DROP CONSTRAINT "Seccion_entidadId_fkey";

-- DropForeignKey
ALTER TABLE "Seccion" DROP CONSTRAINT "Seccion_usuarioId_fkey";

-- AlterTable
ALTER TABLE "BienProveedor" DROP CONSTRAINT "BienProveedor_pkey",
DROP COLUMN "bienCotizacionId",
ADD COLUMN     "bienCantidadId" BIGINT NOT NULL,
ADD COLUMN     "cotizacionId" BIGINT NOT NULL,
ADD CONSTRAINT "BienProveedor_pkey" PRIMARY KEY ("cotizacionId", "proveedorId");

-- AlterTable
ALTER TABLE "CicloContratacion" ADD COLUMN     "cotizacionId" BIGINT,
ADD COLUMN     "estado" "Enum_EstadoProceso" NOT NULL;

-- AlterTable
ALTER TABLE "Cotizacion" DROP COLUMN "cicloContratacionId",
DROP COLUMN "fecha",
DROP COLUMN "seccionId",
DROP COLUMN "valorTotal",
ADD COLUMN     "entidadId" BIGINT NOT NULL,
ADD COLUMN     "fechaFinal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fechaInicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "estado",
ADD COLUMN     "estado" "Enum_EstadoCotizacion" NOT NULL;

-- DropTable
DROP TABLE "BienCotizacion";

-- DropTable
DROP TABLE "Seccion";

-- CreateTable
CREATE TABLE "BienCantidad" (
    "id" BIGSERIAL NOT NULL,
    "bienId" BIGINT NOT NULL,
    "cantidad" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "planDeComprasId" BIGINT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "cotizacionId" BIGINT,

    CONSTRAINT "BienCantidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanDeCompras" (
    "id" BIGSERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" "Enum_EstadoProceso" NOT NULL DEFAULT 'Abierto',
    "valorTotal" DOUBLE PRECISION DEFAULT 0,
    "seccionId" BIGINT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "cicloContratacionId" BIGINT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanDeCompras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CotizacionProveedor" (
    "valorTotal" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "proveedorId" BIGINT NOT NULL,
    "cotizacionId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "CotizacionProveedor_pkey" PRIMARY KEY ("cotizacionId","proveedorId")
);

-- CreateTable
CREATE TABLE "Dependecia" (
    "id" BIGSERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "nit" TEXT NOT NULL,
    "direccion" TEXT,
    "telefono" TEXT,
    "municipio" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "web" TEXT,
    "email" TEXT,
    "resolucionPosesion" TEXT,
    "fechaPosesion" TIMESTAMP(3),
    "estado" "Enum_EstadoGeneral" NOT NULL DEFAULT 'Activo',
    "saldoDisponible" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "entidadId" BIGINT NOT NULL,
    "usuarioId" TEXT,

    CONSTRAINT "Dependecia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BienCantidad" ADD CONSTRAINT "BienCantidad_bienId_fkey" FOREIGN KEY ("bienId") REFERENCES "Bien"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BienCantidad" ADD CONSTRAINT "BienCantidad_planDeComprasId_fkey" FOREIGN KEY ("planDeComprasId") REFERENCES "PlanDeCompras"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BienCantidad" ADD CONSTRAINT "BienCantidad_cotizacionId_fkey" FOREIGN KEY ("cotizacionId") REFERENCES "Cotizacion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanDeCompras" ADD CONSTRAINT "PlanDeCompras_seccionId_fkey" FOREIGN KEY ("seccionId") REFERENCES "Dependecia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanDeCompras" ADD CONSTRAINT "PlanDeCompras_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanDeCompras" ADD CONSTRAINT "PlanDeCompras_cicloContratacionId_fkey" FOREIGN KEY ("cicloContratacionId") REFERENCES "CicloContratacion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BienProveedor" ADD CONSTRAINT "BienProveedor_bienCantidadId_fkey" FOREIGN KEY ("bienCantidadId") REFERENCES "BienCantidad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BienProveedor" ADD CONSTRAINT "BienProveedor_cotizacionId_fkey" FOREIGN KEY ("cotizacionId") REFERENCES "Cotizacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CotizacionProveedor" ADD CONSTRAINT "CotizacionProveedor_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "Proveedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CotizacionProveedor" ADD CONSTRAINT "CotizacionProveedor_cotizacionId_fkey" FOREIGN KEY ("cotizacionId") REFERENCES "Cotizacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotizacion" ADD CONSTRAINT "Cotizacion_entidadId_fkey" FOREIGN KEY ("entidadId") REFERENCES "Entidad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CicloContratacion" ADD CONSTRAINT "CicloContratacion_cotizacionId_fkey" FOREIGN KEY ("cotizacionId") REFERENCES "Cotizacion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dependecia" ADD CONSTRAINT "Dependecia_entidadId_fkey" FOREIGN KEY ("entidadId") REFERENCES "Entidad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dependecia" ADD CONSTRAINT "Dependecia_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
