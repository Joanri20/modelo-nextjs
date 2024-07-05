// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

export type GrupoBien = {
  id: bigint;
  descripcion: string;
  createdAt?: Date;
  updatedAt?: Date | null;
};

export type Bien = {
  id: bigint;
  descripcion: string;
  grupoBien?: GrupoBien;
  grupoBienId: bigint;
  valorVigente: number | null;
  bienCotizacion?: BienCotizacion[];
} | null;

export type BienCotizacion = {
  id: bigint;
  bien: Bien;
  bienId: bigint;
  cantidad: number;
  cotizacion: Cotizacion;
  cotizacionId: bigint;
  valorProveedor: BienProveedor[];
};

export type Cotizacion = {
  id: bigint;
  bienes: BienCotizacion[];
  fecha: string;
  estado: 'Abierto' | 'Cerrado' | 'EnProceso';
  valorTotal: number;
  usuario: Usuario;
  createdAt: Date;
  updatedAt: Date;
  seccionId: BigInt;
  usuarioId: string;
  cicloContratacionId: bigint;
};

export type Proveedor = {
  id: bigint;
  nombre: string;
  nit: string;
  direccion: string;
  email: string;
  telefono: string;
  createdAt: Date;
  updatedAt: Date;
} | null;

export type BienProveedor = {
  valor: number;
  bienCotizacionId: bigint;
  proveedorId: bigint;
};

export type Entidad = {
  id: bigint;
  nombre: string;
  nit: string;
  direccion: string | null;
  telefono: string | null;
  municipio: string;
  departamento: string;
  pais: string;
  web: string | null;
  email: string | null;
  resolucionPosesion: string | null;
  fechaPosesion: Date | null;
  estado: 'Activo' | 'Deshabilitado';
  saldoDisponible: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Seccion = {
  id: bigint;
  nombre: string;
  nit: string;
  direccion: string | null;
  telefono: string | null;
  municipio: string;
  departamento: string;
  pais: string;
  web: string | null;
  email: string | null;
  resolucionPosesion: string | null;
  fechaPosesion: Date | null;
  estado: 'Activo' | 'Deshabilitado';
  saldoDisponible: number;
  createdAt: Date;
  updatedAt: Date;
  entidadId: bigint;
  usuarioId: string | null;
};

export type Usuario = {
  id: string;
  primerNombre: string;
  segundoNombre: string | null;
  primerApellido: string;
  segundoApellido: string | null;
  tipoDocumento: string;
  documento: string;
  telefono: string | null;
  celular: string;
  email: string;
  direccion: string | null;
  estado: 'Activo' | 'Deshabilitado';
  tipo: 'Encargado' | 'Administrador';
  createdAt: Date;
  updatedAt: Date;
  password: string;
};

export type CicloContratacion = {
  id: bigint;
  fechaInicio: string;
  fechaFinal: string;
  cotizaciones: Cotizacion[];
  createdAt: string;
  updatedAt: string;
  usuarioId: string;
  entidadId: BigInt;
};
