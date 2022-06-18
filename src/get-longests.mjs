export const getLongests = (...args) => {
  const longestLength = Math.max(...args.map((a) => a.length));
  return args.filter((a) => a.length === longestLength);
};
export default getLongests;
