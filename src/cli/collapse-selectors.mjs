const collapse = (array) => {
  array = [...array];
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i + 1] && array[i + 1].startsWith("&")) {
      array[i] = `${array[i]}${array[i + 1].substring(1)}`;
      array.splice(i + 1, 1);
      i--;
    }
  }
  return array;
};
export default collapse;
