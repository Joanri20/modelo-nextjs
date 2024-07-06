-- CreateEnum
CREATE TYPE "Enum_TipoDocumento" AS ENUM ('CC', 'CE', 'TI', 'PASAPORTE');

-- CreateEnum
CREATE TYPE "Enum_EstadoProceso" AS ENUM ('Abierto', 'Cerrado', 'EnProceso');

-- CreateEnum
CREATE TYPE "Enum_TipoUsuario" AS ENUM ('Administrador', 'Encargado');

-- CreateEnum
CREATE TYPE "Enum_EstadoGeneral" AS ENUM ('Activo', 'Deshabilitado');

-- CreateTable
CREATE TABLE "GrupoBien" (
    "id" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "GrupoBien_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bien" (
    "id" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "grupoBienId" TEXT NOT NULL,
    "valorVigente" DOUBLE PRECISION DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Bien_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BienCotizacion" (
    "id" TEXT NOT NULL,
    "bienId" TEXT NOT NULL,
    "cantidad" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "cotizacionId" BIGINT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "BienCotizacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cotizacion" (
    "id" BIGSERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" "Enum_EstadoProceso" NOT NULL DEFAULT 'Abierto',
    "valorTotal" DOUBLE PRECISION DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "seccionId" BIGINT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "cicloContratacionId" TEXT,

    CONSTRAINT "Cotizacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proveedor" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "nit" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Proveedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BienProveedor" (
    "valor" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "bienCotizacionId" TEXT NOT NULL,
    "proveedorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "BienProveedor_pkey" PRIMARY KEY ("bienCotizacionId","proveedorId")
);

-- CreateTable
CREATE TABLE "Entidad" (
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
    "saldoDisponible" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Entidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seccion" (
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

    CONSTRAINT "Seccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "primerNombre" TEXT NOT NULL,
    "segundoNombre" TEXT,
    "primerApellido" TEXT NOT NULL,
    "segundoApellido" TEXT,
    "tipoDocumento" "Enum_TipoDocumento" NOT NULL DEFAULT 'CC',
    "documento" TEXT NOT NULL,
    "telefono" TEXT,
    "celular" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "direccion" TEXT,
    "estado" "Enum_EstadoGeneral" NOT NULL DEFAULT 'Activo',
    "tipo" "Enum_TipoUsuario" NOT NULL DEFAULT 'Encargado',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "password" TEXT NOT NULL DEFAULT '1234',

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CicloContratacion" (
    "id" TEXT NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaFinal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "entidadId" BIGINT NOT NULL,

    CONSTRAINT "CicloContratacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EntidadToUsuario" (
    "A" BIGINT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_documento_key" ON "Usuario"("documento");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_tipoDocumento_documento_key" ON "Usuario"("tipoDocumento", "documento");

-- CreateIndex
CREATE UNIQUE INDEX "_EntidadToUsuario_AB_unique" ON "_EntidadToUsuario"("A", "B");

-- CreateIndex
CREATE INDEX "_EntidadToUsuario_B_index" ON "_EntidadToUsuario"("B");

-- AddForeignKey
ALTER TABLE "Bien" ADD CONSTRAINT "Bien_grupoBienId_fkey" FOREIGN KEY ("grupoBienId") REFERENCES "GrupoBien"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BienCotizacion" ADD CONSTRAINT "BienCotizacion_bienId_fkey" FOREIGN KEY ("bienId") REFERENCES "Bien"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BienCotizacion" ADD CONSTRAINT "BienCotizacion_cotizacionId_fkey" FOREIGN KEY ("cotizacionId") REFERENCES "Cotizacion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotizacion" ADD CONSTRAINT "Cotizacion_seccionId_fkey" FOREIGN KEY ("seccionId") REFERENCES "Seccion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotizacion" ADD CONSTRAINT "Cotizacion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotizacion" ADD CONSTRAINT "Cotizacion_cicloContratacionId_fkey" FOREIGN KEY ("cicloContratacionId") REFERENCES "CicloContratacion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BienProveedor" ADD CONSTRAINT "BienProveedor_bienCotizacionId_fkey" FOREIGN KEY ("bienCotizacionId") REFERENCES "BienCotizacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BienProveedor" ADD CONSTRAINT "BienProveedor_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "Proveedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seccion" ADD CONSTRAINT "Seccion_entidadId_fkey" FOREIGN KEY ("entidadId") REFERENCES "Entidad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seccion" ADD CONSTRAINT "Seccion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CicloContratacion" ADD CONSTRAINT "CicloContratacion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CicloContratacion" ADD CONSTRAINT "CicloContratacion_entidadId_fkey" FOREIGN KEY ("entidadId") REFERENCES "Entidad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntidadToUsuario" ADD CONSTRAINT "_EntidadToUsuario_A_fkey" FOREIGN KEY ("A") REFERENCES "Entidad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntidadToUsuario" ADD CONSTRAINT "_EntidadToUsuario_B_fkey" FOREIGN KEY ("B") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
