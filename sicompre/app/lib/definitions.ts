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
  id: string;
  descripcion: string;
  grupoBien?: GrupoBien;
  grupoBienId: bigint;
  valorVigente: number | null;
  bienCotizacion?: BienCotizacion[];
};

export type BienCotizacion = {
  id: string;
  bien: Bien;
  bienId: string;
  cantidad: number;
  cotizacion: Cotizacion;
  cotizacionId: number;
  valorProveedor: BienProveedor[];
};

export type Cotizacion = {
  id: number;
  bienes: BienCotizacion[];
  fecha: string;
  estado: 'Abierto' | 'Cerrado' | 'EnProceso';
  valorTotal: number;
  usuario: Usuario;
  createdAt: Date;
  updatedAt: Date;
  seccionId: BigInt;
  usuarioId: string;
  cicloContratacionId: string;
};

export type Proveedor = {
  id: string;
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
  bienCotizacionId: string;
  proveedorId: string;
};

export type Entidad = {
  id: BigInt;
  nombre: string;
  nit: string;
  direccion: string;
  telefono: string;
  municipio: string;
  departamento: string;
  pais: string;
  web: string;
  email: string;
  resolucionPosesion: string;
  fechaPosesion: string;
  estado: 'Activo' | 'Deshabilitado';
  saldoDisponible: string;
  createdAt: string;
  updatedAt: string;
  secciones: Seccion[];
  cicloContratacion: CicloContratacion[];
  integrantes: Usuario[];
};

export type Seccion = {
  id: BigInt;
  nombre: string;
  nit: string;
  direccion: string;
  telefono: string;
  municipio: string;
  departamento: string;
  pais: string;
  web: string;
  email: string;
  resolucionPosesion: string;
  fechaPosesion: string;
  estado: 'Activo' | 'Deshabilitado';
  saldoDisponible: number;
  createdAt: string;
  updatedAt: string;
  entidadId: BigInt;
  Cotizacion: Cotizacion[];
  usuarioId: string;
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
  id: string;
  fechaInicio: string;
  fechaFinal: string;
  cotizaciones: Cotizacion[];
  createdAt: string;
  updatedAt: string;
  usuarioId: string;
  entidadId: BigInt;
};
