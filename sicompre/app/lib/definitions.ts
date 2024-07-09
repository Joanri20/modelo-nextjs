// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

enum Enum_TipoDocumento {
  CC = 'CC',
  CE = 'CE',
  TI = 'TI',
  PASAPORTE = 'PASAPORTE',
}

enum Enum_EstadoProceso {
  Abierto = 'Abierto',
  Cerrado = 'Cerrado',
  EnProceso = 'EnProceso',
}

enum Enum_TipoUsuario {
  Administrador = 'Administrador',
  Encargado = 'Encargado',
}

enum Enum_EstadoGeneral {
  Activo = 'Activo',
  Deshabilitado = 'Deshabilitado',
}

enum Enum_EstadoCotizacion {
  Abierto = 'Abierto',
  Cerrado = 'Cerrado',
}

type GrupoBien = {
  id: bigint;
  descripcion: string;
  createdAt: Date | null;
  updatedAt?: Date | null;
};

type Bien = {
  id: bigint;
  descripcion: string;
  grupoBien: GrupoBien;
  grupoBienId: bigint;
  valorVigente?: number | null;
  bienCantidad: BienCantidad[];
  createdAt: Date;
  updatedAt?: Date;
};

type BienCantidad = {
  id: bigint;
  bien: Bien;
  bienId: bigint;
  cantidad: number;
  planDeCompras?: PlanDeCompras | null;
  planDeComprasId?: bigint | null;
  createdAt: Date;
  updatedAt?: Date | null;
  BienProveedor: BienProveedor[];
};

type PlanDeCompras = {
  id: bigint;
  bienes: BienCantidad[];
  fecha: Date;
  estado: Enum_EstadoProceso;
  dependencia: Dependencia;
  usuario: Usuario;
  valorTotal?: number;
  dependenciaId: bigint;
  usuarioId: string;
  cicloContratacion?: CicloContratacion;
  cicloContratacionId?: bigint;
  createdAt: Date;
  updatedAt: Date;
};

type BienProveedor = {
  bien: BienCantidad;
  proveedor: Proveedor;
  valor: number;
  cotizacion: Cotizacion;
  bienCantidadId: bigint;
  proveedorId: bigint;
  createdAt: Date;
  updatedAt?: Date;
  cotizacionId: bigint;
};

type Proveedor = {
  id: bigint;
  nombre: string;
  nit: string;
  direccion: string;
  email: string;
  telefono: string;
  cotizaciones: CotizacionProveedor[];
  createdAt: Date;
  updatedAt: Date;
  BienProveedor: BienProveedor[];
};

type CotizacionProveedor = {
  proveedor: Proveedor;
  cotizacion: Cotizacion;
  valorTotal: number;
  proveedorId: bigint;
  cotizacionId: bigint;
  createdAt: Date;
  updatedAt?: Date;
};

type Cotizacion = {
  id: bigint;
  fechaInicio: Date;
  fechaFinal: Date;
  usuario: Usuario;
  entidad: Entidad;
  estado: Enum_EstadoCotizacion;
  createdAt: Date;
  updatedAt: Date;
  usuarioId: string;
  entidadId: bigint;
  BienProveedor: BienProveedor[];
  CotizacionProveedor: CotizacionProveedor[];
};

type CicloContratacion = {
  id: bigint;
  fechaInicio: Date;
  fechaFinal: Date;
  planDeCompras: PlanDeCompras[];
  usuario: Usuario;
  estado: Enum_EstadoProceso;
  entidad: Entidad;
  createdAt: Date;
  updatedAt: Date;
  usuarioId: string;
  entidadId: bigint;
  cotizacion?: Cotizacion;
  cotizacionId?: bigint;
};

type Entidad = {
  id: bigint;
  nombre: string;
  nit: string;
  direccion?: string;
  telefono?: string;
  municipio: string;
  departamento: string;
  pais: string;
  web?: string;
  email?: string;
  resolucionPosesion?: string;
  fechaPosesion?: Date;
  estado: Enum_EstadoGeneral;
  saldoDisponible: number;
  createdAt: Date;
  updatedAt: Date;
  dependencias: Dependencia[];
  cicloContratacion: CicloContratacion[];
  integrantes: Usuario[];
  Cotizacion: Cotizacion[];
};

type Dependencia = {
  id: bigint;
  nombre: string;
  nit: string;
  direccion?: string;
  telefono?: string;
  municipio: string;
  departamento: string;
  pais: string;
  web?: string;
  email?: string;
  resolucionPosesion?: string;
  fechaPosesion?: Date;
  estado: Enum_EstadoGeneral;
  entidadPadre: Entidad;
  saldoDisponible: number;
  createdAt: Date;
  updatedAt: Date;
  entidadId: bigint;
  Cotizacion: PlanDeCompras[];
  Usuario: Usuario;
  usuarioId: string;
};

type Usuario = {
  id: string;
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  tipoDocumento: Enum_TipoDocumento;
  documento: string;
  telefono?: string;
  celular: string;
  email: string;
  direccion?: string;
  estado: Enum_EstadoGeneral;
  tipo: Enum_TipoUsuario;
  createdAt: Date;
  updatedAt: Date;
  entidad: Entidad[];
  dependencia: Dependencia[];
  cotizacion: PlanDeCompras[];
  cicloContratacion: CicloContratacion[];
  password: string;
  Cotizacion: Cotizacion[];
};
