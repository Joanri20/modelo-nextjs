import { string } from 'zod';

export function getPrismaErrorCodeDescription(code: string) {
  const prismaErrorCodes: { [key: string]: string } = {
    P2002: 'Un valor único ya existe en la base de datos.',
    P2025: 'El registro que intentas buscar no existe.',
    P2021: 'La columna que intentas buscar no existe en la base de datos.',
    P2003: 'La relación referenciada no existe entre los modelos.',
    P2010: 'El valor proporcionado para el campo es demasiado largo.',
    P2011: 'El valor proporcionado para el campo es demasiado corto.',
    P2012: 'El valor proporcionado para el campo no es válido.',
    P2013:
      'El valor proporcionado para el campo es nulo, pero el campo no permite valores nulos.',
    P2014: 'El valor proporcionado para el campo es de un tipo incorrecto.',
    P2015: 'El valor proporcionado para el campo es de un formato incorrecto.',
    P2016:
      'El valor proporcionado para el campo está fuera del rango permitido.',
    P2017:
      'El valor proporcionado para el campo no está en la lista de valores permitidos.',
    P2018:
      'El valor proporcionado para el campo no cumple con el patrón requerido.',
    P2019:
      'El valor proporcionado para el campo no cumple con la condición requerida.',
    P2020:
      'El valor proporcionado para el campo no cumple con la restricción de unicidad.',
    P2022:
      'El valor proporcionado para el campo no cumple con la restricción de clave primaria.',
    P2023:
      'El valor proporcionado para el campo no cumple con la restricción de clave foránea.',
    P2024:
      'El valor proporcionado para el campo no cumple con la restricción de chequeo.',
    P2026:
      'El valor proporcionado para el campo no cumple con la restricción de no nulo.',
    P2027:
      'El valor proporcionado para el campo no cumple con la restricción de índice.',
    P2028:
      'El valor proporcionado para el campo no cumple con la restricción de índice único.',
  };

  return prismaErrorCodes[code] || 'Código de error desconocido.';
}
