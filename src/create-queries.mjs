import getQueries from "./get-queries.mjs";
const importMatch = /@import "(.+)";/;
const commentMatch = /^\/\//;
const nestedStart = /(.+){/;
const nestedEnd = /};?/;
const simpleMatch = /(.+);$/;
export const createQueries = function* (rawLines = [], parent = []) {
  while (rawLines.length) {
    const line = rawLines.shift().trim();
    if (!line || commentMatch.test(line)) {
      continue;
    }
    if (nestedEnd.test(line)) {
      return;
    }
    if (importMatch.test(line)) {
      throw new Error(`"@import" not yet implemented.`);
    } else if (nestedStart.test(line)) {
      const [, query] = line.match(nestedStart);
      const q = query.trim();
      const outer = [...getQueries(q, parent)];
      let again = 1;
      for (const o of outer) {
        yield o;
        const inner = createQueries(
          outer.length - again++ ? [...rawLines] : rawLines,
          o
        );
        for (const i of inner) {
          yield i;
        }
      }
    } else {
      let q = line;
      if (simpleMatch.test(line)) {
        [, q] = line.match(simpleMatch);
      }
      const outer = getQueries(q, parent);
      for (const o of outer) {
        yield o;
      }
    }
  }
};
export default createQueries;
