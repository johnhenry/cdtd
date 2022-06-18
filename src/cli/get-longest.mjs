export const getLongest = (...args) => {
  const longestIndex = args
    .map((a) => a.length)
    .indexOf(Math.max(...args.map((a) => a.length)));
  return args[longestIndex];
};
export default getLongest;
