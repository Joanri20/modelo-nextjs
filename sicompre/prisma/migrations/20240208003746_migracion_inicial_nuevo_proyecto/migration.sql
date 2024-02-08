-- CreateEnum
CREATE TYPE "Enum_EstadoProceso" AS ENUM ('Abierto', 'Cerrado', 'EnProceso');

-- CreateEnum
CREATE TYPE "Enum_TipoUsuario" AS ENUM ('Administrador', 'Encargado');

-- CreateEnum
CREATE TYPE "Enum_EstadoGeneral" AS ENUM ('Activo', 'Deshabilitado');

-- CreateTable
CREATE TABLE "Rubro" (
    "id" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "Rubro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Producto" (
    "id" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "rubroId" TEXT NOT NULL,
    "valorVigente" DOUBLE PRECISION,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductoCotizacion" (
    "id" TEXT NOT NULL,
    "productoId" TEXT NOT NULL,
    "cantidad" DOUBLE PRECISION NOT NULL,
    "cotizacionId" BIGINT,

    CONSTRAINT "ProductoCotizacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cotizacion" (
    "id" BIGSERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "estado" "Enum_EstadoProceso" NOT NULL,
    "valorTotal" DOUBLE PRECISION,
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
CREATE TABLE "ProductoProveedor" (
    "valor" DOUBLE PRECISION NOT NULL,
    "productoCotizacionId" TEXT NOT NULL,
    "proveedorId" TEXT NOT NULL,

    CONSTRAINT "ProductoProveedor_pkey" PRIMARY KEY ("productoCotizacionId","proveedorId")
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
    "seccion" TEXT NOT NULL,
    "resolucionPosesion" TEXT,
    "fechaPosesion" TIMESTAMP(3),
    "estado" "Enum_EstadoGeneral" NOT NULL,
    "saldoDisponible" DOUBLE PRECISION NOT NULL,
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
    "seccion" TEXT NOT NULL,
    "resolucionPosesion" TEXT,
    "fechaPosesion" TIMESTAMP(3),
    "estado" "Enum_EstadoGeneral" NOT NULL,
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
    "tipoDocumento" TEXT NOT NULL,
    "documento" TEXT NOT NULL,
    "telefono" TEXT,
    "celular" TEXT,
    "email" TEXT,
    "direccion" TEXT,
    "estado" "Enum_EstadoGeneral" NOT NULL,
    "tipo" "Enum_TipoUsuario" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CicloContratacion" (
    "id" TEXT NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFinal" TIMESTAMP(3) NOT NULL,
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
CREATE UNIQUE INDEX "_EntidadToUsuario_AB_unique" ON "_EntidadToUsuario"("A", "B");

-- CreateIndex
CREATE INDEX "_EntidadToUsuario_B_index" ON "_EntidadToUsuario"("B");

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_rubroId_fkey" FOREIGN KEY ("rubroId") REFERENCES "Rubro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductoCotizacion" ADD CONSTRAINT "ProductoCotizacion_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductoCotizacion" ADD CONSTRAINT "ProductoCotizacion_cotizacionId_fkey" FOREIGN KEY ("cotizacionId") REFERENCES "Cotizacion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotizacion" ADD CONSTRAINT "Cotizacion_seccionId_fkey" FOREIGN KEY ("seccionId") REFERENCES "Seccion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotizacion" ADD CONSTRAINT "Cotizacion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotizacion" ADD CONSTRAINT "Cotizacion_cicloContratacionId_fkey" FOREIGN KEY ("cicloContratacionId") REFERENCES "CicloContratacion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductoProveedor" ADD CONSTRAINT "ProductoProveedor_productoCotizacionId_fkey" FOREIGN KEY ("productoCotizacionId") REFERENCES "ProductoCotizacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductoProveedor" ADD CONSTRAINT "ProductoProveedor_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "Proveedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
