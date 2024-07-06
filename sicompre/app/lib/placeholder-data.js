// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
// Placeholder data
const gruposBienes = [
  { id: 1, descripcion: 'Material Vivo Animal y Vegetal' },
  { id: 2, descripcion: 'Materias Primas' },
  {
    id: 3,
    descripcion: 'Maquinaria, Herramientas, Equipo Industrial y Vehículos',
  },
  { id: 4, descripcion: 'Componentes y Suministros' },
  { id: 5, descripcion: 'Bienes de Uso Final' },
  { id: 6, descripcion: 'Servicios' },
  { id: 7, descripcion: 'Terrenos, Edificios, Estructuras y vías' },
];
const bienes = [
  {
    id: 1,
    descripcion: 'Vehículo utilitario',
    grupoBienId: 3,
    valorVigente: 25000,
  },
  {
    id: 2,
    descripcion: 'Computadora portátil',
    grupoBienId: 3,
    valorVigente: 1000,
  },
  {
    id: 3,
    descripcion: 'Escritorio de oficina',
    grupoBienId: 5,
    valorVigente: 150,
  },
];
const usuarios = [
  {
    id: '1',
    primerNombre: 'Juan',
    segundoNombre: 'Carlos',
    primerApellido: 'Gómez',
    segundoApellido: 'López',
    tipoDocumento: 'CC',
    documento: '12345678',
    telefono: '1234567890',
    celular: '0987654321',
    email: 'juan@example.com',
    direccion: 'Calle 123',
    estado: 'Activo',
    tipo: 'Administrador',
    password: 'password123',
  },
  {
    id: '2',
    primerNombre: 'María',
    segundoNombre: 'Luisa',
    primerApellido: 'Martínez',
    segundoApellido: 'Pérez',
    tipoDocumento: 'CC',
    documento: '87654321',
    telefono: '0987654321',
    celular: '1234567890',
    email: 'maria@example.com',
    direccion: 'Carrera 456',
    estado: 'Activo',
    tipo: 'Encargado',
    password: 'password123',
  },
];

const proveedores = [
  {
    id: 1,
    nombre: 'Proveedor 1',
    nit: '123456789',
    direccion: 'Calle 1',
    email: 'proveedor1@example.com',
    telefono: '1234567890',
  },
  {
    id: 2,
    nombre: 'Proveedor 2',
    nit: '987654321',
    direccion: 'Carrera 2',
    email: 'proveedor2@example.com',
    telefono: '0987654321',
  },
];

const entidades = [
  {
    id: 1,
    nombre: 'Entidad 1',
    nit: '123456789',
    municipio: 'Bogotá',
    departamento: 'Cundinamarca',
    pais: 'Colombia',
    saldoDisponible: 1000000,
  },
  {
    id: 2,
    nombre: 'Entidad 2',
    nit: '987654321',
    municipio: 'Medellín',
    departamento: 'Antioquia',
    pais: 'Colombia',
    saldoDisponible: 500000,
  },
];
const dependencias = [
  {
    id: 1,
    nombre: 'Dependencia 1',
    nit: '123456789',
    municipio: 'Bogotá',
    departamento: 'Cundinamarca',
    pais: 'Colombia',
    saldoDisponible: 500000,
    entidadId: 1,
  },
  {
    id: 2,
    nombre: 'Dependencia 2',
    nit: '987654321',
    municipio: 'Medellín',
    departamento: 'Antioquia',
    pais: 'Colombia',
    saldoDisponible: 250000,
    entidadId: 2,
  },
];
const ciclosContratacion = [
  {
    id: 1,
    fechaInicio: new Date('2023-01-01'),
    fechaFinal: new Date('2023-12-31'),
    estado: 'Abierto',
    usuarioId: '1',
    entidadId: 1,
  },
  {
    id: 2,
    fechaInicio: new Date('2024-01-01'),
    fechaFinal: new Date('2024-12-31'),
    estado: 'EnProceso',
    usuarioId: '2',
    entidadId: 2,
  },
];
const cotizaciones = [
  {
    id: 1,
    fechaInicio: new Date('2023-06-01'),
    fechaFinal: new Date('2023-06-30'),
    estado: 'Abierto',
    usuarioId: '1',
    entidadId: 1,
  },
  {
    id: 2,
    fechaInicio: new Date('2023-07-01'),
    fechaFinal: new Date('2023-07-31'),
    estado: 'Cerrado',
    usuarioId: '2',
    entidadId: 2,
  },
];

const bienCantidades = [
  { id: 1, bienId: 1, cantidad: 10 },
  { id: 2, bienId: 2, cantidad: 20 },
  { id: 3, bienId: 3, cantidad: 15 },
];
const planesDeCompras = [
  {
    id: 1,
    fecha: new Date('2023-06-01'),
    estado: 'Abierto',
    dependenciaId: 1,
    usuarioId: '1',
    valorTotal: 3000,
  },
  {
    id: 2,
    fecha: new Date('2023-07-01'),
    estado: 'EnProceso',
    dependenciaId: 2,
    usuarioId: '2',
    valorTotal: 2000,
  },
];
const bienProveedores = [
  {
    bienCantidadId: 1,
    proveedorId: 1,
    valor: 100,
    cotizacionId: 1,
  },
  {
    bienCantidadId: 2,
    proveedorId: 2,
    valor: 200,
    cotizacionId: 2,
  },
];
const cotizacionesProveedores = [
  {
    proveedorId: 1,
    cotizacionId: 1,
    valorTotal: 500,
  },
  {
    proveedorId: 2,
    cotizacionId: 2,
    valorTotal: 1000,
  },
];

module.exports = {
  gruposBienes,
  bienes,
  usuarios,
  proveedores,
  entidades,
  dependencias,
  ciclosContratacion,
  cotizaciones,
  bienCantidades,
  planesDeCompras,
  bienProveedores,
  cotizacionesProveedores,
};
