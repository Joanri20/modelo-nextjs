// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

export type Rubro = {
  id: string;
  descripcion: string;
};

export type Producto = {
  id: string;
  descripcion: string;
  rubro: Rubro;
  rubroId: string;
  valorVigente: number | null;
  productoCotizacion?: ProductoCotizacion[];
};

export type ProductoCotizacion = {
  id: string;
  producto: Producto;
  productoId: string;
  cantidad: number;
  cotizacion: Cotizacion;
  cotizacionId: number;
  valorProveedor: ProductoProveedor[];
};

export type Cotizacion = {
  id: number;
  productos: ProductoCotizacion[];
  fecha: string;
  estado: 'Abierto' | 'Cerrado' | 'EnProceso';
  valorTotal: number;
  usuario: Usuario;
  createdAt: string;
  updatedAt: string;
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
  cotizaciones: ProductoProveedor[];
  createdAt: string;
  updatedAt: string;
};

export type ProductoProveedor = {
  valor: number;
  productoCotizacionId: string;
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
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  tipoDocumento: string;
  documento: string;
  telefono: string;
  celular: string;
  email: string;
  direccion: string;
  estado: 'Activo' | 'Deshabilitado';
  tipo: 'Encargado' | 'Administrador';
  createdAt: string;
  updatedAt: string;
  entidad: Entidad[];
  seccion: Seccion[];
  cotizacion: Cotizacion[];
  cicloContratacion: CicloContratacion[];
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
