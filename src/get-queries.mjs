import CDTD_NEGATIVE_QUERY from "./negate.mjs";
import extractRepeats from "./extract-repeats.mjs";
export const getQueries = function* (q, parent = []) {
  const [query, repeat] = extractRepeats(q);
  const [lower, upper] = repeat.split(",");
  const m = lower ? Number(lower) : 0;
  let n = 0;
  if (upper) {
    n = Number(upper);
  } else {
    if (upper === "") {
      n = Infinity;
    }
  }
  if (m === 1) {
    yield [...parent, query];
  }
  if (m > 1) {
    yield [...parent, query, `&:nth-child(${m})`]; // ensure lower
  }
  if (n < Infinity && n > 1) {
    yield [CDTD_NEGATIVE_QUERY, ...parent, query, `&:nth-child(${n + 1})`]; // disallow greater than upper
  }
};
export default getQueries;
