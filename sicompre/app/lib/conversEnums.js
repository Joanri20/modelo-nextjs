export const convertEnumToArray = (enumObj) => {
  return Object.keys(enumObj).map((key) => ({
    id: key,
    descripcion: enumObj[key],
  }));
};
