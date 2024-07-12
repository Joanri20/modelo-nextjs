export const convertEnumToArray = (enumObj) => {
  return Object.keys(enumObj).map((key) => ({
    id: key,
    description: enumObj[key],
  }));
};
