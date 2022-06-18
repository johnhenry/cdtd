const repeatsMatch = /(.+) --\s?(.+)/;
export const extractRepeats = (q) => {
  let query,
    repeat = "1,";
  if (repeatsMatch.test(q)) {
    [, query, repeat] = q.match(repeatsMatch);
  } else {
    query = q;
  }
  return [query, repeat];
};
export default extractRepeats;
